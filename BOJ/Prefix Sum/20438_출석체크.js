const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((item) => item.split(" ").map(Number));
const [N, K, Q, M] = input[0];
const sleep = input[1];
const send = input[2].filter((item) => !sleep.includes(item));

let sum = [0, 0, 0];
for (let i = 3; i <= N + 2; i++) {
  sum[i] = sum[i - 1] + 1;

  if (sleep.includes(i)) continue;

  for (const s of send) {
    if (i % s === 0) {
      // 출석함
      sum[i]--;
      break;
    }
  }
}
// console.log(sum)
let answer = "";
for (let i = 0; i < M; i++) {
  const [S, E] = input[3 + i];
  answer += sum[E] - sum[S - 1] + "\n";
}
console.log(answer.substring(0, answer.length - 1));
