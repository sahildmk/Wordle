import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

let grid: Array<string> = [...Array(30)];

const Home: NextPage = () => {
  const keyPressHandler = useCallback((event: Event) => {
    console.log(event);
  }, []);

  if (typeof window !== "undefined") {
    useEventListener("keydown", keyPressHandler, window);
  }

  return (
    <div className="flex h-screen flex-col items-center bg-slate-900 text-white">
      <Head>
        <title>Wordle Clone</title>
      </Head>
      <nav>hi</nav>
      <main className="">
        <div className="grid grid-cols-5 grid-rows-6 gap-3">
          {grid.map((value, index) => (
            <div
              id={index.toString()}
              key={index}
              className="grid place-items-center rounded-md border-2 border-solid border-slate-600 text-4xl font-bold uppercase sm:h-24 sm:w-24"
            >
              {value}
            </div>
          ))}
        </div>
      </main>
      <footer>footer</footer>
    </div>
  );
};

const useEventListener = (
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

export default Home;
