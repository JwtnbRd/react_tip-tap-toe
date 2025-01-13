const useGameRegulation = () => {
  const getWinner = (squares: (string | null)[]) => {
    const linesForWin = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    const completedLine = linesForWin.find((_, i) => {
      const [a, b, c] = linesForWin[i];
      return squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
    })

    return completedLine ? squares[completedLine[0]] : null
  }

  return { getWinner }
}

export default useGameRegulation