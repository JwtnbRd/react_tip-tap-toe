import { useState } from "react";

type ClickedPointType = {
  row?: number;
  col?: number;
}

type HistoryButtonProps = {
  jumpTo: (i: number) => void;
  histories: (string | null)[][];
  currentMove: number;
  pointHistories: ClickedPointType[];
}

export default function HistoryButtons({
  jumpTo,
  histories,
  currentMove,
  pointHistories
}: HistoryButtonProps) {
  return (
    <>
      <ol>
        {histories.map((_, i) => (
          <li key={i}>
            <button onClick={() => jumpTo(i)}>{i > 0 ? `Go to move ${i}` : `Go to game start`}</button>
            {pointHistories.map((p, innerIndex) => (
              <span key={innerIndex}>{innerIndex === i && p.row && p.col && `(row: ${p.row} col: ${p.col})`}</span>
            ))}
          </li>
        ))}
        <li>{`You are at move #${currentMove + 1}`}</li>
      </ol>
    </>
  )
}
