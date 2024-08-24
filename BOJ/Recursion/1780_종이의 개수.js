const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const map = input.slice(1);
const cnt = [0, 0, 0];

const recur = (size, r, c) => {
  // console.log(size, r, c, cnt)
  const curIdx = map[r][c];
  if (size === 1) {
    cnt[curIdx + 1]++;
    return;
  }
  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      if (map[i][j] !== curIdx) {
        const newSize = size / 3;
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            recur(newSize, r + newSize * k, c + newSize * l);
          }
        }
        return;
      }
    }
  }
  cnt[curIdx + 1]++;
};
recur(N, 0, 0);
console.log(cnt.join("\n"));

/*
만약 종이가 모두 같은 수로 되어 있다면 이 종이를 그대로 사용한다.
(1)이 아닌 경우에는 종이를 같은 크기의 종이 9개로 자르고, 각각의 잘린 종이에 대해서 (1)의 과정을 반복한다.
이와 같이 종이를 잘랐을 때, -1로만 채워진 종이의 개수, 0으로만 채워진 종이의 개수, 1로만 채워진 종이의 개수를 구해내는 프로그램을 작성하시오.
(1 ≤ N ≤ 37, N은 3k 꼴)

9개 영역에 각각 재귀 돌리기
*/
