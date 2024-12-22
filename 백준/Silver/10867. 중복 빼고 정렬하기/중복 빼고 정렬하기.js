const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
const N = +input[0]
const arr = input[1].split(' ').map(Number)
const sortedArr = [...new Set([...arr].sort((a, b) => a - b))]
console.log(sortedArr.join(' '))