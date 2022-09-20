import { useState } from "react";
import Misses from "../Misses";
import "./App.css";
import HangmanDrawing from "../HangmanDrawing";

function App() {
  // TODO: Make sure to always have a capital letter, even if the input was not
  const [misses, setMisses] = useState<string[]>(["A","B","C"]); // TODO: init as empty

  return (
    <div className="App">
      <h1>Hangman</h1>
      {/* TODO: use state for the list options */}
      {/* TODO: handle select event */}
      <select name="word" id="word">
        <option value="none" selected disabled hidden>Click to choose a game...</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      {/* TODO: handle reset click */}
      <button>Reset game</button>
      <HangmanDrawing missesCount={misses.length} />
      {/* TODO: extract to component that gets the (incomplete) word and displays "Word: " with spaces... */}
      <p>Word: _ _ _ _</p>
      <Misses misses={misses} />
      {/* TODO: only allow letters & auto capitalize the letter */}
      <input type="text" id="atext" maxLength={1} placeholder="Enter letter guess" />
      {/* TODO: handle submit click */}
      <button>Submit</button>
    </div>
  );
}

export default App;
