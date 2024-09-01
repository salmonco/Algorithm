const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const cards = input[1];
const [M] = input[2];
const finds = input[3];

const hash = {};
for (const c of cards) {
  hash[c] = hash[c] + 1 || 1;
}

// const binarySearch = (arr, v) => {
//     const len = arr.length
//     let left = 0
//     let right = len-1
//     let isFound = false
//     while (left <= right) {
//         const mid = Math.floor((left+right)/2)
//         if (arr[mid] === v) {
//             isFound = true
//             break
//         }
//         if (arr[mid] < v) {
//             left = mid+1
//         } else {
//             right = mid-1
//         }
//     }
//     return isFound
// }

// cards.sort((a, b) => a - b)
const ans = [];
for (const f of finds) {
  // const isFound = binarySearch(cards, f)
  const cnt = hash[f];
  if (!cnt) ans.push(0);
  else ans.push(cnt);
}
console.log(ans.join(" "));

/*
상근이는 숫자 카드 N개를 가지고 있다.
정수 M개가 주어졌을 때, 이 수가 적혀있는 숫자 카드를 상근이가 몇 개 가지고 있는지 구하는 프로그램을 작성하시오.
(1 ≤ N ≤ 500,000)
숫자 카드에 적혀있는 수는 -10,000,000보다 크거나 같고, 10,000,000보다 작거나 같다.

브루트포스 -> 10^10 시간초과
-> 정렬 + (이분탐색 or 투포인터)
-> 근데 개수 구하는 거네
-> 해시 -> 개수 구하는 거 아니어도 해시로 해도 되구나

-10 -10 2 3 3 6 7 10 10 10

14:38~14:52 (14m)
*/
