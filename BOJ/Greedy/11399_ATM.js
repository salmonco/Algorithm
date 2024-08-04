const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const P = input[1];
const sortedP = [...P].sort((a, b) => a - b);
let ans = 0;
let sum = 0;
sortedP.forEach((v) => {
  sum += v;
  ans += sum;
});
console.log(ans);

/*
줄을 서 있는 사람의 수 N과 각 사람이 돈을 인출하는데 걸리는 시간 Pi가 주어졌을 때,
각 사람이 돈을 인출하는데 필요한 시간의 합의 최솟값을 구하는 프로그램을 작성하시오.

시간 적게 걸리는 사람이 먼저 인출하기 -> 그리디
1 2 3 3 4
1+3+6+9+13 = 32
*/
