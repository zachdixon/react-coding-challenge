import { renderHook, act } from "@testing-library/react-hooks";
import useApi from "../api";

test("should create and start the message generator", () => {
  const { result } = renderHook(() => useApi({ run: true }));

  expect(result.current.isRunning).toBe(true);
});

test("should create a message", () => {
  const { result } = renderHook(() => useApi({ run: true }));

  act(() => {
    result.current.generate();
  });

  expect(result.current.messages.length).toBe(1);
});

test("should stop generating", () => {
  const { result } = renderHook(() => useApi({ run: true }));
  expect(result.current.isRunning).toBe(true);
  act(() => {
    result.current.stop();
  });
  expect(result.current.isRunning).toBe(false);
});

test("should continue generating after stopping", () => {
  const { result } = renderHook(() => useApi({ run: true }));
  act(() => result.current.stop());
  expect(result.current.isRunning).toBe(false);
  act(() => result.current.start());
  expect(result.current.isRunning).toBe(true);
});

test("should remove a single message", () => {
  const { result } = renderHook(() => useApi({ run: true }));
  act(() => result.current.generate());
  expect(result.current.messages.length).toBe(1);
  act(() => result.current.remove(result.current.messages[0].id));
  expect(result.current.messages.length).toBe(0);
});

test("should remove all messages", () => {
  const { result } = renderHook(() => useApi({ run: true }));
  act(() => result.current.generate());
  act(() => result.current.generate());
  expect(result.current.messages.length).toBe(2);
  act(() => result.current.removeAll());
  expect(result.current.messages.length).toBe(0);
});

test("should remove all messages of a specific priority", () => {
  const { result } = renderHook(() => useApi({ run: true }));
  act(() => result.current.generate());
  expect(result.current.messages.length).toBe(1);
  const message = result.current.messages[0];
  act(() => result.current.removeAll(message.priority));
  expect(result.current.messages.length).toBe(0);
});
