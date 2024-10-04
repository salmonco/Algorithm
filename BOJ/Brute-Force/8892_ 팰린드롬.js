const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const T = +input[0];

// 0 1 2 3 4
const isPalindrome = (str) => {
  for (let i = 0; i <= Math.floor((str.length - 2) / 2); i++) {
    if (str[i] !== str[str.length - i - 1]) return false;
  }
  return true;
};

let line = 1;
const ans = [];
for (let i = 0; i < T; i++) {
  const K = +input[line++];
  const arr = [];
  for (let j = 0; j < K; j++) {
    const v = input[line++];
    arr.push(v);
  }
  let isSearch = false;
  let palin = null;
  for (let j = 0; j < K; j++) {
    for (let k = 0; k < K; k++) {
      if (j === k) continue;
      const str1 = arr[j] + arr[k];
      const str2 = arr[k] + arr[j];
      // console.log(str1, isPalindrome(str1), str2, isPalindrome(str2))
      if (isPalindrome(str1)) {
        isSearch = true;
        palin = str1;
        break;
      }
      if (isPalindrome(str2)) {
        isSearch = true;
        palin = str2;
        break;
      }
      if (isSearch) break;
    }
    if (isSearch) break;
  }
  ans.push(isSearch === false ? 0 : palin);
}
console.log(ans.join("\n"));

/*
100^3
-> 시간복잡도 10^6 괜찮은 듯
*/
