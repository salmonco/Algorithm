const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const seq = input[1];
const prefixSum = [0];
let sum = 0;
for (let i = 0; i < N; i++) {
  sum += seq[i];
  prefixSum[i + 1] = sum;
}
// console.log(prefixSum)

const ans = [];
for (let i = 0; i < M; i++) {
  const [s, f] = input[i + 2];
  const sum = prefixSum[f] - prefixSum[s - 1];
  ans.push(sum);
}
console.log(ans.join("\n"));

/*
수 N개가 주어졌을 때, i번째 수부터 j번째 수까지 합을 구하는 프로그램을 작성하시오.
수는 1,000보다 작거나 같은 자연수이다.

11:19~11:25 (6m)
*/
