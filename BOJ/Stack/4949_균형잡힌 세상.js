const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let line = 0;
let ans = [];
while (true) {
  const str = input[line];
  if (str === ".") break;
  const arr = str.split("");
  const stack = [];
  let isBalanced = true;
  for (let i = 0; i < arr.length; i++) {
    const c = arr[i];
    if (c === ".") break;
    if (c === "(" || c === "[") stack.push(c);
    else if (c === ")") {
      if (stack.at(-1) === "(") stack.pop();
      else {
        isBalanced = false;
        break;
      }
    } else if (c === "]") {
      if (stack.at(-1) === "[") stack.pop();
      else {
        isBalanced = false;
        break;
      }
    }
  }
  ans.push(isBalanced && stack.length === 0 ? "yes" : "no");
  line++;
}
console.log(ans.join("\n"));

/*
- 모든 왼쪽 소괄호("(")는 오른쪽 소괄호(")")와만 짝을 이뤄야 한다.
- 모든 왼쪽 대괄호("[")는 오른쪽 대괄호("]")와만 짝을 이뤄야 한다.
- 모든 오른쪽 괄호들은 자신과 짝을 이룰 수 있는 왼쪽 괄호가 존재한다.
- 모든 괄호들의 짝은 1:1 매칭만 가능하다. 즉, 괄호 하나가 둘 이상의 괄호와 짝지어지지 않는다.
- 짝을 이루는 두 괄호가 있을 때, 그 사이에 있는 문자열도 균형이 잡혀야 한다.

(, [ -> push
) -> top에 (가 없으면 불균형, 있으면 pop
] -> top에 [가 없으면 불균형, 있으면 pop
마지막에 stack에 남아 있는 게 있으면 불균형
*/
