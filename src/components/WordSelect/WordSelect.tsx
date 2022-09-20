type GameSelectProps = {
  words: string[],
  onWordIndexChange: (wordIndex: number) => void;
}

function WordSelect({words, onWordIndexChange}: GameSelectProps) {
  return (
    <select
      name="word"
      id="word-select"
      defaultValue="none"
      onChange={(event) => {onWordIndexChange(Number(event.target.value))}}
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
  );
}

export default WordSelect;
