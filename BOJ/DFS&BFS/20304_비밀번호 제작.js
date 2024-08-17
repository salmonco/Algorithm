const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const [M] = input[1];
const uses = input[2];

const bfs = () => {
  const queue = [];
  const visited = Array.from({ length: N + 1 }, () => false);
  for (const u of uses) {
    queue.push([u, 0]);
    visited[u] = true;
  }
  let head = 0;
  let max = 0;
  while (queue.length > head) {
    const [cn, cnt] = queue[head++];
    max = Math.max(max, cnt);
    for (let i = 1; i <= N; i = i << 1) {
      const y = cn & i;
      let nn;
      if (y === 0) {
        nn = cn + i;
      } else {
        nn = cn - i;
      }
      if (nn < 0 || nn > N || visited[nn]) continue;
      const newCnt = cnt + 1;
      // console.log(nn, visited[nn], newCnt)
      queue.push([nn, newCnt]);
      visited[nn] = newCnt;
    }
  }
  return max;
};

const max = bfs();
console.log(max);

/*
bfs + 비트마스킹

서버 관리자 계정의 비밀번호로는 0 이상 N 이하의 정수 중 하나를 사용할 수 있다.
두 비밀번호의 안전 거리는 이진법으로 표현한 두 비밀번호의 서로 다른 자리의 개수로 정의한다.
어떤 비밀번호의 안전도는 지금까지 로그인 시도에 사용된 모든 비밀번호와의 안전 거리 중 최솟값으로 정의한다.
안전도가 제일 높은 비밀번호의 안전도를 구하여라.
(0 <= N <= 1,000,000)
(1 <= M <= 100,000)

1부터 N까지 탐색. 1부터 M까지 탐색 -> 10^11라서 10^8(약 1초)를 넘어 시간초과 날 듯
-> 다른사람생각: 이는 곧 중복되는 연산이 있다는 것이고, 이를 파악하여 가지치기를 하여야한다.

xor 연산 : 두 숫자가 다르면 1
0 0 -> 0
1 1 -> 0
1 0 -> 1
0 1 -> 1
-> 근데 1의 개수를 어떻게 세지?

다른사람풀이: 1부터 왼쪽시프트를 하면서 x와 &연산을 합니다. (y = x & i)
y > 0이면 같은 자릿수가 있다는 의미이며, x - i를 한 값이 거리가 1인 숫자입니다.
그리고 y == 0이면 같은 자릿수가 없다는 의미이며, x + i를 한 값이 거리가 1인 숫자입니다.
https://whyeskang.com/104

-> 안전도가 0인 숫자부터 큐에 넣고 이진수의 각 자릿수를 다르게(안전도 높게) 해서 돌리기

예를 들어 지금까지 로그인 시도에 사용된 비밀번호가 3과 4이라고 가정하면, 새로운 비밀번호 8에 대해 3과 8의 안전 거리는 3, 4와 8의 안전 거리는 2이므로 비밀번호 8의 안전도는 2가 된다.
-> cnt가 작은 것부터 큐에서 꺼내기. 우선순위 큐
-> 실패. 어차피 노드 자체에 가중치가 있는 게 아님. bfs의 특성으로 cnt를 구하는 것 자체가 최단 경로가 됨
-> 근데 왜 안되지? 비밀번호 범위가 0이상 N이하였는데, 0을 포함하지 않는 거로 돌렸더니 실패했음

13:15~14:56 (101m)
*/
