const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const notListenHash = {};
const ans = [];
let line = 1;
for (let i = 0; i < N; i++) {
  const name = input[line++];
  notListenHash[name] = true;
}
for (let i = 0; i < M; i++) {
  const name = input[line++];
  if (notListenHash[name] === true) ans.push(name);
}
ans.sort((a, b) => (a < b ? -1 : 1));
console.log(ans.length);
console.log(ans.join("\n"));

/*
김진영이 듣도 못한 사람의 명단과, 보도 못한 사람의 명단이 주어질 때, 듣도 보도 못한 사람의 명단을 구하는 프로그램을 작성하시오.
이름은 띄어쓰기 없이 알파벳 소문자로만 이루어지며, 그 길이는 20 이하이다. N, M은 500,000 이하의 자연수이다.
듣도 못한 사람의 명단에는 중복되는 이름이 없으며, 보도 못한 사람의 명단도 마찬가지이다.
듣보잡의 수와 그 명단을 사전순으로 출력한다.

-> 96% 실패
-> if (notListenHash[name]) ans.push(name) 였던 것을
-> if (notListenHash[name] === true) ans.push(name) 로 변경
-> 왜지?

13:58~14:12 (14m)
*/
