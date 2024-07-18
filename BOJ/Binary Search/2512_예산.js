const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const req = input[1].sort((a, b) => a - b);
const [M] = input[2];
const max = req.at(-1);
const candidate = Array.from({ length: max }, (_, i) => i + 1);
let left = 0;
let right = max - 1;
let ans;
let budgetDiff = Infinity;
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  const limit = candidate[mid];
  // console.log(limit)
  const sum = req.reduce((p, c) => p + Math.min(c, limit), 0);
  if (sum > M) {
    right = mid - 1;
    continue;
  }
  const diff = M - sum;
  if (budgetDiff > diff) {
    ans = limit;
    budgetDiff = diff;
  }
  if (sum === M) break;
  if (sum < M) left = mid + 1;
}
console.log(ans);

/*
1. 모든 요청이 배정될 수 있는 경우에는 요청한 금액을 그대로 배정한다.
2. 모든 요청이 배정될 수 없는 경우에는 특정한 정수 상한액을 계산하여 그 이상인 예산요청에는 모두 상한액을 배정한다. 상한액 이하의 예산요청에 대해서는 요청한 금액을 그대로 배정한다. 

첫째 줄에는 지방의 수를 의미하는 정수 N이 주어진다. N은 3 이상 10,000 이하이다. 다음 줄에는 각 지방의 예산요청을 표현하는 N개의 정수가 빈칸을 사이에 두고 주어진다. 이 값들은 모두 1 이상 100,000 이하이다.

첫 번째 시도: 그리디
110 120 140 150 -> 오름차순 정렬
485-110 = 375 -> 상한액: 110
375-120 = 255
-> 그리디로 못 풀겠음
-> 가능한 상한액을 다 탐색해야 할 듯
-> 시간 줄이기: 이분탐색

다른사람풀이: 1부터 최대 요청액 사이에서 이분탐색으로 상한액 결정
- 요청예산 sum이 국가예산보다 작으면 left -> mid
- 요청예산 sum이 국가예산보다 크면 right -> mid
*/
