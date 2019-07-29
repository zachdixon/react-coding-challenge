import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import Message from "components/Message";

test("should render a message", () => {
  const testMessage = {
    id: 1,
    message: "Test",
    priority: 1
  };
  const { queryByText } = render(
    <Message message={testMessage.message} priority={testMessage.priority} />
  );
  expect(queryByText(testMessage.message)).toBeInTheDocument();
});

test("should remove the message after 2 seconds", async () => {
  const testMessage = {
    id: 1,
    message: "Test",
    priority: 1
  };
  const { queryByText } = render(
    <Message message={testMessage.message} priority={testMessage.priority} />
  );
  await wait(() => {
    expect(queryByText(testMessage.message)).toBeInTheDocument();
  });
  await wait(
    () => {
      expect(queryByText(testMessage.message)).not.toBeInTheDocument();
    },
    // set timeout, includes time for animating out
    { timeout: 2200 }
  );
});

test("should replace error message with another error message", async () => {
  const testMessage = {
    id: 1,
    message: "Test",
    priority: 1
  };
  const testMessage2 = {
    id: 2,
    message: "Test 2",
    priority: 1
  };

  const { queryByText } = render(
    <div>
      <Message message={testMessage.message} priority={testMessage.priority} />
      <Message
        message={testMessage2.message}
        priority={testMessage2.priority}
      />
    </div>
  );

  await wait(() => {
    expect(queryByText(testMessage2.message)).toBeInTheDocument();
  });
});
