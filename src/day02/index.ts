import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((each) => each.split(" "))
    .map(([instr, value]): [string, number] => [instr, parseInt(value)])

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const [xPos, yPos] = input.reduce<[number, number]>(
    ([x, y], [instr, value]) => {
      switch (instr) {
        case "forward":
          return [x + value, y]
        case "down":
          return [x, y + value]
        case "up":
          return [x, y - value]
        default:
          return [x, y]
      }
    },
    [0, 0],
  )

  return xPos * yPos
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const [xPos, yPos] = input.reduce<[number, number, number]>(
    ([x, y, aim], [instr, value]) => {
      switch (instr) {
        case "forward":
          return [x + value, y + aim * value, aim]
        case "down":
          return [x, y, aim + value]
        case "up":
          return [x, y, aim - value]
        default:
          return [x, y, aim]
      }
    },
    [0, 0, 0],
  )

  return xPos * yPos
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
