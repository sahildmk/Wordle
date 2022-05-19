import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useRef, useState } from "react";
import {
  getGridIndex,
  LetterResultEnum,
  maxWords,
  SingleLetterRegex,
  useEventListener,
  wordSize,
} from "../utils/utils";
import HowToPlayModal from "./components/HowToPlayModal";

const Home: NextPage = () => {
  const [keyCount, setKeyCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const winCondition = useRef(false);
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

    if (wordState.at(0) === LetterResultEnum.Win) winCondition.current = true;
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
      if (winCondition.current) return;

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="1"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <nav className="h-40">
        <HowToPlayModal />
      </nav>
      <main className="">
        <div className="grid grid-cols-5 grid-rows-6 gap-3">
          {grid[0] !== undefined &&
            grid.map((value, index) => (
              <div
                id={index.toString()}
                key={index}
                className={`${value[1].toString()} transition-all tile-transition-${
                  index % wordSize
                } duration-500`}
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

export default Home;
