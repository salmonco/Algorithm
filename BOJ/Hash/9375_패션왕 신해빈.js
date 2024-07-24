const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const TC_NUM = +input[0];
let tc = 0;
let line = 1;
const ans = [];
while (tc < TC_NUM) {
  const N = +input[line++];
  const hash = {};
  for (let i = 0; i < N; i++) {
    const [name, type] = input[line++].split(" ");
    if (!hash[type]) hash[type] = [];
    hash[type].push(name);
  }
  // console.log(hash)
  const cnt = Object.values(hash).reduce((p, c) => p * (c.length + 1), 1) - 1;
  ans.push(cnt);
  tc++;
}
console.log(ans.join("\n"));

/*
Hash
type별 옷 개수+1 곱하기
*/
