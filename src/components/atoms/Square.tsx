
type SquareProps = {
  value: string | null;
  handleClick: () => void;
  isHighlighted: boolean | undefined;
}

export default function Square({
  value,
  handleClick,
  isHighlighted
}: SquareProps) {
  return (
    <button
      style={{
        backgroundColor: isHighlighted ? 'blue' : '',
        color: isHighlighted ? 'white' : ''
      }}
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
