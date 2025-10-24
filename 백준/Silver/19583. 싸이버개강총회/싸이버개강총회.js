const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
const getTime = (str) => {
    const [h, m] = str.split(':').map(Number)
    return h*60+m
}
const [S, E, Q] = input[0].split(' ').map(getTime)
const lineToCheck = input.slice(1)

const names = new Set()
const enter = {}
const leave = {}

lineToCheck.forEach((line) => {
    const [timeStr, name] = line.split(' ')
    names.add(name)
    const time = getTime(timeStr)
    if (time <= S) {
        enter[name] = true
        return
    }
    if (time >= E && time <= Q) {
        leave[name] = true
        return
    }
})

let cnt = 0
for (const name of names) {
    if (enter[name] && leave[name]) {
        cnt += 1
    }
}
// console.log({enter, leave})
console.log(cnt)
