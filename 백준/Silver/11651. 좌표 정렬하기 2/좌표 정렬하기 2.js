const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
const N = +input[0]
const arr = input.slice(1).map((v) => v.split(' ').map(Number))
const sortedArr = [...arr].sort((a, b) => a[0] - b[0]).sort((a, b) => a[1] - b[1])
console.log(sortedArr.map((v) => v.join(' ')).join('\n'))