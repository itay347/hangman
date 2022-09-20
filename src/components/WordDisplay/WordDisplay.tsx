import { useMemo } from "react";

type WordDisplayProps = {
  word: string;
  revealedLetters: string[];
}

const WordDisplay = ({word, revealedLetters}: WordDisplayProps) => {
  const createDisplayWord = (word: string, revealedLetters: string[]) => {
    const displayWord =  word.split("").map(letter => {
      return revealedLetters.includes(letter) ? letter : "_"
    }).join(" ");

    return displayWord;
  }

  const wordForDisplay = useMemo(() => createDisplayWord(word, revealedLetters), [word, revealedLetters]);

  return (<p>{"Word: " + wordForDisplay}</p>);
}

export default WordDisplay;
