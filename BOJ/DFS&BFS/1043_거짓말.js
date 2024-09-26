const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const [knowTruthCnt, ...knowTruth] = input[1];
const party = input.slice(2);

const bfs = () => {
  const queue = [];
  const visited = Array.from({ length: N + 1 }, () => false);
  knowTruth.forEach((v) => {
    queue.push(v);
    visited[v] = true;
  });
  let head = 0;
  while (queue.length > head) {
    const c = queue[head++];
    for (const [cnt, ...arr] of party) {
      if (arr.includes(c)) {
        for (const n of arr) {
          if (visited[n]) continue;
          queue.push(n);
          visited[n] = true;
        }
      }
    }
  }
  return visited;
};
const visited = bfs();
let ans = 0;
for (const [cnt, ...arr] of party) {
  let isTellTruth = false;
  for (const v of arr) {
    if (visited[v]) {
      isTellTruth = true;
      break;
    }
  }
  if (!isTellTruth) ans++;
}
console.log(ans);

/*
지민이가 거짓말쟁이로 알려지지 않으면서, 과장된 이야기를 할 수 있는 파티 개수의 최댓값을 구하는 프로그램을 작성하시오.
N, M은 50 이하의 자연수이고, 진실을 아는 사람의 수는 0 이상 50 이하의 정수, 각 파티마다 오는 사람의 수는 1 이상 50 이하의 정수이다.

진실을 알고 있는 사람에게는 무조건 진실을 말해야 한다.
진실부터 말하고, 진실을 말한 사람 명단 추가. 진실을 다 털어놨을 때까지.
*/
