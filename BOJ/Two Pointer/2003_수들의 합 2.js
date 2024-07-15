const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const arr = input[1];
let left = 0;
let right = 0;
let sum = arr[0];
let cnt = 0;

while (left < N && right < N) {
  if (sum < M) {
    sum += arr[++right];
  } else if (sum > M) {
    sum -= arr[left++];
  } else {
    cnt++;
    sum += arr[++right];
  }
}
console.log(cnt);

/*
N개의 수로 된 수열 A[1], A[2], …, A[N] 이 있다. 이 수열의 i번째 수부터 j번째 수까지의 합 A[i] + A[i+1] + … + A[j-1] + A[j]가 M이 되는 경우의 수를 구하는 프로그램을 작성하시오.
-> i번째 수부터 j번째 수까지의 합 = j번째 수까지의 누적합 - i번째 수까지의 누적합

첫째 줄에 N(1 ≤ N ≤ 10,000), M(1 ≤ M ≤ 300,000,000)이 주어진다
-> 누적합이라 해도 30억이라 너무 오래 걸림

left, right 슬라이딩 윈도우 (투포인터)
- sum이 M보다 작으면 sum += input[++right];
- sum이 M보다 크면 sum -= input[left++];
- sum이 M과 같으면 cnt++, sum += input[++right];

while 조건 left <= right && right < N 로 했더니 58% 실패. Why?
left가 right보다 큰 경우도 생기는 듯
*/
