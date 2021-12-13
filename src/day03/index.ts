import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((each) => each.split("").map((each) => parseInt(each)))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const probs = input
    .reduce<number[]>(
      (acc, input) => acc.map((x, i) => x + input[i]),
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    )
    .map((each) => each / input.length)
    .map((each) => each >= 0.5)

  // return [first, second, third, fourth, fifth]

  const gamma = probs.map((each) => (each ? 1 : 0)).join("")
  const epsilon = probs.map((each) => (each ? 0 : 1)).join("")

  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const toTwelve = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const reducer =
    (bitFromProb: (prob: boolean) => number) =>
    (rem: number[][], i: number) => {
      if (rem.length === 1) return rem
      const bit = bitFromProb(
        rem.reduce<number>((acc, each) => acc + each[i], 0) / rem.length >= 0.5,
      )

      return rem.filter((each) => each[i] === bit)
    }

  let o2Gen = toTwelve
    .reduce(
      reducer((prob) => (prob ? 1 : 0)),
      input,
    )[0]
    .join("")

  let co2Scrub = toTwelve
    .reduce(
      reducer((prob) => (prob ? 0 : 1)),
      input,
    )[0]
    .join("")

  return parseInt(o2Gen, 2) * parseInt(co2Scrub, 2)
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
