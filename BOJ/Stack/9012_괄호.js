const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const T = +input[0];
const ans = [];
for (let i = 0; i < T; i++) {
  const arr = input[i + 1].split("");
  const stack = [];
  for (const v of arr) {
    if (v === "(") {
      stack.push(v);
      continue;
    }
    if (stack.length === 0 || stack[stack.length - 1] !== "(") {
      stack.push(v);
      break;
    }
    stack.pop();
  }
  if (stack.length === 0) {
    ans.push("YES");
  } else {
    ans.push("NO");
  }
}
console.log(ans.join("\n"));

/*
괄호 문자열(Parenthesis String, PS)은 두 개의 괄호 기호인 ‘(’ 와 ‘)’ 만으로 구성되어 있는 문자열이다.
그 중에서 괄호의 모양이 바르게 구성된 문자열을 올바른 괄호 문자열(Valid PS, VPS)이라고 부른다.
예를 들어 “(())()”와 “((()))” 는 VPS 이지만
“(()(”, “(())()))” , 그리고 “(()” 는 모두 VPS 가 아닌 문자열이다. 
여러분은 입력으로 주어진 괄호 문자열이 VPS 인지 아닌지를 판단해서 그 결과를 YES 와 NO 로 나타내어야 한다. 

'(' -> 스택에 push
')' -> 스택 젤 뒤에 '('이 없으면 NO, 있으면 스택 젤 뒤 pop
스택에 남은 괄호가 있으면 NO, 없으면 YES

14:27~14:37 (10m)
*/
