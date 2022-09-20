import { useState, useEffect } from "react";
import Misses from "../Misses";
import "./App.css";
import HangmanDrawing from "../HangmanDrawing";
import words from "./words";
import WordSelect from "../WordSelect";
import LetterInput from "../LetterInput";
import WordDisplay from "../WordDisplay";
import { MAX_MISSES } from "../HangmanDrawing/images/index";

// TODO: remove all logs after I'm done

enum GameState {
  NotStarted,
  Playing,
  Win,
  Lose
}

const App = () => {
  const [wordIndex, setWordIndex] = useState<number>();
  const word = wordIndex !== undefined ? words[wordIndex] : "";
  const [revealedLetters, setRevealedLetters] = useState<string[]>([]);
  const [misses, setMisses] = useState<string[]>([]);
  const [letterInput, setLetterInput] = useState<string>("");
  const [gameState, setGameState] = useState<GameState>(GameState.NotStarted);
  const isGameOver = gameState === GameState.Lose || gameState === GameState.Win;

  useEffect(() => console.log({wordIndex, word}), [wordIndex, word]);

  const resetGame = () => {
    setGameState(GameState.Playing);
    setRevealedLetters([]);
    setMisses([]);
    setLetterInput("");
  }

  const handleWordIndexChange = (wordIndex: number) => {
    setWordIndex(wordIndex);
    resetGame();
  }

  const handleLetterChange = (letter: string) => {
    setLetterInput(letter);
  }

  const handleSubmitClick = () => {
    if (letterInput === "") {
      return;
    }

    if (revealedLetters.includes(letterInput) || misses.includes(letterInput)) {
      window.alert("You already guessed the letter " + letterInput);
    } else {
      console.log("submitted: " + letterInput);
      if (word?.includes(letterInput)) {
        setRevealedLetters([...revealedLetters, letterInput]);
      } else {
        setMisses([...misses, letterInput]);
      }
    }

    setLetterInput("");
  }

  useEffect(() => {
    if (word === "") {
      return;
    }

    const unrevealedLetters = word.split("").filter(letter => !revealedLetters.includes(letter));
    if (unrevealedLetters.length === 0) {
      setGameState(GameState.Win);
    }
  }, [word, revealedLetters]);

  useEffect(() => {
    if (misses.length >= MAX_MISSES) {
      setGameState(GameState.Lose);
    }
  }, [misses])

  return (
    <div className="App">
      <h1>Hangman</h1>
      <WordSelect words={words} onWordIndexChange={handleWordIndexChange} />
      <button onClick={() => resetGame()}>Reset game</button>
      {gameState !== GameState.NotStarted && (
        <>
          <HangmanDrawing missesCount={misses.length} />
          <WordDisplay word={word} revealedLetters={revealedLetters} />
          <Misses misses={misses} />
          <LetterInput
            className="Letter-input"
            letter={letterInput}
            onLetterChange={handleLetterChange}
            onEnterKeyDown={handleSubmitClick}
            disabled={isGameOver}
          />
          <button onClick={handleSubmitClick} disabled={isGameOver}>Submit</button>
          <h2>
            { gameState === GameState.Win && "You won the game" }
            { gameState === GameState.Lose && "You lost the game" }
          </h2>
        </>
      )}
    </div>
  );
}

export default App;
