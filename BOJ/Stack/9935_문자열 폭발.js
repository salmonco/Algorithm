const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const arr = input[0].split("");
const bomb = input[1].split("");
const stack = [];
const arrLen = arr.length;
const bombLen = bomb.length;
for (let i = 0; i < arrLen; i++) {
  const v = arr[i];
  if (v === bomb[bombLen - 1]) {
    let isMatch = true;
    for (let j = 0; j < bombLen - 1; j++) {
      if (stack[stack.length - 1 - j] !== bomb[bombLen - 2 - j]) {
        isMatch = false;
        break;
      }
    }
    if (isMatch) {
      for (let j = 0; j < bombLen - 1; j++) {
        stack.pop();
      }
    } else {
      stack.push(v);
    }
  } else {
    stack.push(v);
  }
}
const ans = stack.join("");
console.log(!ans ? "FRULA" : ans);

/*
오래 걸림

10^6^? -> 10^16보다 커지면 시간초과날 거 같은데..
-> 메모리초과

다른사람풀이: 스택 사용

-> 시간초과 -> 매번 배열에서 연속된 문자를 일일이 비교하고 지우는 과정 때문입니다. 현재 코드는 arr에서 매번 끝에서부터 bomb과 비교하는데, 이 비교를 할 때마다 bomb.length 크기만큼 반복하며, 매번 arr.pop()으로 문자를 제거하고 다시 stack에서 arr로 문자를 복원하는 방식입니다.
-> 시간 복잡도가 O(N * M)

다른사람풀이: arr을 순차적으로 stack에 쌓고, 스택 끝부분에서 bomb 문자열과 일치하는지 확인하는 방식입니다.
-> 시간 복잡도가 O(N)
*/
