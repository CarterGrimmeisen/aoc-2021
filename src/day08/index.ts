import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((each) =>
      each.split(" | ").map((each) => each.split(" ").map((each) => each)),
    )

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input
    .map(([_, output]) => output)
    .reduce(
      (acc, each) =>
        acc + each.filter((str) => [2, 3, 4, 7].includes(str.length)).length,
      0,
    )
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  for (const [digitInput, output] of input) {
    const digitMap: Record<number, string> = {}
    const segmentMap: Record<string, string> = {}
    digitMap[1] = digitInput.find((each) => each.length === 2)!
    digitMap[4] = digitInput.find((each) => each.length === 4)!
    digitMap[7] = digitInput.find((each) => each.length === 3)!
    digitMap[8] = digitInput.find((each) => each.length === 7)!

    // Known segments from the 1
    segmentMap["a"] = digitMap[7]
      .split("")
      .find((each) => !digitMap[1].includes(each))![0]

    // for (const digit of )
  }
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
