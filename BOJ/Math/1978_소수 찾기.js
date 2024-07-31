const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const arr = input[1];

const isPrime = (n) => {
  if (n === 1) return false;
  for (let i = 2; i <= n ** (1 / 2); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};

let cnt = 0;
arr.forEach((n) => {
  if (isPrime(n)) cnt++;
});
console.log(cnt);

/*
1 2 3 4 5
*/
