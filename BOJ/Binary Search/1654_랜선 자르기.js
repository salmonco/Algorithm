const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [K, N] = input[0].split(" ").map(Number);
const lines = input.slice(1).map(Number);

const getDivCnt = (len) => {
  return lines.reduce((p, c) => p + Math.floor(c / len), 0);
};

const binarySearch = () => {
  let left = 0;
  let right = Math.max(...lines);
  let ans = 0;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const cnt = getDivCnt(mid);
    if (cnt >= N) {
      ans = Math.max(ans, mid);
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return ans;
};
const ans = binarySearch();
console.log(ans);

/*
이미 오영식은 자체적으로 K개의 랜선을 가지고 있다. 그러나 K개의 랜선은 길이가 제각각이다. 박성원은 랜선을 모두 N개의 같은 길이의 랜선으로 만들고 싶었기 때문에 K개의 랜선을 잘라서 만들어야 한다. 예를 들어 300cm 짜리 랜선에서 140cm 짜리 랜선을 두 개 잘라내면 20cm는 버려야 한다. (이미 자른 랜선은 붙일 수 없다.)
만들 수 있는 최대 랜선의 길이를 구하는 프로그램을 작성하시오.
K는 1이상 10,000이하의 정수이고, N은 1이상 1,000,000이하의 정수이다. 그리고 항상 K ≦ N 이다.

길이 범위: 1 ~ max(...lines)
이분탐색으로 최대 길이 구하기
*/
