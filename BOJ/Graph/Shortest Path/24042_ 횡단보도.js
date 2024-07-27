const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0]; // 지역의 수, 횡단보도 주기
const graph = {};
for (let i = 0; i < M; i++) {
  const [start, end] = input[i + 1];
  if (!graph[start]) graph[start] = [];
  if (!graph[end]) graph[end] = [];
  graph[start].push([end, i]);
  graph[end].push([start, i]);
}

const dijkstra = (start) => {
  const dist = Array.from({ length: N + 1 }, () => Infinity);
  const queue = [[start, 0]]; // start, current time
  let head = 0;
  dist[start] = 0;
  while (queue.length > head) {
    // console.log(queue, dist)
    const [v, t] = queue[head++];
    if (t > dist[v]) continue;
    for (let [nv, idx] of graph[v]) {
      const currentIdx = t % M;
      let newTime;
      if (currentIdx === idx) {
        // 바로 갈 수 있는 경우
        newTime = t;
      } else {
        // 기다렸다가 가야 하는 경우
        if (idx < currentIdx) {
          const diff = currentIdx - idx;
          const moreTime = M - diff;
          newTime = t + moreTime;
        } else {
          const moreTime = idx - currentIdx;
          newTime = t + moreTime;
        }
      }
      newTime++; // 횡단보도 건너는 시간 1 추가
      if (newTime >= dist[nv]) continue;
      dist[nv] = newTime;
      queue.push([nv, newTime]);
    }
  }
  return dist;
};

const dist = dijkstra(1);
// console.log(dist)
console.log(dist[N]);

/*
횡단보도의 주기는 총 M분이며 1분마다 신호가 바뀐다.
1분 동안 파란불이 들어오고, 이동하는 데 1분이 걸린다.
횡단보도와 신호의 정보가 주어질 때, 시간 0분 에서 시작해서 
1번 지역에서 N번 지역까지 가는 최소 시간을 구하는 프로그램을 작성하여라.

1 2 -> 0, 5, 10, 15,
3 4 -> 1, 6, 11, 16,
1 3 -> 2, 7, 12, 17,
4 1 -> 3, 8, 13, 18,
2 3 -> 4, 9, 14, 19,

다익스트라

현재 흐른 시간을 카운트
현재 시간과 이동 가능한 시간이 같아야 바로 이동할 수 있음
-> 현재 시간 % M === idx

바로 갈 수 있다면 가고, 바로 갈 수 없다면 기다렸다가 가기
횡단보도 건너는 시간 1분 추가해주기
*/
