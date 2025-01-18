
type SquareProps = {
  value: string | null;
  handleClick: () => void;
}

export default function Square({ value, handleClick }: SquareProps) {
  return <button className="square" onClick={handleClick}>{value}</button>;
}
