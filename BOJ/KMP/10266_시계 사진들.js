const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const SIZE = 360000;
const clock1 = [];
const clock2 = [];
for (let i = 0; i < N; i++) {
  const t = input[1][i];
  clock1[t] = 1;
  clock1[t + SIZE] = 1;

  const t2 = input[2][i];
  clock2[t2] = 1;
}
// console.log(clock1)
const getPi = (p) => {
  const pi = Array.from({ length: p.length }, () => 0);
  let j = 0;
  for (let i = 1; i < p.length; i++) {
    while (j > 0 && p[i] !== p[j]) {
      j = pi[j - 1];
    }
    if (p[i] === p[j]) {
      pi[i] = ++j;
    }
  }
  return pi;
};

const KMP = (t, p) => {
  const pi = getPi(p);
  let j = 0;
  for (let i = 0; i < t.length; i++) {
    while (j > 0 && t[i] !== p[j]) {
      j = pi[j - 1];
    }
    if (t[i] === p[j]) {
      if (j === p.length - 1) {
        return "possible";
      } else {
        ++j;
      }
    }
  }
  return "impossible";
};

const ans = KMP(clock1, clock2);
console.log(ans);

/*
우리의 상근이는 두 사진의 시계가 같은 시각을 나타낼 수 있는지 궁금해져 각 사진을 서로 다른 각도로 돌려보려고 합니다.
두 사진에 대한 묘사가 주어질 때, 두 사진의 시계가 같은 시각을 나타내는지 결정하세요.
첫 줄에는 바늘의 수를 나타내는 정수 n(2 ≤ n ≤ 200 000)이 주어진다.
다음 두 줄에는 각각 n개의 정수가 주어지며, 주어지는 정수 ai(0 ≤ ai < 360,000)는 각 사진에서 바늘의 시계 방향 각도를 나타낸다.

'0'과 '1'로만 이루어져 있는 36만개의 문자열을 2배로 확장하여 두 번째로 주어진 문자열과 매칭이 이루어지는지에 대한 여부를 파악하면 된다.
각 clock1 :'010100', clock2: '100010'로 주어졌다하자.
1. clock1을 2배로 확장한다.  clock1 :'010100010100'
2. 확장한 clock1과 clock2를 KMP 매칭 알고리즘을 시킨다.
3. 매칭이 된다면 "possible"을 출력하고 종료한다.
4. clock1 전체 탐색이 끝나도 매칭이 안됐다면 "impossible"을 출력하고 종료한다.
https://loosie.tistory.com/578
*/
