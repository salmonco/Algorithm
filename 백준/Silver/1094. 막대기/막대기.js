const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number)
const X = input[0]
const sticks = [64]

while (true) {
    const sum = sticks.reduce((acc, cur) => acc + cur, 0)
    if (sum === X) {
        console.log(sticks.length)
        return
    }
    const shortest = sticks[sticks.length-1]
    const half = shortest / 2
    sticks.pop()
    sticks.push(half)
    sticks.push(half)
    const remainSum = sum - half
    if (remainSum >= X) {
        sticks.pop()
    }
}

/*
8:42

2초.

X=23
64 > 23
-> 32 / 32 -> 32

32 > 23
-> 16 / 16

32 > 23
-> 8 / 8 / 16 -> 8 / 16

24 > 23
-> 4 / 4 / 16

24 > 23
-> 2 / 2 / 4 / 16

24 > 23
-> 1 / 1 / 2 / 4 / 16 -> 1 / 2 / 4 / 16
-> 4개로 완성

오름차순 정렬하고 push pop 하면 될 거 같은데. 
*/