const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const card = input[1];
const [M] = input[2];
const testCard = input[3];
card.sort((a, b) => a - b);
// console.log(card)

const binarySearch = (arr, target) => {
  let start = 0;
  let middle = 0;
  let end = arr.length - 1;
  while (start <= end) {
    middle = Math.floor((start + end) / 2);
    // console.log(start, end, middle, arr[middle], target)
    if (target === arr[middle]) return true;
    if (target > arr[middle]) start = middle + 1;
    else if (target < arr[middle]) end = middle - 1;
  }
  return false;
};

const ans = [];
testCard.forEach((v) => {
  if (binarySearch(card, v)) {
    ans.push(1);
  } else {
    ans.push(0);
  }
});
console.log(ans.join(" "));

/*
숫자 카드는 정수 하나가 적혀져 있는 카드이다. 상근이는 숫자 카드 N개를 가지고 있다.
정수 M개가 주어졌을 때, 이 수가 적혀있는 숫자 카드를 상근이가 가지고 있는지 아닌지를 구하는 프로그램을 작성하시오.
숫자 카드에 적혀있는 수는 -10,000,000보다 크거나 같고, 10,000,000보다 작거나 같다. 두 숫자 카드에 같은 수가 적혀있는 경우는 없다.
첫째 줄에 입력으로 주어진 M개의 수에 대해서, 각 수가 적힌 숫자 카드를 상근이가 가지고 있으면 1을, 아니면 0을 공백으로 구분해 출력한다.

정렬 + 이분탐색(logN)
*/
