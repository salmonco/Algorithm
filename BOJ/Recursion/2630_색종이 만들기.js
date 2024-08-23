const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const map = input.slice(1);

const cnt = [0, 0];
const recur = (size, r, c) => {
  // console.log(size, r, c, cnt)
  const colorIdx = map[r][c];
  if (size === 1) {
    cnt[colorIdx]++;
    return;
  }
  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      if (map[i][j] !== colorIdx) {
        const halfSize = size / 2;
        recur(halfSize, r, c);
        recur(halfSize, r, c + halfSize);
        recur(halfSize, r + halfSize, c);
        recur(halfSize, r + halfSize, c + halfSize);
        return;
      }
    }
  }
  cnt[colorIdx]++;
};
recur(N, 0, 0);
console.log(cnt.join("\n"));

/*
전체 종이가 모두 같은 색으로 칠해져 있지 않으면 가로와 세로로 중간 부분을 잘라서 <그림 2>의 I, II, III, IV와 같이 똑같은 크기의 네 개의 N/2 × N/2색종이로 나눈다. 나누어진 종이 I, II, III, IV 각각에 대해서도 앞에서와 마찬가지로 모두 같은 색으로 칠해져 있지 않으면 같은 방법으로 똑같은 크기의 네 개의 색종이로 나눈다.
이와 같은 과정을 잘라진 종이가 모두 하얀색 또는 모두 파란색으로 칠해져 있거나, 하나의 정사각형 칸이 되어 더 이상 자를 수 없을 때까지 반복한다.
입력으로 주어진 종이의 한 변의 길이 N과 각 정사각형칸의 색(하얀색 또는 파란색)이 주어질 때 잘라진 하얀색 색종이와 파란색 색종이의 개수를 구하는 프로그램을 작성하시오.
N은 2, 4, 8, 16, 32, 64, 128 중 하나이다.
하얀색으로 칠해진 칸은 0, 파란색으로 칠해진 칸은 1

색종이 4등분
8
0 0
0 4
4 0
4 4

4
0 0
0 2
2 0
2 2

15:07~15:32 (25m)
*/
