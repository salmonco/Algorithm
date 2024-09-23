const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const nameHash = {};
const numberArr = [""];
let line = 1;
for (let i = 0; i < N; i++) {
  const name = input[line++];
  nameHash[name] = i + 1;
  numberArr[i + 1] = name;
}
const ans = [];
for (let i = 0; i < M; i++) {
  const q = input[line++];
  if (parseInt(q)) {
    ans.push(numberArr[+q]);
  } else {
    ans.push(nameHash[q]);
  }
}
console.log(ans.join("\n"));

/*
포켓몬의 이름을 보면 포켓몬의 번호를 말하거나, 포켓몬의 번호를 보면 포켓몬의 이름을 말하는 연습을 하도록 하여라.
*/
