const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const A = input[1];
const B = input[2];
let timeA = 0;
let timeB = 0;
let cntA = 0;
let cntB = 0;

A.sort((a, b) => b - a);
B.sort((a, b) => b - a);

while (A.length) {
  const time = A.pop();

  if (time >= timeA) {
    cntA++;
    timeA = time + 100;
  }
}

while (B.length) {
  const time = B.pop();

  if (time >= timeB) {
    cntB++;
    timeB = time + 360;
  }
}

console.log(cntA, cntB);

/*
에르다 노바 100초 -> 행동 불가
오리진 스킬 360초 -> 절대 행동 불가
90초 동안 면역

배열에서 스킬 쓴 시간 빼내면서 스킬 사용 가능한 시간 업데이트
*/
