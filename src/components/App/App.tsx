import { useState, useEffect } from "react";
import Misses from "../Misses";
import "./App.css";
import HangmanDrawing from "../HangmanDrawing";
import words from "./words";
import WordSelect from "../WordSelect";
import LetterInput from "../LetterInput";
import WordDisplay from "../WordDisplay";

// TODO: remove all logs after I'm done

function App() {
  const [wordIndex, setWordIndex] = useState<number>();
  const word = wordIndex !== undefined ? words[wordIndex] : "";
  const [revealedLetters, setRevealedLetters] = useState<string[]>([]);
  const [misses, setMisses] = useState<string[]>([]);
  const [letterInput, setLetterInput] = useState<string>("");

  useEffect(() => console.log({wordIndex, word}), [wordIndex, word]);

  const resetGame = () => {
    setRevealedLetters([]);
    setMisses([]);
    setLetterInput("");
  }

  const handleWordIndexChange = (wordIndex: number) => {
    setWordIndex(wordIndex);
    resetGame();
  }

  const handleLetterChange = (letter: string) => {
    if (letter !== "") {
      console.log(letter);
    }
    setLetterInput(letter);
  }

  const handleSubmitClick = () => {
    if (letterInput === "") {
      return;
    }

    if (revealedLetters.includes(letterInput) || misses.includes(letterInput)) {
      window.alert("You already guessed the letter " + letterInput);
      setLetterInput("");
    } else {
      console.log("submitted: " + letterInput);
      if (word?.includes(letterInput)) {
        setRevealedLetters([...revealedLetters, letterInput]);
      } else {
        setMisses([...misses, letterInput]);
      }
      setLetterInput("");
    }
  }

  return (
    <div className="App">
      <h1>Hangman</h1>
      <WordSelect words={words} onWordIndexChange={handleWordIndexChange} />
      <button onClick={() => resetGame()}>Reset game</button>
      {word && (
        <>
          <HangmanDrawing missesCount={misses.length} />
          <WordDisplay word={word} revealedLetters={revealedLetters} />
          <Misses misses={misses} />
          <LetterInput
            letter={letterInput}
            onLetterChange={handleLetterChange}
            onEnterKeyDown={handleSubmitClick}
          />
          <button onClick={handleSubmitClick}>Submit</button>
          {/* TODO: add win/lose display */}
        </>
      )}
    </div>
  );
}

export default App;
