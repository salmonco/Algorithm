const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];

const getIdx = (level) => {
  let sum = 0;
  let cnt = 1;
  for (let i = 0; i < level; i++) {
    sum += cnt;
    cnt++;
  }
  return sum;
};

const dp = [];

let idx = 0;
for (let i = 1; i <= N; i++) {
  const arr = input[i];
  for (let j = 0; j < arr.length; j++) {
    dp[idx++] = arr[j];
  }
}

for (let i = 1; i < N; i++) {
  const arr = input[i];
  for (let j = 0; j < arr.length; j++) {
    const idx = getIdx(i - 1) + j;
    const leftChildIdx = getIdx(i) + j;
    const rightChildIdx = getIdx(i) + j + 1;
    dp[leftChildIdx] = Math.max(dp[leftChildIdx], dp[idx] + input[i + 1][j]);
    dp[rightChildIdx] = Math.max(
      dp[rightChildIdx],
      dp[idx] + input[i + 1][j + 1]
    );
  }
}
// console.log(dp)
console.log(Math.max(...dp));

/*
맨 위층 7부터 시작해서 아래에 있는 수 중 하나를 선택하여 아래층으로 내려올 때, 이제까지 선택된 수의 합이 최대가 되는 경로를 구하는 프로그램을 작성하라.
아래층에 있는 수는 현재 층에서 선택된 수의 대각선 왼쪽 또는 대각선 오른쪽에 있는 것 중에서만 선택할 수 있다.
첫째 줄에 삼각형의 크기 n(1 ≤ n ≤ 500)이 주어지고, 둘째 줄부터 n+1번째 줄까지 정수 삼각형이 주어진다.

   0
  1 2
 3 4 5
6 7 8 9
*/
