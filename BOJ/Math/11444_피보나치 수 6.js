const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const N = BigInt(input[0]);
const MOD = 1000000007n;
const mat = [
  [1n, 1n],
  [1n, 0n],
];

// 2x2 행렬의 곱
const mulMat = (a, b) => {
  const result = [
    [0n, 0n],
    [0n, 0n],
  ];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      result[i][j] = (a[i][0] * b[0][j] + a[i][1] * b[1][j]) % MOD;
    }
  }
  return result;
};

// 2x2 행렬 제곱
const squareMat = (a) => mulMat(a, a);

// 행렬의 n제곱
const involutionMat = (n) => {
  if (n === 1n) {
    return mat;
  }
  if (n % 2n === 0n) {
    const half = involutionMat(n / 2n);
    return squareMat(half);
  } else {
    const half = involutionMat((n - 1n) / 2n);
    return mulMat(squareMat(half), mat);
  }
};

if (N <= 1n) {
  console.log(Number(N));
} else {
  const ans = involutionMat(N - 1n)[0][0] % MOD; // F(N) = A[N-1][0]
  console.log(Number(ans));
}

// const dp = [0, 1]
// for (let i = 2; i <= N; i++) {
//     dp[i] = (dp[i-1] + dp[i-2]) % MOD
// }
// console.log(dp[N] % MOD)

/*
n이 주어졌을 때, n번째 피보나치 수를 구하는 프로그램을 작성하시오.
n은 1,000,000,000,000,000,000보다 작거나 같은 자연수이다.
첫째 줄에 n번째 피보나치 수를 1,000,000,007으로 나눈 나머지를 출력한다.

-> 메모리초과

다른사람풀이: 행렬
피보나치 수열을 행렬을 통하여 구할 수 있다.
이 때 행렬의 n제곱을 하는 과정에서 위에 말한 분할 합의 개념을 적용하면 행렬의 n제곱을 쉽게 구할 수있다.
https://programmer-hoo.tistory.com/19

행렬 A인 ([1, 1], [1, 0]) 만 갖고도 행렬의 n제곱을 통해 피보나치 수를 얻을 수 있다
https://st-lab.tistory.com/252

11:16~12:24 (68m)
*/
