import { useState } from "react"
import Board from "../molecules/Board"
import useGameRegulation from "../../hooks/useGameRegulation"

export default function Game() {
  const [currentSquares, setCurrentSquares] = useState<(string | null)[]>(Array(9).fill(null))
  const [historyArrays, setHistoryArrays] = useState<(string | null)[][]>([])
  const [isNextPlayerX, setIsNextPlayerX] = useState<boolean>(true)
  const { getWinner } = useGameRegulation()

  const handleBoardClick = (i: number) => {
    // getWinner関数は各クリックの時点でsquaresの状況がlinesForWinに該当するかを都度判断している。
    // squaresの状況がlinesForWinの勝利パターンのいずれかに合致すれば勝利パターンのマスを埋めている文字列を返す。
    // それ以外はnullを返す。つまり、getWinnerがnullを返さなくなった瞬間は勝利者が決まった瞬間である
    if (currentSquares[i] || getWinner(currentSquares)) {
      return
    }

    // クリックされた要素のインデックス番号はどうやって識別する？
    // ここのコンポーネントでhandleClick={handleClick(i)}とするのはNGとまではわかっていたけど…
    // .sliceが重要！sliceがなければ動作しない。
    const updatedSquares = currentSquares.slice();
    updatedSquares[i] = isNextPlayerX ? "X" : "O"

    // 以下の方法でも書き換えは可能であるが、
    // 後半の巻き戻し処理の実装のために操作前の配列に戻れるようにしておくため、
    // コピーを用意しておく。
    // またこの方法でやると初回クリック時の結果がブラウザに表示される際に遅延が発生する。
    // setSquares((currentSquares) => {
    //   return (
    //     [
    //       ...currentSquares,
    //       currentSquares[i] = "X"
    //     ]
    //   )
    // })
    setCurrentSquares(updatedSquares)
    setIsNextPlayerX(!isNextPlayerX)
    setHistoryArrays((currentHistory) => {
      return (
        [
          ...currentHistory,
          currentSquares
        ]
      )
    })
  }

  const handleHistoryClick = (i: number) => {
    setCurrentSquares(historyArrays[i])
  }

  return (
    <>
      <Board squares={currentSquares} isNextPlayerX={isNextPlayerX} handleBoardClick={handleBoardClick} />
      {historyArrays.map((_, i) => (
        <button key={i + 1} onClick={() => handleHistoryClick(i)}>Back to {i + 1}</button>
      ))}
    </>
  )
}