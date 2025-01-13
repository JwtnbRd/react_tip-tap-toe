import Square from "../atoms/Square";
import useGameRegulation from "../../hooks/useGameRegulation";

type BoardProps = {
  squares: (string | null)[];
  isNextPlayerX: boolean;
  handleBoardClick: (i: number) => void;
}

export default function Board({ squares, isNextPlayerX, handleBoardClick }: BoardProps) {
  const { getWinner } = useGameRegulation()
  // 当初、このwinnerの定義をhandleClick内で行なっていたので、
  // 勝者が決まった瞬間の次のクリックでしか勝者の表示ができなかった。
  // 即時評価なら地の文? useStateでwinnerを管理したくなるけどしないほうが良さそう。
  const winner = getWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isNextPlayerX ? "X" : "O");
  }

  return (
    <>
      <p>{status}</p>
      <div className="board-row">
        <Square value={squares[0]} handleClick={() => handleBoardClick(0)} />
        <Square value={squares[1]} handleClick={() => handleBoardClick(1)}/>
        <Square value={squares[2]} handleClick={() => handleBoardClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleClick={() => handleBoardClick(3)}/>
        <Square value={squares[4]} handleClick={() => handleBoardClick(4)}/>
        <Square value={squares[5]} handleClick={() => handleBoardClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleClick={() => handleBoardClick(6)}/>
        <Square value={squares[7]} handleClick={() => handleBoardClick(7)}/>
        <Square value={squares[8]} handleClick={() => handleBoardClick(8)}/>
      </div>
    </>
  )
}
