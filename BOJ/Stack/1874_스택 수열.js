const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const N = input[0];
const seq = [];
const stack = [];
let head = 0;
for (let i = 0; i < N; i++) {
  const n = input[i + 1];
  seq.push(n);
}
const ans = [];
for (let i = 1; i <= N; i++) {
  // console.log(stack, seq[head])
  stack.push(i);
  ans.push("+");
  while (true) {
    if (stack.length === 0 || head >= seq.length || stack.at(-1) !== seq[head])
      break;
    stack.pop();
    head++;
    ans.push("-");
  }
}
console.log(stack.length === 0 ? ans.join("\n") : "NO");

/*
# 예제 1
1 2 - [4 3]
1 2 5 [4 3 6]
1 2 5 [4 3 6 8 7]
[4 3 6 8 7 5 2 1]

1부터 n까지 stack에 push하다가,
stack의 젤 끝 값이 seq의 head가 가리키는 값과 같으면, stack pop, seq head++
*/
