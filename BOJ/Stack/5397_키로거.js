const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const TC_NUM = +input[0];
const ans = [];
for (let i = 0; i < TC_NUM; i++) {
  const arr = input[i + 1].split("");
  const newArr = [];
  const stack = [];
  for (let c of arr) {
    if (c === "<") {
      // 커서의 위치를 왼쪽으로 1만큼 이동
      if (newArr.length === 0) continue;
      const pop = newArr.pop();
      stack.push(pop);
    } else if (c === ">") {
      // 커서의 위치를 오른쪽으로 1만큼 이동
      if (stack.length === 0) continue;
      const pop = stack.pop();
      newArr.push(pop);
    } else if (c === "-") {
      // 백스페이스. 커서의 바로 앞에 글자가 존재한다면, 그 글자를 지운다.
      if (newArr.length === 0) continue;
      newArr.pop();
    } else {
      newArr.push(c);
    }
  }
  while (stack.length) {
    const pop = stack.pop();
    newArr.push(pop);
  }
  ans.push(newArr.join(""));
}
console.log(ans.join("\n"));

/*
키로거는 사용자가 키보드를 누른 명령을 모두 기록한다. 따라서, 강산이가 비밀번호를 입력할 때, 화살표나 백스페이스를 입력해도 정확한 비밀번호를 알아낼 수 있다. 

BP|
B| [P]
BA| [P]
BAP| []
BAPC| []
BAPCd| []
BAPC| []
*/
