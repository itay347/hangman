import { ChangeEventHandler } from "react";

type LetterInputProps = {
  letter: string;
  onLetterChange: (letter: string) => void;
  onEnterKeyDown: () => void;
  disabled: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

function LetterInput({letter, onLetterChange, onEnterKeyDown, disabled, className}: LetterInputProps) {

  const handlerLetterInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    let letter: string = event.target.value.toUpperCase().replace(/[^A-Z]/gi, "");
    onLetterChange(letter);
  }

  return (
    <input
      className={className}
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
      disabled={disabled}
    />
  );
}

export default LetterInput;
