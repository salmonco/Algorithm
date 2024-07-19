const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const seq = input[1];
let sorted = [...seq].sort((a, b) => a - b);
sorted = [...new Set(sorted)];
// console.log(sorted)
const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const v = arr[mid];
    // console.log(mid, v, target)
    if (target === v) return mid;
    if (target > v) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
};

const ans = [];
seq.forEach((v) => {
  const idx = binarySearch(sorted, v);
  ans.push(idx);
});
console.log(ans.join(" "));

/*
Xi를 좌표 압축한 결과 X'i의 값은 Xi > Xj를 만족하는 서로 다른 좌표 Xj의 개수와 같아야 한다.
X1, X2, ..., XN에 좌표 압축을 적용한 결과 X'1, X'2, ..., X'N를 출력해보자.

1 ≤ N ≤ 1,000,000
-10^9 ≤ Xi ≤ 10^9

-10 -9 2 4 4 -> 오름차순 정렬
2가 위치한 인덱스 -> 2
4가 위치한 인덱스 -> 3
-10이 위치한 인덱스 -> 0
4가 위치한 인덱스 -> 3
-9가 위치한 인덱스 -> 1
어떤 숫자가 위치한 인덱스를 찾을 때 브루트포스로 찾을 수 있겠지만, 시간을 줄이기 위해 이분탐색 이용

예제 2 실패
-> 중복된 숫자가 연이어 있는 경우, 젤 처음 나오는 인덱스를 반환해야 함
-> 젤 처음 나오는 숫자 제외하고 뒤에 나오는 같은 숫자에 대해 isDuplicated=true로 구분 표시
-> 실패 -> 서로 다른 좌표 Xj의 개수와 같아야 한다.
-> 그냥 sorted 배열에 중복된 숫자 제거해서 하나만 남겨놓기
*/
