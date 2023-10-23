const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const blackhole = input[1];
const planet = [];
let answer = 0;

for (let i = 0; i < M; i++) {
  planet[i] = input[2 + i];
}

blackhole.sort((a, b) => a - b);

for (let i = 0; i < M; i++) {
  const [a, w] = planet[i];
  let [left, right] = [0, N - 1];

  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);

    if (blackhole[mid] > a) {
      right = mid;
    } else {
      left = mid;
    }
  }
  const min = Math.min(
    Math.abs(blackhole[left] - a),
    Math.abs(blackhole[right] - a)
  );

  answer = Math.max(answer, min * w);
}

console.log(answer);

/*
(1) 2 4 (5) 7
2 3
7 1
4 2

3, 6, 6
9, 2, 2
min
3, 2, 2 max = 3
브루트포스 시간복잡도 4*10^10 -> 1초 초과

소행성 입장에서, 가까운 거리의 블랙홀에 빨려들어가는 게 유리
소행성과 가까운 거리의 블랙홀 찾기 -> 이분탐색 logN
*/
