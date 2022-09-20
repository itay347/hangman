import { ChangeEventHandler } from "react";

type LetterInputProps = {
  letter: string;
  onLetterChange: (letter: string) => void;
  onEnterKeyDown: () => void;
};

function LetterInput({letter, onLetterChange, onEnterKeyDown}: LetterInputProps) {

  const handlerLetterInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    let letter: string = event.target.value.toUpperCase().replace(/[^A-Z]/gi, "");
    onLetterChange(letter);
  }

  return (
    <input
      type="text"
      id="letter-input"
      name="letter"
      maxLength={1}
      placeholder="Enter letter guess"
      value={letter}
      onChange={handlerLetterInputChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") onEnterKeyDown();
      }}
    />
  );
}

export default LetterInput;