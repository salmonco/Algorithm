const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n").map((v) => v.split(' ').map(Number))
const [N] = input[0]
const map = input.slice(1)

// 숫자 압축을 편하게 하기 위해 배열에서 행과 열을 바꾸는 함수 (90도 회전)
const rotate = (map) => {
    let newMap = Array.from({ length: N }, () => Array.from({ length: N }, () => 0))
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            newMap[j][i] = map[i][j]
        }
    }
    return newMap
}

const zipUp = (map) => {
  const rotatedMap = rotate(map); // rotate
  let newMap = [];
  for (let i = 0; i < N; i++) {
    let now = rotatedMap[i].filter(v => v != 0);
    for (let j = 1; j < now.length; j++) {
      if (now[j] == now[j - 1]) {
        now[j - 1] *= 2;
        now[j] = 0;
      }
    }
    now = now.filter(v => v != 0);
    while (now.length < N) {
      now.push(0)
    }
    newMap.push(now)
  }
  return rotate(newMap); // rotate
}

const zipDown = (map) => {
  const rotatedMap = rotate(map); // rotate
  let newMap = [];
  for (let i = 0; i < N; i++) {
    let now = rotatedMap[i].reverse().filter(v => v != 0); // reverse
    for (let j = 1; j < now.length; j++) {
      if (now[j] == now[j - 1]) {
        now[j - 1] *= 2;
        now[j] = 0;
      }
    }
    now = now.filter(v => v != 0);
    while (now.length < N) {
      now.push(0)
    }
    newMap.push(now.reverse()) // reverse
  }
  return rotate(newMap); // rotate
}

const zipLeft = (map) => {
  let newMap = [];
  for (let i = 0; i < N; i++) {
    let now = map[i].filter(v => v != 0);
    for (let j = 1; j < now.length; j++) {
      if (now[j] == now[j - 1]) {
        now[j - 1] *= 2;
        now[j] = 0;
      }
    }
    now = now.filter(v => v != 0);
    while (now.length < N) {
      now.push(0)
    }
    newMap.push(now)
  }
  return newMap;
}

const zipRight = (map) => {
  let newMap = [];
  for (let i = 0; i < N; i++) {
    let now = map[i].reverse().filter(v => v != 0); // reverse
    for (let j = 1; j < now.length; j++) {
      if (now[j] == now[j - 1]) {
        now[j - 1] *= 2;
        now[j] = 0;
      }
    }
    now = now.filter(v => v != 0);
    while (now.length < N) {
      now.push(0)
    }
    newMap.push(now.reverse()) // reverse
  }
  return newMap;
}

const queue = []
let head = 0
let ans = 0
queue.push([map, 0])
while (queue.length > head) {
    const [cmap, cnt] = queue[head++]
    // console.log({cmap, cnt})
    if (cnt === 5) {
        // 가장 큰 블록의 값을 구하기
        ans = Math.max(ans, Math.max(...cmap.flat()))
        continue
    }
    queue.push([zipUp(cmap), cnt + 1])
    queue.push([zipDown(cmap), cnt + 1])
    queue.push([zipLeft(cmap), cnt + 1])
    queue.push([zipRight(cmap), cnt + 1])
}
console.log(ans)

/*
01:51

1초. N 최대 20

한 번의 이동에서 이미 합쳐진 블록은 또 합쳐질 수 없다.
똑같은 수가 세 개가 있는 경우에는 이동하려고 하는 쪽의 칸이 먼저 합쳐진다.
최대 5번 이동해서 만들 수 있는 가장 큰 블록의 값을 구하기

상하좌우 어느 방향으로 이동시키지?
그리디가 되나?
2 2 2
4 4 4
8 8 8

0 2 4
0 4 8
0 8 16
무언가 합쳐질 수 있는 방향이어야 하는데..
상하좌우 다 돌려보는 수밖에 없나?
연속으로 같은 숫자가 있는 방향으로 이동시키기. 차피 연속으로 같은 숫자가 있는 방향이 어딘지 알려면 상하좌우 다 돌려보는 게 어떤가 싶은데..

만약 브루트포스로 할 경우 시간복잡도 어떻게 되지?
이동시키려는 방향부터 연속으로 같은 숫자가 있는지 알기 위해 스캔해야 함. N개의 열에 대해 N만큼 스캔해야 함. N^2
그걸 5번 한다치면 (N^2)^5. 최대 2^20 * 5^10 인데 이거 어케 가늠하지? 일단 5^10 이 2^10 보다는 크잖아. 그럼 2^30 이 1초니깐 1초는 넘긴단 얘기네. -> 시간초과 예상
그럼 브루트포스 말고 다른 방법을 생각해야 하는데...

다른사람풀이보니 걍 브루트포스(구현,시뮬)로 해서 백트래킹으로 시간줄였는데
쳐내면 시간 얼만큼 되는지 가늠을 어케하지?
*/