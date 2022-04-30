import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import {
  LetterResultEnum,
  maxWords,
  SingleLetterRegex,
  useEventListener,
  wordSize,
} from "../utils/utils";

const Home: NextPage = () => {
  const [keyCount, setKeyCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [grid, setGrid] = useState<Array<[String, LetterResultEnum]>>(
    Array.from({ length: 30 }, () => ["", LetterResultEnum.Default])
  );

  const updateGrid = (index: number, wordState: Array<LetterResultEnum>) => {
    setGrid((prev) => {
      let temp = [...prev];
      for (let i = index; i < index + wordSize; i++) {
        temp[i] = [temp[i][0], wordState[i % 5]];
      }
      return temp;
    });
  };

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
      prev[gridIndex][0] = key.toLowerCase();
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
      grid[gridIndex][0] = "";
      setKeyCount((prev) => prev - 1);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEnterInput = async () => {
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

    const guess = Array.from(
      grid.slice(startIndex, endIndex),
      (e) => e[0]
    ).join("");

    fetch(`/api/getWordState?word=${guess}`).then((res) =>
      res.json().then((data) => {
        updateGrid(
          startIndex,
          Array.from(data.wordState, (s: String) => s as LetterResultEnum)
        );
      })
    );

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
      <nav className="h-20"></nav>
      <main className="">
        <div className="grid grid-cols-5 grid-rows-6 gap-3">
          {grid[0] !== undefined &&
            grid.map((value, index) => (
              <div
                id={index.toString()}
                key={index}
                className={`${value[1].toString()}`}
              >
                {value[0]}
              </div>
            ))}
        </div>
      </main>
      {/* <footer>footer</footer> */}
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
