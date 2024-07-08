const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
let cnt = 0;
for (let i = 0; i < N; i++) {
  const arr = input[i + 1].split("");
  const stack = [];
  for (let j = 0; j < arr.length; j++) {
    const c = arr[j];
    if (stack.at(-1) === c) {
      stack.pop();
    } else {
      stack.push(c);
    }
  }
  if (stack.length === 0) cnt++;
}
console.log(cnt);

/*
ABAB
A를 넣으려고 할 때, 이미 A가 들어가 있으면(includes) top에 A가 있어야 함
-> 그냥 top만 보고 pop하고 결과 스택에 남아 있는 게 있으면 bad로 판별
*/
