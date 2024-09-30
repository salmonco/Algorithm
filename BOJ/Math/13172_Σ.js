const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [M] = input[0];
const MOD = 1_000_000_007n;
const expectation = [];

const pow = (b, t) => {
  if (t === 1n) return b;
  if (t % 2n === 0n) {
    const half = pow(b, t / 2n) % MOD;
    return (half * half) % MOD;
  } else {
    const half = pow(b, (t - 1n) / 2n) % MOD;
    return (half * half * b) % MOD;
  }
};

for (let i = 0; i < M; i++) {
  const [N, S] = input[i + 1];
  const m = pow(BigInt(N), MOD - 2n) % MOD;
  const e = (BigInt(S) * m) % MOD;
  expectation.push(e);
}

const sum = expectation.reduce((p, c) => (p + c) % MOD, 0n);
console.log(sum.toString());

/*
10:00~11:03 (63m-10m=53m)

7/3
3^(11-2) % 11 = 4
7*4 % 11 = 6

분모들의 최대공배수 구하기
숫자가 너무 커짐. MOD승 제곱하니 Infinity로 바뀜.
BigInt로 바꿔서 해봤는데 시간초과

다른사람풀이: 제곱할 때 분할정복 이용
-> pow함수 Maximum call stack size exceeded

다른사람풀이: 각각 주사위 기댓값 다 합한 후에 pow함수 쓰지 않고, 각각 주사위 기댓값 구할 때 pow함수 사용해서 이후 합하기
-> topSum, bottom lcm 안 구해도 됨
-> 그래도 pow함수 Maximum call stack size exceeded
-> 지수가 1일 때 종료조건 넣어서 해결
*/
