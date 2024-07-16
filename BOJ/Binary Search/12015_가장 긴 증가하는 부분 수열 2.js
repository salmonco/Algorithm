const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const sequence = input[1];
const result = [];

const binarySearch = (arr, target) => {
  let start = 0;
  let middle = 0;
  let end = arr.length - 1;
  while (start < end) {
    middle = Math.floor((start + end) / 2);
    // console.log(start, middle, end, target, result)
    if (target === arr[middle]) return middle;
    if (target > arr[middle]) start = middle + 1;
    else if (target < arr[middle]) end = middle;
  }
  return end;
};

for (let i = 0; i < sequence.length; i++) {
  const c = sequence[i];
  if (result.length === 0 || c > result.at(-1)) {
    result.push(c);
    continue;
  }
  // console.log(result)
  const idx = binarySearch(result, c);
  result[idx] = c;
}
console.log(result.length);

/*
LIS (Longest Increasing Subsequence)
- top보다 크면 push
- top보다 작으면 이분탐색으로 위치 탐색 후 해당 위치에 replace

NlogN
*/
