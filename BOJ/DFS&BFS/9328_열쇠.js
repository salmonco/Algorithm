const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const TC = +input[0];
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

const isOut = (r, c, h, w) => r < 0 || r >= h || c < 0 || c >= w;
const isKey = (v) => v >= "a" && v <= "z";
const isDoor = (v) => v >= "A" && v <= "Z";

const bfs = (map, h, w, keys) => {
  const queue = [[0, 0]];
  const visited = Array.from({ length: h }, () =>
    Array.from({ length: w }, () => false)
  );
  const retryDoors = {}; // 각 문에 대해 재시도할 좌표 저장
  const currentKeys = new Set(keys);

  visited[0][0] = true;
  let docCnt = 0;
  let head = 0;
  while (queue.length > head) {
    const [cr, cc] = queue[head++];
    // console.log(cr, cc, cnt, queue)
    if (map[cr][cc] === "$") docCnt++;

    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc, h, w) || visited[nr][nc]) continue;
      if (map[nr][nc] === "*") continue;

      if (isDoor(map[nr][nc])) {
        const door = map[nr][nc];
        const key = door.toLowerCase();
        if (currentKeys.has(key)) {
          queue.push([nr, nc]);
          visited[nr][nc] = true;
        } else {
          if (!retryDoors[door]) retryDoors[door] = [];
          retryDoors[door].push([nr, nc]);
        }
        continue;
      }

      // key를 획득했다면, 재시도 가능한 문 탐색하고 큐에 넣기
      if (isKey(map[nr][nc])) {
        const key = map[nr][nc];
        if (!currentKeys.has(key)) {
          currentKeys.add(key);
          const door = key.toUpperCase();
          if (retryDoors[door]) {
            while (retryDoors[door].length) {
              const [dr, dc] = retryDoors[door].pop();
              queue.push([dr, dc]);
              visited[dr][dc] = true;
            }
          }
        }
      }

      queue.push([nr, nc]);
      visited[nr][nc] = true;
    }
  }
  return docCnt;
};

const ans = [];
let tc = 0;
let line = 1;
while (tc < TC) {
  const [h, w] = input[line++].split(" ").map(Number);
  const map = Array.from({ length: h + 2 }, () =>
    Array.from({ length: w + 2 }, () => ".")
  );
  for (let i = 1; i <= h; i++) {
    const arr = input[line++].split("");
    for (let j = 1; j <= w; j++) {
      const c = arr[j - 1];
      map[i][j] = c;
    }
  }
  // console.log(map)
  let keys = input[line++].split("");
  if (keys[0] === "0") keys = [];

  const cnt = bfs(map, h + 2, w + 2, keys);
  ans.push(cnt);

  tc++;
}
console.log(ans.join("\n"));

/*
bfs + 여러 조건 분기(구현)

빌딩의 문은 모두 잠겨있기 때문에, 문을 열려면 열쇠가 필요하다.
상근이는 일부 열쇠를 이미 가지고 있고, 일부 열쇠는 빌딩의 바닥에 놓여져 있다.
상근이는 상하좌우로만 이동할 수 있다.
상근이가 훔칠 수 있는 문서의 최대 개수를 구하는 프로그램을 작성하시오.

'.'는 빈 공간을 나타낸다.
'*'는 벽을 나타내며, 상근이는 벽을 통과할 수 없다.
'$'는 상근이가 훔쳐야하는 문서이다.
알파벳 대문자는 문을 나타낸다.
알파벳 소문자는 열쇠를 나타내며, 그 문자의 대문자인 모든 문을 열 수 있다.
상근이는 처음에는 빌딩의 밖에 있으며, 빌딩 가장자리의 벽이 아닌 곳을 통해 빌딩 안팎을 드나들 수 있다.

갔던 길 다시 갈 수 있음 -> visited 배열 필요 없을 듯 -> 근데 그럼 종료 조건 없어서 길을 영원히 떠돎
-> visited 배열 살리고, 문 못 열고 막혔던 길로 점프
-> 16% 실패
-> key를 획득했다면 재시도 가능한 문 탐색하고 큐에 넣었는데, key를 획득한 위치를 큐에 넣는 걸 까먹음

1. 빌딩 밖에서 안으로 접근할 수 있도록 둘레를 빈 공간(.)로 두른다.
-> 처음 입구 찾는 데 추가적으로 드는 조건 분기 중복 방지. good
2. 문(A-Z)을 만나면, 다음과 같이 행동한다.
- 해당 문에 맞는 키가 없는 경우, 문까지 도달할 수 있었다는 것을 기억해 두기 위해 저장한다. 나중에 맞는 키를 얻게 되면, 저장되어 있던 모든 문들을 따서 이동할 수 있도록 하기 위함이다.
- 해당 문에 맞는 키가 있는 경우, 문을 따고 이동한다.
3. 열쇠(a-z)를 만나면, 해당 열쇠로 열 수 있는 모든 문들을 열린 상태로 둔다. 여기서 말하는 “열린 상태로 둔다”는 의미는, 열쇠로 열 수 있는 모든 문들의 좌표를 큐에 넣어서, 추후에 문이 있는 위치부터 이동을 재개하도록 한다는 뜻이다.
https://ddb8036631.github.io/boj/9328_%EC%97%B4%EC%87%A0/

다른사람풀이: key 있는지 확인할 때 비트마스킹 사용
-> 26개의 키를 배열로 처리하는 것보다 비트마스킹이 더 효율적임
-> key 초기화: let keys = 0; keys |= 1 << idx
-> key 있는지 확인: keys & (1 << idx)

16:12~18:51 (159m)
*/
