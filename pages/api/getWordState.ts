// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { LetterResultEnum, wordSize } from "../../utils/utils";

type Data = {
  wordState: Array<LetterResultEnum>;
};

const todaysWord = "mehak".split("");

let todaysWordMetaData: Map<string, number> = new Map();

const computeMetaData = () => {
  for (let i = 0; i < wordSize; i++) {
    todaysWordMetaData.set(todaysWord[i], 0);

    if (todaysWordMetaData.has(todaysWord[i])) {
      todaysWordMetaData.set(
        todaysWord[i],
        todaysWordMetaData.get(todaysWord[i])! + 1
      );
    }
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  computeMetaData();

  const {
    query: { word },
  } = req;

  let responseList: Array<LetterResultEnum> = Array.from(
    { length: 5 },
    () => LetterResultEnum.IncorrectLetter
  );

  if (word === todaysWord.join("")) {
    responseList = Array.from({ length: 5 }, () => LetterResultEnum.Win);

    res.status(200).json({ wordState: responseList });
    return;
  }

  for (let i = 0; i < wordSize; i++) {
    let correctLetter = todaysWord[i];
    let currLetter = word[i];

    if (correctLetter === currLetter) {
      responseList[i] = LetterResultEnum.Correct;
      todaysWordMetaData.set(
        currLetter,
        todaysWordMetaData.get(currLetter)! - 1
      );
    }
  }

  for (let i = 0; i < wordSize; i++) {
    let currLetter = word[i];

    if (
      todaysWord.includes(currLetter) &&
      todaysWordMetaData.get(currLetter)! > 0
    ) {
      responseList[i] = LetterResultEnum.IncorrectPos;
      todaysWordMetaData.set(
        currLetter,
        todaysWordMetaData.get(currLetter)! - 1
      );
    }
  }

  res.status(200).json({ wordState: responseList });
}
