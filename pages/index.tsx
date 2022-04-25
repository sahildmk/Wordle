import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { singleLetterRegex, useEventListener } from "../utils/utils";

let grid: Array<string> = [...Array(30)];

const Home: NextPage = () => {
  const wordSize: number = 5;
  const [keyCount, setKeyCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const keyPressHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key.match(singleLetterRegex)) {
        // TO DO: restrict typing into next guess
        if (keyCount < wordSize * (Math.floor(keyCount / 5) + 1)) {
          grid[keyCount] = event.key;
          setKeyCount(keyCount + 1);
          setWordCount(Math.floor(keyCount / 5));
        }
      } else if (event.key === "Backspace") {
        // TO DO: restrict backspacing beyond last guess
        if (keyCount != wordSize * (Math.floor(keyCount / 5) + 1)) {
          grid[keyCount - 1] = "";
          setKeyCount(Math.max(0, keyCount - 1));
          setWordCount(Math.floor(keyCount / 5));
        }
      } else if (event.key === "Enter") {
        let attempt: string = "";
        // TO DO: stop accessing backspaced spaces
        if (keyCount > 0 && keyCount % wordSize === 0) {
          for (let i = 0; i < wordSize; i++) {
            attempt += `${grid[wordCount * wordSize + i]}`;
          }
          console.log(`guess: ${attempt}`);
        }
      }
    },
    [keyCount]
  );

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

export default Home;
