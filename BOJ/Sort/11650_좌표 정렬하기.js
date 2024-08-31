const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const arr = [];
for (let i = 0; i < N; i++) {
  const [x, y] = input[i + 1];
  arr.push([x, y]);
}
arr.sort((a, b) => a[1] - b[1]);
arr.sort((a, b) => a[0] - b[0]);
console.log(arr.map((v) => v.join(" ")).join("\n"));

/*
2차원 평면 위의 점 N개가 주어진다. 좌표를 x좌표가 증가하는 순으로,
x좌표가 같으면 y좌표가 증가하는 순서로 정렬한 다음 출력하는 프로그램을 작성하시오.
(1 ≤ N ≤ 100,000)
(-100,000 ≤ xi, yi ≤ 100,000)

12:30~12:32 (2m)
*/
