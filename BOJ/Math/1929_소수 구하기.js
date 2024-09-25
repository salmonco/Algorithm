const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [M, N] = input[0];

const isPrime = (n) => {
  if (n === 1) return false;
  for (let i = 2; i <= Math.floor(n ** (1 / 2)); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const ans = [];
for (let i = M; i <= N; i++) {
  if (isPrime(i)) {
    ans.push(i);
  }
}
console.log(ans.join("\n"));

/*
M이상 N이하의 소수를 모두 출력하는 프로그램을 작성하시오.
(1 ≤ M ≤ N ≤ 1,000,000) 

*/
