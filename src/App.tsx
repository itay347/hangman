import React, { useState } from "react";
import "./App.css";
import hangman0 from "./images/Hangman-0.png";

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
      {/* TODO: extract the image to a component that gets the number of misses and displays the correct image */}
      <img src={hangman0} className="Hangman-Image" alt="hangman drawing" />
      {/* TODO: extract to component that gets the (incomplete) word and displays "Word: " with spaces... */}
      <p>Word: _ _ _ _</p>
      {/* TODO: Extract to component that gets an array of letter misses */}
      <p>Misses:{' '}
        {misses.map((letter, i) => [
          i > 0 && ", ",
          <span key={i}>{letter}</span>
        ])}
      </p>
      {/* TODO: only allow letters & auto capitalize the letter */}
      <input type="text" id="atext" maxLength={1} placeholder="Enter letter guess" />
      {/* TODO: handle submit click */}
      <button>Submit</button>
    </div>
  );
}

export default App;
