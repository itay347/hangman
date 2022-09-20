type MissesProps = {
  misses: string[];
};

const Misses = ({ misses }: MissesProps) => {
  return (
    <p>
      Misses:{" "}
      {misses.length === 0 && "(None)"}
      {misses.map((letter, i) => [
        i > 0 && ", ",
        <span key={i}>{letter}</span>,
      ])}
    </p>
  );
}

export default Misses;
