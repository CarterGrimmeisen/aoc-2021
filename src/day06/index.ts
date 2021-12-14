import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split(',').map(each => parseInt(each))

const part1 = (rawInput: string) => {
  let fishes = parseInput(rawInput)

  for (let day = 0; day < 80; day++) {
    let startCount = fishes.length
    for (let i = 0; i < startCount; i++) {
      fishes[i]--

      if (fishes[i] === -1) {
        fishes[i] = 6
        fishes.push(8)
      }
    }
  }

  return fishes.length
}

const part2 = (rawInput: string) => {
  const fishes = parseInput(rawInput)

  let fishDays = Array.from({ length: 9 }, (_, i) => fishes.filter(fish => fish === i).length)

  for (let day = 0; day < 256; day++) {
    const lastDay = [...fishDays]
    for (let i = 0; i < 9; i++) {
      fishDays[i] = lastDay[(i + 1) % 9]

      if (i === 6) fishDays[i] += lastDay[0]
    }
  }

  return fishDays.reduce((acc, each) => acc + each, 0)
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
