import { ReactNode, useState } from "react";

type SquareProps = {
  value: string | null;
  handleClick: () => void;
}

export default function Square({ value, handleClick }: SquareProps) {
  // const [value, setValue] = useState<string>("");

  return (
    <>
      <button className="square" onClick={handleClick}>{value}</button>
    </>
  )
}
