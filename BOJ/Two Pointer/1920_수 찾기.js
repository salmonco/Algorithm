const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const arr = input[1];
const [M] = input[2];
let find = input[3];
find = find.map((v, i) => [v, i]);
arr.sort((a, b) => a - b);
find.sort((a, b) => a[0] - b[0]);
const ans = [];
let arrIdx = 0;
let findIdx = 0;
while (true) {
  if (findIdx === M) break;
  const [f, idx] = find[findIdx];
  const a = arr[arrIdx];
  if (f === a) {
    ans.push([1, idx]);
    findIdx++;
  } else if (f > a) {
    arrIdx++;
  } else {
    ans.push([0, idx]);
    findIdx++;
  }
}
console.log(
  ans
    .sort((a, b) => a[1] - b[1])
    .map((v) => v[0])
    .join("\n")
);

/*
N개의 정수 A[1], A[2], …, A[N]이 주어져 있을 때, 이 안에 X라는 정수가 존재하는지 알아내는 프로그램을 작성하시오.
(1 ≤ N ≤ 100,000)
(1 ≤ M ≤ 100,000)

처음시도: includes -> 시간초과

1 2 3 4 5
1 3 5 7 9
정렬한 상태에서 투포인터

다른사람풀이: 정렬 + 이분탐색

12:49~13:02 (13m)
*/
