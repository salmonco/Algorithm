const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const arr = input[0].split("-").map((v) => v.split("+"));
const minus = arr.map((v) => v.reduce((p, c) => p + +c, 0));
const ans = minus.reduce((p, c) => p - c, 2 * minus[0]);
console.log(ans);

/*
괄호를 적절히 쳐서 이 식의 값을 최소로 만드는 프로그램을 작성하시오.
입력으로 주어지는 식의 길이는 50보다 작거나 같다.

- 다음에 + 나오면, + 먼저 하기
+부터 계산하기
*/
