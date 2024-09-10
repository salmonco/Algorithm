const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const arr = input[0].split("");
const ans = [];
const stack = [];
for (let i = 0; i < arr.length; i++) {
  const v = arr[i];
  if (v >= "A" && v <= "Z") {
    ans.push(v);
  } else if (v === "*" || v === "/") {
    while (
      stack.length > 0 &&
      (stack[stack.length - 1] === "*" || stack[stack.length - 1] === "/")
    ) {
      ans.push(stack.pop());
    }
    stack.push(v);
  } else if (v === "+" || v === "-") {
    while (stack.length > 0 && stack[stack.length - 1] !== "(") {
      ans.push(stack.pop());
    }
    stack.push(v);
  } else if (v === "(") {
    stack.push(v);
  } else if (v === ")") {
    while (stack.length > 0 && stack[stack.length - 1] !== "(") {
      ans.push(stack.pop());
    }
    stack.pop(); // '('도 pop
  }
}
while (stack.length) {
  ans.push(stack.pop());
}
console.log(ans.join(""));

/*
예를 들어 a+b*c를 후위 표기식으로 바꾸면 abc*+가 된다.
중위 표기식을 후위 표기식으로 바꾸는 방법을 간단히 설명하면 이렇다. 우선 주어진 중위 표기식을 연산자의 우선순위에 따라 괄호로 묶어준다. 그런 다음에 괄호 안의 연산자를 괄호의 오른쪽으로 옮겨주면 된다.
중위 표기식이 주어졌을 때 후위 표기식으로 고치는 프로그램을 작성하시오
-A+B와 같이 -가 가장 앞에 오거나 AB와 같이 *가 생략되는 등의 수식은 주어지지 않는다.
표기식은 알파벳 대문자와 +, -, *, /, (, )로만 이루어져 있으며, 길이는 100을 넘지 않는다. 

연산자의 우선순위를 고려해야 한다.

A*(B+C)
stack [*, (, +] -> [*]
ans [A, B, C] ->  [A, B, C, +, *]

A+B
stack [+]
ans [A, B, +]

A+B*C
stack [+, *] -> []
ans [A, B, C] -> [A, B, C, *, +]

A+B*C-D/E
stack [-, /]
ans [A, B, C, *, +, D, E]

https://velog.io/@ywc8851/%EB%B0%B1%EC%A4%80-1918-%ED%9B%84%EC%9C%84-%ED%91%9C%EA%B8%B0%EC%8B%9D-javascript

10:40~11:14 (34m)
*/
