const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const dijkstra = (start, graph, distance) => {
  const queue = [];
  queue.push({ vertex: start, dist: 0 });
  distance[start] = 0;

  while (queue.length) {
    const { vertex, dist } = queue.shift();

    if (dist > distance[vertex]) continue;
    if (!graph[vertex]) continue;

    graph[vertex].forEach(({ to, cost }) => {
      const newCost = dist + cost;

      if (newCost < distance[to]) {
        distance[to] = newCost;
        queue.push({ vertex: to, dist: newCost });
      }
    });
  }
};

let i = 1;

while (i < input.length) {
  const [n, d, c] = input[i];
  const graph = Array.from({ length: n + 1 }, () => []);

  for (let j = 0; j < d; j++) {
    const [a, b, s] = input[i + 1 + j];

    graph[b].push({ to: a, cost: s });
  }

  const distance = Array.from({ length: n + 1 }, () => Infinity);

  dijkstra(c, graph, distance);

  const result = distance.filter((v) => v !== Infinity);
  const cnt = result.length;
  const sec = Math.max(...result);

  console.log(cnt, sec);
  i += d + 1;
}
