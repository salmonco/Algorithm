const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const [N] = input[0];
const arr = [];
for (let i = 0; i < N; i++) {
  const [age, name] = input[i + 1];
  arr.push([age, name]);
}
arr.sort((a, b) => a[0] - b[0]);
console.log(arr.map((v) => v.join(" ")).join("\n"));

/*
회원들을 나이가 증가하는 순으로, 나이가 같으면 먼저 가입한 사람이 앞에 오는 순서로 정렬하는 프로그램을 작성하시오.
입력은 가입한 순서로 주어진다.
(1 ≤ N ≤ 100,000)

12:26~12:29 (3m)
*/
