import run from "aocrunner"
import { chunk } from "../utils/index.js"

type Slot = [number, boolean]
type Line = Slot[]
type Board = Line[]

const parseInput = (rawInput: string): [number[], Board[]] => {
  const lines = rawInput.split("\n")
  const moves = lines[0].split(",").map((each) => parseInt(each))

  const boards = chunk(
    lines
      .slice(1)
      .filter((each) => each.trim() !== "")
      .map((each) =>
        each.split(" ").map<Slot>((each) => [parseInt(each), false]),
      ),
    5,
  )

  return [moves, boards]
}

const getCol = (board: Board, col: number) =>
  board.reduce<Line>((acc, line) => [...acc, line[col]], [])
const checkWin = (board: Board) =>
  board.some((line) => line.every(([, played]) => played)) ??
  [0, 1, 2, 3, 4].some((each) =>
    getCol(board, each).every(([, played]) => played),
  )

const part1 = (rawInput: string) => {
  const [moves, boards] = parseInput(rawInput)

  const [winningBoard] = moves.reduce<[Board | null, Board[]]>(
    ([winner, boards], move) => {
      if (winner !== null) return [winner, []]

      const newBoards = boards.map((board) => {
        for (const line of board) {
          const slot = line.find((val) => val[0] === move)
          if (slot) slot[1] = true
        }

        return board
      })

      newBoards.forEach((board) => {
        if (checkWin(board)) return [board, []]
      })

      return [winner, newBoards]
    },
    [null, boards],
  )

  // const winningBoard?.flat().filter(each => )
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
