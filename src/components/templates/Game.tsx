import { useState } from "react"
import Board from "../molecules/Board"
import { useGameRegulation } from "../../hooks/useGameRegulation"
import HistoryButtons from "../molecules/historyButtons"

type ClickedPointType = {
  row?: number;
  col?: number;
}

export default function Game() {
  // const [isNextX, setIsNextX] = useState<boolean>(true)
  const [histories, setHistories] = useState<(string | null)[][]>([Array(9).fill(null)])
  const [pointHistories, setPointHistories] = useState<ClickedPointType[]>([{}])
  const [currentMove, setCurrentMove] = useState<number>(0)
  const currentSquares = histories[currentMove]
  const isNextX = currentMove % 2 === 0
  // 元々historyの最後の情報を取る仕様だった。どこで変わった？
  // これだと固定的にhistoryの最後の情報に基づいたcurrentSquaresしか作れないので、NG
  // const currentSquares = history[history.length - 1]

  const { getGameResult } = useGameRegulation()
  const result = getGameResult(currentSquares);

  // ここも元々squaresを引数名としていたが、nextSquareに変わった。
  // 意味は同じだが、意図するものが変わった？
  // BoardのonPlayの引数として返ってくるのがこの引数。
  // onPlayの引数は新しいマスがクリックされたときの成果物が渡されるため、最新の状況が入ってくる。
  // それをhistoryの最後に加えている。
  // const handlePlay = (squares: (string | null)[]) => {
  const handlePlay = (nextSquares: (string | null)[], clickedIndex: number) => {

    const currentPoint: ClickedPointType = {}
    currentPoint.row = Math.floor(clickedIndex / 3) + 1
    currentPoint.col = clickedIndex % 3 + 1
    const nextHistory = [...histories.slice(0, currentMove + 1), nextSquares];
    const nextClickedPoints = [...pointHistories.slice(0, currentMove + 1), currentPoint]
    setHistories(nextHistory);
    setPointHistories(nextClickedPoints)
    setCurrentMove(nextHistory.length - 1)
    // setIsNextX(!isNextX)
  }

  const jumpTo = (i: number) => {
    setCurrentMove(i)
    // setIsNextX(i % 2 === 0)
  }

  return (
    <>
      <Board
        isNextX={isNextX}
        squares={currentSquares}
        currentMove={currentMove}
        onPlay={handlePlay}
        gameResult={result}
      />
      <HistoryButtons
        histories={histories}
        pointHistories={pointHistories}
        jumpTo={jumpTo}
        currentMove={currentMove}
      />
    </>
  )
}