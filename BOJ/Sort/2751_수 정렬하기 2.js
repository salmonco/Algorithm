const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const N = input[0];
const arr = [];
for (let i = 0; i < N; i++) {
  const n = input[i + 1];
  arr.push(n);
}
arr.sort((a, b) => a - b);
console.log(arr.join("\n"));

/*
N개의 수가 주어졌을 때, 이를 오름차순으로 정렬하는 프로그램을 작성하시오.
(1 ≤ N ≤ 1,000,000)

12:23~12:25 (2m)
*/
