import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import {
  LetterResultEnum,
  SingleLetterRegex,
  useEventListener,
} from "../utils/utils";

const wordSize: number = 5;
const maxWords: number = 6;

const Home: NextPage = () => {
  const [keyCount, setKeyCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [grid, setGrid] = useState<Array<string>>([...Array(30)]); // change to array of tuples (letter, state)

  const handleLetterInput = (key: string) => {
    if (keyCount >= wordSize || wordCount >= maxWords) {
      return;
    }

    let gridIndex = 0;
    try {
      gridIndex = getGridIndex(keyCount + 1, wordCount);
    } catch (e) {
      console.error(e);
      return;
    }

    setGrid((prev) => {
      prev[gridIndex] = key.toLowerCase();
      return prev;
    });
    setKeyCount((prev) => prev + 1);
  };

  const handleBackspaceInput = () => {
    if (keyCount <= 0 || keyCount > wordSize) {
      return;
    }

    try {
      const gridIndex = getGridIndex(keyCount, wordCount);
      grid[gridIndex] = "";
      setKeyCount((prev) => prev - 1);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEnterInput = () => {
    if (keyCount !== wordSize) {
      return;
    }

    let startIndex = 0;
    let endIndex = 0;

    try {
      startIndex = getGridIndex(1, wordCount);
      endIndex = getGridIndex(wordSize, wordCount) + 1;
    } catch (error) {
      console.error(error);
      return;
    }

    // Make call to backend with guess
    const mock = {
      id: 123,
      letters: [
        LetterResultEnum.CorrectPos,
        LetterResultEnum.CorrectPos,
        LetterResultEnum.CorrectPos,
        LetterResultEnum.CorrectPos,
        LetterResultEnum.CorrectPos,
      ],
    };

    console.log(`guess: ${grid.slice(startIndex, endIndex).join("")}`);
    setWordCount((prev) => prev + 1);
    setKeyCount(0);
  };

  const keyPressHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key.match(SingleLetterRegex)) {
        handleLetterInput(event.key);
      } else if (event.key === "Backspace") {
        handleBackspaceInput();
      } else if (event.key === "Enter") {
        handleEnterInput();
      }
      // console.log(
      //   `KeyCount: ${keyCount} | WordCount: ${wordCount} | Key: ${event.key}`
      // );
      // console.log(grid);
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
              className="grid place-items-center rounded-md border-2 border-solid border-slate-600 bg-gray-800 text-4xl font-bold uppercase sm:h-24 sm:w-24"
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

const getGridIndex = (keyCount: number, wordCount: number): number => {
  if (keyCount > wordSize || wordCount >= maxWords) {
    throw "Input is invalid";
  }
  return wordCount * wordSize + keyCount - 1;
};

export default Home;
