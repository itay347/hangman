import images from "./images";

type HangmanDrawingProps = {
  missesCount: number;
};

function HangmanDrawing({missesCount}: HangmanDrawingProps) {
  return (
    <img
      src={images[missesCount]}
      className="Hangman-image"
      alt="hangman drawing"
    />
  );
}

export default HangmanDrawing;
