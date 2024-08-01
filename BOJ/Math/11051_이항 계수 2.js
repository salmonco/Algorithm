const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, K] = input[0];
const DIV = 10007n;

const factorial = [];
factorial[0] = 1n;
factorial[1] = 1n;

for (let i = 2n; i <= 1000n; i++) {
  factorial[i] = i * factorial[i - 1n];
}

const bionomial_coeffcient = (n, k) => {
  if (k < 0 || k > n) return 0;
  return factorial[n] / (factorial[k] * factorial[n - k]);
};

const ans = bionomial_coeffcient(N, K) % DIV;
console.log(Number(ans));

/*
이항 계수
nCk를 10,007로 나눈 나머지를 출력한다.
1 ≤ N ≤ 1,000, 0 ≤ K ≤ N

dp 팩토리얼 구하기
*/
