const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const stu = [];
for (let i = 0; i < N; i++) {
  const arr = input[i + 1];
  stu[i] = arr;
}
stu.forEach((arr) => arr.sort((a, b) => a - b));
// console.log(stu)
const pointer = Array.from({ length: N }, () => 0);
let diff = Infinity;
while (true) {
  let max = 0;
  let min = Infinity;
  let minIdx = 0;
  pointer.forEach((v, i) => {
    const c = stu[i][v];
    if (max < c) max = c;
    if (min > c) {
      min = c;
      minIdx = i;
    }
  });
  const newDiff = max - min;
  diff = Math.min(diff, newDiff);
  pointer[minIdx]++;
  if (pointer[minIdx] >= M) break;
}
console.log(diff);

/*
N개의 학급이 있으며, 각 학급의 학생 수는 모두 M명으로 구성된다.
대표로 선발된 모든 학생들 능력치의 최댓값과 최솟값 차이가 최소가 되는 경우의 값을 출력하는 프로그램을 작성하시오.
단, 1 ≤ N, M ≤ 1,000이다. 능력치는 0이상 10^9이하이다.

정렬 & 투포인터
-> 최소값을 가리키는 포인터를 오른쪽으로 1 이동
*/
