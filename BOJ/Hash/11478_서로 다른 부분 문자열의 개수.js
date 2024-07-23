const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const arr = input[0].split("");
const hash = {};

for (let i = 0; i < arr.length; i++) {
  let temp = arr[i];
  hash[temp] = 1;
  for (let j = i + 1; j < arr.length; j++) {
    temp += arr[j];
    hash[temp] = 1;
  }
}
// console.log(hash)
console.log(Object.keys(hash).length);

/*
완전탐색
Hash
*/
