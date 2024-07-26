const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M, K] = input[0];
// N: 도시 개수, M: 도로 수
const graph = {};
for (let i = 0; i < M; i++) {
  const [start, end, c] = input[i + 1];
  if (!graph[start]) graph[start] = [];
  graph[start].push([end, c]);
}

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  push(val, priority) {
    const newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  pop() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

class PriorityQueueReverse extends PriorityQueue {
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority < parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority >= element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority >= element.priority) ||
          (swap !== null && rightChild.priority >= leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

const dijkstra = (start) => {
  // 기존 다익스트라 로직은 경로를 1차 배열 dp에 저장하여 최단경로를 갱신해줬는데, k번째의 최단경로를 저장하기 위해서는 각 dp에 사이즈가 최대 k인 최대 힙을 입혀 최단경로를 계속해서 갱신
  const dist = Array.from({ length: N + 1 }, () => new PriorityQueueReverse());
  const queue = new PriorityQueue();
  queue.push(start, 0);
  dist[start].push(start, 0);
  while (queue.values.length) {
    const { val, priority } = queue.pop();
    // if (c > dist[v]) continue
    if (!graph[val]) continue;
    for (let [nv, nc] of graph[val]) {
      const newCost = priority + nc;
      if (dist[nv].values.length < K) {
        // 저장된 경로가 K개가 안될 경우 그냥 추가한다.
        dist[nv].push(nv, newCost);
        queue.push(nv, newCost);
      } else if (dist[nv].values[0].priority > newCost) {
        // 저장된 경로가 K개이고, 현재 가장 큰 값보다 작다면
        dist[nv].pop();
        dist[nv].push(nv, newCost);
        queue.push(nv, newCost);
      }
      // dist[nv].push(newCost)
      // if (newCost >= dist[nv]) continue
      // dist[nv] = newCost
      // queue.push([nv, newCost])
    }
  }
  return dist;
};

const dist = dijkstra(1);
// console.log(dist)
const ans = [];
for (let i = 1; i <= N; i++) {
  if (dist[i].values.length === K) {
    ans.push(dist[i].values[0].priority);
  } else {
    ans.push(-1);
  }
}
console.log(ans.join("\n"));

/*
$n$개의 줄을 출력한다. $i$번째 줄에 $1$번 도시에서 $i$번 도시로 가는 $k$번째 최단경로의 소요시간을 출력한다.
$i$번 도시에서 $i$번 도시로 가는 최단경로는 $0$이지만, 일반적인 $k$번째 최단경로는 $0$이 아닐 수 있음에 유의한다.
또, $k$번째 최단경로가 존재하지 않으면 $-1$을 출력한다. 최단경로에 같은 정점이 여러 번 포함되어도 된다.

한 정점에서 다른 모든 정점까지의 최단거리 구하기
-> 다익스트라 로직 베이스

메모리초과 -> dist에서 최소 힙 말고 최대 힙 사용
*/
