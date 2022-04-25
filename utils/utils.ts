import { useRef, useEffect } from "react";

export const SingleLetterRegex = "\\b[a-zA-Z]\\b";

export const enum LetterResultEnum {
  CorrectPos,
  IncorrectPos,
  IncorrectLetter,
}

export const useEventListener = (
  eventName: string,
  handler: Function,
  element: Window
) => {
  const savedHandler = useRef<Function>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: Event) => savedHandler.current!(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};
