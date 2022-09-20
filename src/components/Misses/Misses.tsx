type MissesProps = {
  misses: string[];
};

function Misses({ misses }: MissesProps) {
  return (
    <p>
      Misses:{" "}
      {misses.map((letter, i) => [
        i > 0 && ", ",
        <span key={i}>{letter}</span>,
      ])}
    </p>
  );
}

export default Misses;
