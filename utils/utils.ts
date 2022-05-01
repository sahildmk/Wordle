import { useRef, useEffect } from "react";

export const SingleLetterRegex = "\\b[a-zA-Z]\\b";
export const wordSize: number = 5;
export const maxWords: number = 6;

export const enum LetterResultEnum {
  Default = "defaultTile",
  Correct = "correct",
  IncorrectPos = "incorrectPos",
  IncorrectLetter = "incorrectLetter",
  Win = "win",
}

export const getGridIndex = (keyCount: number, wordCount: number): number => {
  if (keyCount > wordSize || wordCount >= maxWords) {
    throw "Input is invalid";
  }
  return wordCount * wordSize + keyCount - 1;
};

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

const fetcher = async (url: RequestInfo) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};
