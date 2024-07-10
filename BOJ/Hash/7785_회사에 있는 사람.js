const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const N = +input[0][0];
const obj = {};

for (let i = 0; i < N; i++) {
  const [name, info] = input[i + 1];
  if (info === "enter") {
    obj[name] = 1;
  } else {
    obj[name] = 0;
  }
}

const ans = Object.entries(obj)
  .filter(([k, v]) => v)
  .map(([k, v]) => k)
  .sort()
  .reverse();
console.log(ans.join("\n"));

/*
이 로그는 어떤 사람이 회사에 들어왔는지, 나갔는지가 기록되어져 있다.
로그가 주어졌을 때, 현재 회사에 있는 모든 사람을 구하는 프로그램을 작성하시오.
현재 회사에 있는 사람의 이름을 사전 순의 역순으로 한 줄에 한 명씩 출력한다.
-> 해시

문자열을 내림차순 정렬
-> sort()해서 오름차순 정렬하고 reverse()해서 순서 반전
*/
