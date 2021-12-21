import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split(",").map((each) => parseInt(each))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let best: [number | null, number] = [null, Number.POSITIVE_INFINITY]
  for (let i = 0; i < 2000; i++) {
    let totFuel = 0
    for (const x of input) totFuel += Math.abs(x - i)

    if (totFuel < best[1]) best = [i, totFuel]
  }

  return best[1]
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let best: [number | null, number] = [null, Number.POSITIVE_INFINITY]
  for (let i = 0; i < 2000; i++) {
    let totFuel = 0
    for (const x of input) {
      const distance = Math.abs(x - i)
      totFuel += (Math.pow(distance, 2) + distance) / 2
    }

    if (totFuel < best[1]) best = [i, totFuel]
  }

  return best[1]
}

run({
  part1: {
    tests: [
      {
        input: `16,1,2,0,4,2,7,1,2,14`,
        expected: 37,
      },
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
