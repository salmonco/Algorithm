const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const [N, X] = input[0].map(Number);
const scores = [];

for (let i = 0; i < N - 1; i++) {
  const [c, g] = input[1 + i];
  scores[i] = [+c, g];
}
const L = +input[N][0];
const grades = ["F", "D0", "D+", "C0", "C+", "B0", "B+", "A0", "A+"];
const map = {
  "A+": 4.5,
  A0: 4,
  "B+": 3.5,
  B0: 3,
  "C+": 2.5,
  C0: 2,
  "D+": 1.5,
  D0: 1,
  F: 0,
};
const sum = scores.reduce((p, c) => {
  const [hak, grade] = c;

  return p + hak * map[grade];
}, 0);
const hakSum =
  scores.reduce((p, c) => {
    const [hak] = c;

    return p + hak;
  }, 0) + L;
// console.log(sum, hakSum)

const getFloat = (num) => {
  const [int, decimal] = num.toString().split(".");
  const twoDecimal = decimal.slice(0, 2);

  return parseFloat(`${int}.${twoDecimal}`);
};

let isImpossible = true;
for (let i = 0; i < grades.length; i++) {
  const grade = grades[i];
  const calculate = (sum + L * map[grade]) / hakSum;
  // const floor = Math.floor(calculate * 1000) / 1000;
  if (getFloat(calculate.toFixed(3)) > X) {
    console.log(grade);
    isImpossible = false;
    break;
  }
}
if (isImpossible) console.log("impossible");

/*
소수점 셋째 자리 버려서 둘째 자리까지 만들기
-> num.toFixed(2): 자동으로 반올림되는 거라 실패
-> Math.floor(num * 100) / 100: 실패
-> 문자열로 다루기

런타임에러(타입에러): 소수점이 너무 많을 경우에 발생
-> 영향 안 주는 선에서 소수점 자르기
*/
