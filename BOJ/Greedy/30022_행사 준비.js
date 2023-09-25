const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, A, B] = input[0];
const arr = []; // [store1, store2, difference];

for (let i = 0; i < N; i++) {
  const [p, q] = input[1 + i];

  arr.push([p, q, p - q]);
}
const sorted = [...arr].sort((a, b) => a[2] - b[2]);
let answer = 0;

for (let i = 0; i < N; i++) {
  const [p, q] = sorted[i];

  if (i < A) {
    answer += p;
  } else {
    answer += q;
  }
}
console.log(answer);

/*
가격 차이 비교해서 고르는 그리디

-2 5 0 -3 1
-3 -2 0 1 5

p - q해서 오름차순 정렬
앞에서부터 A개만큼 상점 1에서 사고 나머진 상점 2에서 사기
*/
