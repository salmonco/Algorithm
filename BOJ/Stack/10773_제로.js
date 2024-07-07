const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const K = input[0];
const stack = [];
for (let i = 0; i < K; i++) {
  const num = input[i + 1];
  if (num) {
    stack.push(num);
  } else {
    stack.pop();
  }
}
console.log(stack.reduce((p, c) => p + c, 0));

/*
정수가 "0" 일 경우에는 가장 최근에 쓴 수를 지우고, 아닐 경우 해당 수를 쓴다.
재민이가 최종적으로 적어 낸 수의 합을 출력한다. 최종적으로 적어낸 수의 합은 2^31-1보다 작거나 같은 정수이다.
-> stack
*/
