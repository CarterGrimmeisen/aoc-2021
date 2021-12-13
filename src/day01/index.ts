import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((each) => parseInt(each))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input.filter((each, i, list) => (i === 0 ? false : each > list[i - 1]))
    .length
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const sum = (list: number[]) =>
    list.reduce((acc, each) => acc + (each ?? 0), 0)

  return input
    .map((_, i, list) =>
      i + 2 > list.length ? null : sum(list.slice(i, i + 3)),
    )
    .filter((each) => each != null)
    .filter((each, i, list) => (i === 0 ? false : each! > list[i - 1]!)).length
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
