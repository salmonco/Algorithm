const fs = require("fs");
const [input1, ...input2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input1.split(" ").map((item) => +item);
const arr = [];
for (let i = 0; i < N; i++) {
  arr.push(input2[i].split(" ").map((item) => +item));
}
const K = input2[N];
const range = [];
for (let i = 0; i < K; i++) {
  range.push(input2[N + 1 + i].split(" ").map((item) => +item));
}
// brute-force : 300 * 300 *10000 = 9억
for (let q = 0; q < range.length; q++) {
  let [i, j, x, y] = range[q];
  let sum = 0;
  for (let w = i; w <= x; w++) {
    let row = arr[w - 1];
    for (let e = j; e <= y; e++) {
      sum += row[e - 1];
    }
  }
  console.log(sum);
}
