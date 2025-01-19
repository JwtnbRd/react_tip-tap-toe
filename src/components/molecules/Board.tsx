import Square from "../atoms/Square";

type GameResult = {
  winner: string | null;
  completedLine: number[] | undefined;
}

type BoardProps = {
  squares: (string | null)[];
  isNextX: boolean;
  onPlay: (squares: (string | null)[], i: number) => void;
  gameResult?: GameResult;
  currentMove: number;
}

export default function Board({
  squares,
  isNextX,
  onPlay,
  gameResult,
  currentMove
}: BoardProps) {
  const dividedSquares: (string | null)[][] = []
  squares.forEach((_, i) => {
    if (i % 3 === 0) {
      dividedSquares.push(squares.slice(i, i + 3))
    }
  })

  const handleBoardClick = (i: number) => {
    if (squares[i] || gameResult?.winner) {
      return
    }

    const nextSquares = squares.slice();
    nextSquares[i] = isNextX ? "X" : "O"
    onPlay(nextSquares, i)
  }

  let status;
  if (currentMove === 9 && !gameResult?.winner) {
    status = "It's a draw..."
  } else if (gameResult?.winner) {
    status = "Winner: " + gameResult?.winner;
  } else {
    status = "Next player: " + (isNextX ? "X" : "O");
  }

  return (
    <>
      <p>{status}</p>
      {dividedSquares.map((squareGroup, outerIndex) => (
        <div key={outerIndex} className="board-row">
          {squareGroup.map((_, innerIndex) => (
            <Square
              key={innerIndex}
              isHighlighted={gameResult?.completedLine?.includes(innerIndex + outerIndex * 3)}
              value={squares[innerIndex + outerIndex * 3]}
              handleClick={() => handleBoardClick(innerIndex + outerIndex * 3)} />
          ))}
        </div>
      ))}
    </>
  )
}
