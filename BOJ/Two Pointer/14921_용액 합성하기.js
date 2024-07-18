const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const sequence = input[1];
let left = 0;
let right = N - 1;
let min = Infinity;
let ans;
while (left !== right) {
  const sum = sequence[left] + sequence[right];
  const diff = Math.min(min, Math.abs(sum));
  if (min > diff) {
    min = diff;
    ans = sum;
  }
  if (sum === 0) break;
  if (sum < 0) left++;
  else right--;
}
console.log(ans);

/*
용액들의 특성값 A1, … ,AN이 오름차순으로 주어졌을 때, 이 중 두 개의 용액을 혼합하여 만들 수 있는 0에 가장 가까운 특성값 B를 출력하시오.

투포인터
- 두 수의 합이 음수인 경우, left를 1 증가
- 두 수의 합이 양수인 경우, right를 1 감소
*/
