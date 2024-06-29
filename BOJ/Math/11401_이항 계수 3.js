const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
const [N, K] = input;
const p = 1000000007n;

const factorial = (N) => {
  let ans = 1n;
  for (let i = 2n; i <= N; i++) {
    ans = (ans * i) % p;
  }
  return ans;
};

const pow = (n, e) => {
  if (e === 0n) return 1;
  else if (e === 1n) return n;

  if (e % 2n === 0n) {
    const half = pow(n, e / 2n);
    return (half * half) % p;
  } else {
    const half = pow(n, (e - 1n) / 2n);
    return (half * half * n) % p;
  }
};

const top = factorial(N) % p;
const bottom = pow((factorial(N - K) * factorial(K)) % p, p - 2n);
const answer = (top * bottom) % p;
console.log(answer.toString());

/*
5C2

5 * 4 / (2 * 1)

n! / ((n-k)! k!) % p

페르마의 소정리: p가 소수이고, a가 정수일 때, a^p와 a는 서로 합동이다.
a^(p-2)는 1/a와 합동이다.

((n-k)! k!)^(p-2)는 1/((n-k)! k!)와 합동이다.

n! / ((n-k)! k!) => n! * ((n-k)! k!)^(p-2)

너무 큰 숫자가 나옴 -> BigInt형으로 계산
BigInt : 정수 리터럴의 뒤에 n을 붙이거나(10n) 함수 BigInt()를 호출해 생성 가능
*/
