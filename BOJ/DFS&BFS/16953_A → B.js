const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [A, B] = input[0];
const MAX = 1000000000;

const bfs = (s) => {
  const queue = [[s, 1]];
  const visited = {};
  let head = 0;
  visited[s] = true;
  while (queue.length > head) {
    const [c, cnt] = queue[head++];
    // console.log(c, cnt)
    if (c === B) return cnt;
    for (const n of [c * 2, +(c + "1")]) {
      if (n < 1 || n > MAX || visited[n]) continue;
      visited[n] = true;
      queue.push([n, cnt + 1]);
    }
  }
  return -1;
};

const cnt = bfs(A);
console.log(cnt);

/*
정수 A를 B로 바꾸려고 한다. 가능한 연산은 다음과 같은 두 가지이다.
2를 곱한다.
1을 수의 가장 오른쪽에 추가한다. 
A를 B로 바꾸는데 필요한 연산의 최솟값을 구해보자.
(1 ≤ A < B ≤ 10^9)

10^9 크기의 visited 배열 만들었더니 런타임에서 killed
-> visited를 객체로 만들어서, 그때그때 할당

*/
