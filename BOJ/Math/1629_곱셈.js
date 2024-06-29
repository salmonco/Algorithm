const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(BigInt);
const [A, B, C] = input;

const pow = (n, e) => {
  if (e === 0n) return 1;
  else if (e === 1n) return n;
  if (e % 2n === 0n) {
    const half = pow(n, e / 2n);
    return (half * half) % C;
  } else {
    const half = pow(n, (e - 1n) / 2n);
    return (half * half * n) % C;
  }
};

const answer = pow(A, B) % C;
console.log(answer.toString());

/*
분할 정복을 이용한 거듭제곱

계산값이 자바스크립트 정수 범위를 넘어갈 수 있음 -> BigInt
-> 2^53 - 1보다 큰 정수를 표현
*/
