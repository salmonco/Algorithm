const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const arr = input[0].split("");
const N = arr.length;
const M = +input[1];
const stack = [];
let cursor = N;

for (let i = 0; i < M; i++) {
  const [command, v] = input[i + 2].split(" ");
  if (command === "L") {
    // 커서를 왼쪽으로 한 칸 옮김 (커서가 문장의 맨 앞이면 무시됨)
    // if (cursor === 0) continue
    // cursor--
    if (arr.length === 0) continue;
    const pop = arr.pop();
    stack.push(pop);
  } else if (command === "D") {
    // 커서를 오른쪽으로 한 칸 옮김 (커서가 문장의 맨 뒤이면 무시됨)
    // if (cursor === N) continue
    // cursor++
    if (stack.length === 0) continue;
    const pop = stack.pop();
    arr.push(pop);
  } else if (command === "B") {
    // 커서 왼쪽에 있는 문자를 삭제함 (커서가 문장의 맨 앞이면 무시됨)
    // if (cursor === 0) continue
    // arr.splice(cursor-1, 1)
    // cursor--
    if (arr.length === 0) continue;
    arr.pop();
  } else if (command === "P") {
    // v 문자를 커서 왼쪽에 추가함
    // arr.splice(cursor, 0, v)
    // cursor++
    arr.push(v);
  }
}
while (stack.length) {
  const pop = stack.pop();
  arr.push(pop);
}
console.log(arr.join(""));

/*
초기에 편집기에 입력되어 있는 문자열이 주어지고, 그 이후 입력한 명령어가 차례로 주어졌을 때, 모든 명령어를 수행하고 난 후 편집기에 입력되어 있는 문자열을 구하는 프로그램을 작성하시오.
단, 명령어가 수행되기 전에 커서는 문장의 맨 뒤에 위치하고 있다고 한다.

abcd|x

시간초과 -> splice 때문에 그런 듯
-> 삽입/삭제 연산을 O(1)만에 할 수 있는 방법? stack 이용

abcd|
abcdx|
abcd|x -> pop -> abcd|
abcdy|
커서를 항상 맨 뒤에 있도록 하기. 마지막에 pop한 것을 추가하기

abc|
ab| [c]
a| [c, b]
| [c, b, a]
x| [c, b, a]
| [c, b, a, x]
y| [c, b, a, x]
-> yxabc
*/
