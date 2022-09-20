import { useState, ChangeEventHandler, useEffect } from "react";
import Misses from "../Misses";
import "./App.css";
import HangmanDrawing from "../HangmanDrawing";
import words from "./words";

// TODO: remove all logs after I'm done

function App() {
  const [wordIndex, setWordIndex] = useState<number>();
  const word = wordIndex !== undefined ? words[wordIndex] : undefined;
  const [revealedLetters, setRevealedLetters] = useState<string[]>([]);
  const [misses, setMisses] = useState<string[]>(["A","B","C"]); // TODO: init as empty
  const [letterInput, setLetterInput] = useState<string>("");

  useEffect(() => console.log({wordIndex, word}), [wordIndex, word]);

  const resetGame = () => {
    setRevealedLetters([]);
    setMisses([]);
    setLetterInput("");
  }

  const handleWordSelectChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setWordIndex(Number(event.target.value));
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

  const handleSubmitClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    
  }

  return (
    <div className="App">
      <h1>Hangman</h1>
      <select
        name="word"
        id="word-select"
        defaultValue="none"
        onChange={handleWordSelectChange}
      >
        <option value="none" disabled hidden>
          Click to choose a game...
        </option>
        {words.map((_, i) => (
          <option key={i} value={i}>
            {i + 1}
          </option>
        ))}
      </select>
      <button onClick={() => resetGame()}>Reset game</button>
      <HangmanDrawing missesCount={misses.length} />
      {/* TODO: extract to component that gets the (incomplete) word and displays "Word: " with spaces... */}
      <p>Word: _ _ _ _ { word }</p>
      <Misses misses={misses} />
      <input
        type="text"
        id="letter-input"
        name="letter"
        maxLength={1}
        placeholder="Enter letter guess"
        value={letterInput}
        onChange={handlerLetterInputChange}
      />
      {/* TODO: handle submit click */}
      <button onClick={handleSubmitClick}>Submit</button>
      {/* TODO: add win/lose display */}
    </div>
  );
}

export default App;
