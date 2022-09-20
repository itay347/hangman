import { useState, ChangeEventHandler, useEffect } from "react";
import Misses from "../Misses";
import "./App.css";
import HangmanDrawing from "../HangmanDrawing";
import words from "./words";

function App() {
  // TODO: Make sure to always have a capital letter, even if the input was not
  const [wordIndex, setWordIndex] = useState<number>();
  const word = wordIndex !== undefined ? words[wordIndex] : undefined;
  const [misses, setMisses] = useState<string[]>(["A","B","C"]); // TODO: init as empty

  useEffect(() => console.log({wordIndex, word}), [wordIndex, word]);

  const resetGame = () => {
    setMisses([]);
    // TODO: add other resets here
  }

  const handleWordSelectChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setWordIndex(Number(event.target.value));
    resetGame();
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
      {/* TODO: only allow letters & auto capitalize the letter */}
      <input
        type="text"
        id="atext"
        maxLength={1}
        placeholder="Enter letter guess"
      />
      {/* TODO: handle submit click */}
      <button>Submit</button>
      {/* TODO: add win/lose display */}
    </div>
  );
}

export default App;
