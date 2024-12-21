const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const candidates = input[1].split(' ').map(Number).sort((a, b) => a - b)
const answer = []

const dfs = (str, cnt) => {
    if (cnt === M) {
        answer.push(str)
        return
    }
    for (let i = 0; i < candidates.length; i++) {
        const newStr = str + ' ' + candidates[i]
        // if (answer.includes(newStr)) {
        //     continue
        // }
        dfs(newStr, cnt+1)
    }
}

for (let i = 0; i < candidates.length; i++) {
    dfs(candidates[i], 1)
}
// console.log(answer.join('\n'))
console.log([...new Set(answer)].join('\n'))