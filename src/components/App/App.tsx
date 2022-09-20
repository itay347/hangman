import { useState, ChangeEventHandler, useEffect, useMemo } from "react";
import Misses from "../Misses";
import "./App.css";
import HangmanDrawing from "../HangmanDrawing";
import words from "./words";
import WordSelect from "../WordSelect";

// TODO: remove all logs after I'm done

function App() {
  const [wordIndex, setWordIndex] = useState<number>();
  const word = wordIndex !== undefined ? words[wordIndex] : "";
  const [revealedLetters, setRevealedLetters] = useState<string[]>([]);
  const [misses, setMisses] = useState<string[]>([]);
  const [letterInput, setLetterInput] = useState<string>("");

  const createDisplayWord = (word: string, revealedLetters: string[]) => {
    const displayWord =  word.split("").map(letter => {
      return revealedLetters.includes(letter) ? letter : "_"
    }).join(" ");

    return displayWord;
  }

  const displayWord = useMemo(() => createDisplayWord(word, revealedLetters), [word, revealedLetters]);

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

  const handlerLetterInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    let letter: string = event.target.value.toUpperCase().replace(/[^A-Z]/gi, "");

    if (letter !== "") {
      console.log(letter);

      if (revealedLetters.includes(letter) || misses.includes(letter)) {
        letter = "";
      }
    }

    setLetterInput(letter);
  }

  const handleSubmitClick = () => {
    if (letterInput === "") {
      return;
    }

    if (revealedLetters.includes(letterInput) || misses.includes(letterInput)) {
      // NOTE: This is not supposed to happen, but just to make sure:
      window.alert("You already guessed the letter " + letterInput);
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
      {
        word &&
        <>
          <HangmanDrawing missesCount={misses.length} />
          <p>{"Word: " + displayWord}</p>
          <Misses misses={misses} />
          <input
            type="text"
            id="letter-input"
            name="letter"
            maxLength={1}
            placeholder="Enter letter guess"
            value={letterInput}
            onChange={handlerLetterInputChange}
            onKeyDown={(e) => {if (e.key === "Enter") handleSubmitClick()}}
          />
          <button onClick={handleSubmitClick}>Submit</button>
          {/* TODO: add win/lose display */}
        </>
      }
      
    </div>
  );
}

export default App;
