import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((pair) =>
      pair
        .split(" -> ")
        .map((coord) => coord.split(",").map((point) => parseInt(point))),
    )

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const board = Array.from({ length: 1000 }).map((_) =>
    Array.from({ length: 1000 }).map((_) => 0),
  )

  for (const vector of input) {
    if (vector[0][0] !== vector[1][0] && vector[0][1] !== vector[1][1]) continue
    
    const leftToRight = vector[0][0] < vector[1][0] ? 1 : vector[0][0] === vector[1][0] ? 0 : -1
    const topToBottom = vector[0][1] < vector[1][1] ? 1 : vector[0][1] === vector[1][1] ? 0 : -1

    for (let i = 0; i <= Math.max(Math.abs(vector[1][0] - vector[0][0]), Math.abs(vector[1][1] - vector[0][1])); i++)
      board[vector[0][0] + leftToRight * i][vector[0][1] + topToBottom * i]++
  }

  return board.flat().filter((each) => each >= 2).length
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const board = Array.from({ length: 1000 }).map((_) =>
    Array.from({ length: 1000 }).map((_) => 0),
  )

  for (const vector of input) {
    const leftToRight = vector[0][0] < vector[1][0] ? 1 : vector[0][0] === vector[1][0] ? 0 : -1
    const topToBottom = vector[0][1] < vector[1][1] ? 1 : vector[0][1] === vector[1][1] ? 0 : -1

    for (let i = 0; i <= Math.max(Math.abs(vector[1][0] - vector[0][0]), Math.abs(vector[1][1] - vector[0][1])); i++)
      board[vector[0][0] + leftToRight * i][vector[0][1] + topToBottom * i]++
  }

  return board.flat().filter((each) => each >= 2).length
}

run({
  part1: {
    tests: [],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0,9 -> 5,9
        8,0 -> 0,8
        9,4 -> 3,4
        2,2 -> 2,1
        7,0 -> 7,4
        6,4 -> 2,0
        0,9 -> 2,9
        3,4 -> 1,4
        0,0 -> 8,8
        5,5 -> 8,2
        `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
