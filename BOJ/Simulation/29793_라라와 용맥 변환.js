const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, H] = input[0].split(" ").map(Number);
const arr = input[1].split("");
let answer = 0;

if (H >= 4) {
  if (N >= 4) {
    answer = -1;
  } else if (N === 3) {
    const cntS = arr.filter((v) => v === "S").length;
    const cntR = arr.filter((v) => v === "R").length;
    const cntW = arr.filter((v) => v === "W").length;
    let cnt = 0;

    if (!cntS) cnt++;
    if (!cntR) cnt++;
    if (!cntW) cnt++;

    answer = cnt;
  } else if (N === 2) {
    if (arr[0] === arr[1]) answer = 1;
    else answer = 0;
  } else {
    answer = 0;
  }
} else if (H === 3) {
  const pattern = [
    ["S", "R", "W"],
    ["S", "W", "R"],
    ["R", "S", "W"],
    ["R", "W", "S"],
    ["W", "S", "R"],
    ["W", "R", "S"],
  ];
  let min = Infinity;

  for (let i = 0; i < pattern.length; i++) {
    let cnt = 0;

    for (let j = 0; j < N; j++) {
      if (arr[j] !== pattern[i][j % 3]) cnt++;
    }
    min = Math.min(min, cnt);
  }
  answer = min;
} else if (H === 2) {
  const yongMac = ["S", "R", "W"];
  const map = { S: 0, R: 1, W: 2 };
  let cnt = 0;

  for (let i = 0; i < N - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      if (i === N - 2) {
        cnt++;
        break;
      }
      let index = map[arr[i + 1]];
      const next = arr[i + 2];

      for (let j = 0; j < 2; j++) {
        index = (index + 1) % 3;
        if (yongMac[index] !== next) {
          arr[i + 1] = yongMac[index];
          cnt++;
          break;
        }
      }
    }
  }
  answer = cnt;
} else {
  answer = 0;
}

console.log(answer);

/*
해, 강, 바람의 세 종류 토지령이 있고, 소모한 용맥과 같은 종류의 토지령이 소환된다.

각 토지령은 종류별로 한 마리씩만 소환할 수 있고, 토지령을 소환할 때 같은 종류의 토지령이 이미 소환되어 있다면,
기존에 소환되어 있던 같은 종류의 토지령은 사라지고 종류별로 가장 마지막에 소환된 토지령만이 남는다.
-> "각각 위치의 용맥에서" 종류별로 한 마리씩만 소환할 수 있는 것이 아니라, "모든 위치의 용맥에서" 종류별로 한 마리씩만 소환할 수 있는 거였음
ex) 1번 용맥 위치에 해의 토지령이 있었는데 2번 용맥 위치에서 해의 토지령을 소환하면, 1번 위치에 있던 해의 토지령이 사라지고 2번 위치에 소환됨

각 용맥마다 체력이 H인 몬스터가 한 마리씩 있는 직선형 맵
라라는 이 맵의 가장 왼쪽 용맥에서부터 시작

맵의 오른쪽 끝에 도달해 이동할 용맥이 없다면 현재 토지령이 소환되어 있는 위치의 몬스터가 모두 처치되고, 사냥을 끝마친다.
-> 마지막에 토지령이 소환되어 있는 용맥의 몬스터는 남은 체력과 관계 없이 모두 처치됨

3 4
SRW
1: S / _ / _ (3,4,4)
2: S / R / _ (2,3,4)
3: S / R / W (0,0,0) -> 0번

3 1
SSS
1: S / _ / _ (0,1,1)
2: _ / S / _ (0,0,1)
3: _ / _ / S (0,0,0) -> 0번

- 체력 4 이상인 경우
  - 용맥 4개 이상이면 -1
  - 용맥 3개: S, R, W 개수 구하고, 용맥 변환수는 0인 것의 개수
  - 용맥 2개: 두 용맥이 같으면 1, 같지 않으면 0번
  - 용맥 1개: 0번
- 체력 4 미만인 경우
  - 체력 3: 서로 다른 용맥 3개가 반복되어야 함. 중간에 끊겨도 됨
    - 각 위치의 용맥과 패턴을 비교하면서 다른 것의 카운트를 구하고, 최소 카운트가 용맥변환수가 됨
  - 체력 2: 연속된 두 용맥이 있으면 안 됨
    - 현재 용맥과 다음 용맥이 같다면, 다음 용맥을 용맥변환. 현재 용맥과 다다음 용맥과 안 겹치게
  - 체력 1: 0번
*/
