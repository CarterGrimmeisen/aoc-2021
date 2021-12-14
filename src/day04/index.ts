import run from "aocrunner"
import { chunk } from "../utils/index.js"

type Slot = [number, boolean]
type Line = Slot[]
type Board = Line[]

const parseInput = (rawInput: string): [number[], Board[]] => {
  const lines = rawInput.split("\n")
  const moves = lines[0].split(",").map((each) => parseInt(each.trim()))

  const boards = chunk(
    lines
      .slice(1)
      .filter((each) => each.trim() !== "")
      .map((each) =>
        each
          .trimStart()
          .split(/ +/)
          .map<Slot>((each) => [parseInt(each.trim()), false]),
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

  const [tuple] = moves.reduce<[[Board, number] | null, Board[]]>(
    ([winner, boards], move) => {
      if (winner !== null) return [winner, []]

      const newBoards = boards.map((board) => {
        for (const line of board) {
          const slot = line.find((val) => val[0] === move)
          if (slot) slot[1] = true
        }

        return board
      })

      for (const board of newBoards)
        if (checkWin(board)) return [[board, move], []]

      return [winner, newBoards]
    },
    [null, boards],
  )

  const [winningBoard, lastMove] = tuple!

  const unplayed = winningBoard
    .flat()
    .filter(([, played]) => !played)
    .reduce<number>((acc, [num]) => acc + num, 0)

  return unplayed * lastMove
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const [moves, boards] = parseInput(rawInput)

  const [tuple] = moves.reduce<[[Board, number] | null, Board[]]>(
    ([prevWin, boards], move) => {
      let newBoards = boards.map((board) => {
        for (const line of board) {
          const slot = line.find((val) => val[0] === move)
          if (slot) slot[1] = true
        }

        return board
      })

      let nextWinner: [Board, number] | null = null
      for (let i = 0; i < newBoards.length; i++) {
        if (checkWin(newBoards[i])) {
          nextWinner = [newBoards[i], move]
          newBoards = [...newBoards.slice(0, i), ...newBoards.slice(i + 1)]
        }
      }

      return nextWinner ? [nextWinner, newBoards] : [prevWin, newBoards]
    },
    [null, boards],
  )

  const [lastWinner, lastMove] = tuple!

  const unplayed = lastWinner
    .flat()
    .filter(([, played]) => !played)
    .reduce<number>((acc, [num]) => acc + num, 0)

  return unplayed * lastMove
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
