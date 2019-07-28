import { useRef, useState, useCallback, useEffect } from "react";
import Chance from "chance";
import lodash from "lodash";
import uniqid from "uniqid";
import { Priorities } from "./constants";

export default function MessageGenerator({ run = false }) {
  const chance = useRef(new Chance());
  const timeoutRef = useRef();

  const [messages, setMessages] = useState([]);
  const [isRunning, setIsRunning] = useState(run);

  // Create a new message
  const generate = useCallback(() => {
    if (!isRunning) {
      return;
    }
    const message = chance.current.string();
    const priority = lodash.random(1, 3);
    setMessages([{ id: uniqid(), message, priority }, ...messages]);
  }, [messages, setMessages, isRunning, chance]);

  const cleanup = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, [timeoutRef]);

  // Stop generating
  const stop = useCallback(() => {
    setIsRunning(false);
    cleanup();
  }, [setIsRunning, cleanup]);

  // Start generating
  const start = useCallback(() => {
    setIsRunning(true);
  }, [setIsRunning]);

  // Clear current messages
  // Accepts a priority to only remove those messages
  const removeAll = useCallback(
    priority => {
      if (priority) {
        if (!Object.keys(Priorities).includes(priority.toString())) {
          return console.log(
            `Priority must be one of ${Object.keys(Priorities)}`
          );
        }
        setMessages(
          messages.filter(message => message.priority !== parseInt(priority))
        );
      } else {
        setMessages([]);
      }
    },
    [setMessages, messages]
  );

  const remove = useCallback(
    id => {
      const newMessages = messages.filter(message => message.id !== id);
      setMessages(newMessages);
    },
    [messages, setMessages]
  );

  // Start/stop generating based on isRunning
  useEffect(() => {
    const nextInMS = lodash.random(500, 3000);
    if (isRunning && !timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        generate();
      }, nextInMS);

    return () => {
      cleanup();
    };
  }, [isRunning, generate, cleanup]);

  return {
    messages,
    generate,
    stop,
    start,
    remove,
    removeAll,
    isRunning
  };
}
