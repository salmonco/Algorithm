const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const isPalindrome = (str) => {
  const len = str.length;
  const finIdx =
    len % 2 === 0 ? Math.floor((len - 1) / 2) : Math.floor((len - 2) / 2);
  for (let i = 0; i <= finIdx; i++) {
    if (str[i] !== str[len - 1 - i]) return false;
  }
  return true;
};

const ans = [];
let line = 0;
while (input[line] !== "0") {
  const str = input[line++];
  if (isPalindrome(str)) {
    ans.push("yes");
  } else {
    ans.push("no");
  }
}
console.log(ans.join("\n"));

/*
수의 숫자들을 뒤에서부터 읽어도 같다면 그 수는 팰린드롬수다.
각 줄마다 1 이상 99999 이하의 정수가 주어진다.

str이 짝수 -> floor((str.length-1)/2)
str이 홀수 -> floor((str.length-2)/2)
*/
