const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const N = +input[0][0];
const M = +input[0][1];
const obj = {};

for (let i = 0; i < N; i++) {
  const [site, pw] = input[i + 1];
  obj[site] = pw;
}

const ans = [];
for (let i = 0; i < M; i++) {
  const [site] = input[i + N + 1];
  const pw = obj[site];
  ans.push(pw);
}
console.log(ans.join("\n"));

/*
경민이는 메모장에 사이트의 주소와 비밀번호를 저장해두기로 했다.
첫 번째 줄부터 M개의 줄에 걸쳐 비밀번호를 찾으려는 사이트 주소의 비밀번호를 차례대로 각 줄에 하나씩 출력한다.

해시
*/
