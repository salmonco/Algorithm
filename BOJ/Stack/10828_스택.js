const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const N = +input[0][0];
const stack = [];
const ans = [];
for (let i = 0; i < N; i++) {
  const [command] = input[i + 1];
  if (command === "push") {
    const num = +input[i + 1][1];
    stack.push(num);
  } else if (command === "pop") {
    if (stack.length === 0) {
      ans.push(-1);
    } else {
      const num = stack.pop();
      ans.push(num);
    }
  } else if (command === "size") {
    ans.push(stack.length);
  } else if (command === "empty") {
    if (stack.length === 0) {
      ans.push(1);
    } else {
      ans.push(0);
    }
  } else if (command === "top") {
    if (stack.length === 0) {
      ans.push(-1);
    } else {
      ans.push(stack.at(-1));
    }
  }
}
console.log(ans.join("\n"));

/*
stack

명령을 수행할 때마다 출력 -> 시간초과
*/
