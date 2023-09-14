const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const N = input[0];
const height = input[1];

let answer = 0;
for (let i = 0; i < N; i++) {
  let cnt = 0;
  // left
  let min = Infinity;
  for (let j = i - 1; j >= 0; j--) {
    let gradient = (height[i] - height[j]) / (i - j);
    if (gradient < min) {
      min = gradient;
      cnt++;
    }
  }
  // right
  let max = -Infinity;
  for (let j = i + 1; j < N; j++) {
    let gradient = (height[i] - height[j]) / (i - j);
    if (gradient > max) {
      max = gradient;
      cnt++;
    }
  }
  // console.log(cnt)
  answer = Math.max(answer, cnt);
}
console.log(answer);

/*
                      1
        1.    1       1
  1.    1.    1.    1 1     1
  1.    1.    1 1.  1 1.    1
  1 1   1 1.  1 1.  1 1 1.  1
1 1 1 1 1 1 1 1 1 1 1 1 1.  1
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
양옆 따로 봐야 함
왼쪽: 기울기가 사이에 있는 것보다 더 작으면 보임
오른쪽: 기울기가 사이에 있는 것보다 더 크면 보임 */
