const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const heights = input[1];
heights.sort((a, b) => a - b);

const binarySearch = (arr, M) => {
  let left = 0;
  let right = arr[arr.length - 1];
  let ans = 0;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let sum = 0;
    for (const v of arr) {
      if (v > mid) sum += v - mid;
    }
    if (sum >= M) {
      ans = Math.max(ans, mid);
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return ans;
};
const ans = binarySearch(heights, M);
console.log(ans);

/*
상근이는 나무 M미터가 필요하다.
높이가 H보다 큰 나무는 H 위의 부분이 잘릴 것이고, 낮은 나무는 잘리지 않을 것이다.
예를 들어, 한 줄에 연속해있는 나무의 높이가 20, 15, 10, 17이라고 하자. 상근이가 높이를 15로 지정했다면, 나무를 자른 뒤의 높이는 15, 15, 10, 15가 될 것이고, 상근이는 길이가 5인 나무와 2인 나무를 들고 집에 갈 것이다. (총 7미터를 집에 들고 간다)
절단기에 설정할 수 있는 높이는 양의 정수 또는 0이다.
적어도 M미터의 나무를 집에 가져가기 위해서 절단기에 설정할 수 있는 높이의 최댓값을 구하는 프로그램을 작성하시오.
(1 ≤ N ≤ 1,000,000, 1 ≤ M ≤ 2,000,000,000)

브루트포스 -> 0~10^9 -> 시간초과
-> 이분탐색으로 H 구하기

10 15 17 20 -> H: 0~20
-> 10 -> 5+7+10=22 > 7
-> floor((11+20)/2) = 15 -> 2+5=7 === 7

4 26 40 42 46 -> H: 0~46
-> 23 -> 3+17+19+23=62 > 20
-> (24+46)/2 -> 35 -> 5+7+11=23 > 20
-> (36+46)/2 -> 41 -> 1+5=6 < 20
-> (36+40)/2 -> 38 -> 2+4+8=14 < 20
-> floor((36+37)/2) -> 36 -> 4+6+10=20 === 20

*/
