const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [PC_NUM] = input[0];
const [PC_PAIR_NUM] = input[1];
const graph = Array.from({ length: PC_NUM + 1 }, () => []);
for (let i = 0; i < PC_PAIR_NUM; i++) {
  const [c1, c2] = input[i + 2];
  graph[c1].push(c2);
  graph[c2].push(c1);
}

const bfs = (c) => {
  const queue = [c];
  const visited = Array.from({ length: PC_NUM + 1 }, () => false);
  let head = 0;
  let cnt = 0;
  visited[c] = true;
  while (queue.length > head) {
    const cc = queue[head++];
    for (const nc of graph[cc]) {
      if (visited[nc]) continue;
      queue.push(nc);
      visited[nc] = true;
      cnt++;
    }
  }
  return cnt;
};

const cnt = bfs(1);
console.log(cnt);

/*
graph + bfs

한 컴퓨터가 웜 바이러스에 걸리면 그 컴퓨터와 네트워크 상에서 연결되어 있는 모든 컴퓨터는 웜 바이러스에 걸리게 된다.
어느 날 1번 컴퓨터가 웜 바이러스에 걸렸다. 컴퓨터의 수와 네트워크 상에서 서로 연결되어 있는 정보가 주어질 때,
1번 컴퓨터를 통해 웜 바이러스에 걸리게 되는 컴퓨터의 수를 출력하는 프로그램을 작성하시오.

11:08~11:17 (9m)
*/
