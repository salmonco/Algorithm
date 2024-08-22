const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const seq = input[1];
const ans = [];
seq.sort((a, b) => a - b);

const dfs = (idxs, arr, cnt) => {
  if (cnt === M) {
    const str = arr.join(" ");
    if (!ans.includes(str)) {
      ans.push(str);
    }
    return;
  }
  for (let i = 0; i < N; i++) {
    if (idxs.includes(i)) continue;
    const v = seq[i];
    dfs([...idxs, i], [...arr, v], cnt + 1);
  }
};
dfs([], [], 0);
console.log(ans.join("\n"));

/*
N개의 자연수와 자연수 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.
- N개의 자연수 중에서 M개를 고른 수열
(1 ≤ M ≤ N ≤ 8)
입력으로 주어지는 수는 10,000보다 작거나 같은 자연수이다.
수열은 사전 순으로 증가하는 순서로 출력해야 한다.

*/
