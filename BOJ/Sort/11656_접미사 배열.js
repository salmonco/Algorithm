const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const arr = input[0].split("");
const ans = [];
for (let i = 0; i < arr.length; i++) {
  let s = arr[i];
  for (let j = i + 1; j < arr.length; j++) {
    s += arr[j];
  }
  ans.push(s);
}
console.log(ans.sort().join("\n"));

/*
정렬
*/
