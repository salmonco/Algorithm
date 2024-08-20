const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N] = input[0].split(" ").map(Number);
const bitmask = 0xffffffff; // 32bit
const twoComplement = (~N + 1) & bitmask;
const xorResult = (N ^ twoComplement) >>> 0; // 부호 없는 32비트 정수로 변환 (unsigned)
const differentBits = xorResult.toString(2).split("1").length - 1;
console.log(differentBits);

/*
two's complement

컴퓨터는 뺄셈을 처리할 때 내부적으로 2의 보수를 사용한다. 어떤 수의 2의 보수는 해당하는 숫자의 모든 비트를 반전시킨 뒤, 1을 더해 만들 수 있다.
이때, 32비트 기준으로 처음 표현했던 수와 그 2의 보수의 서로 다른 비트 수를 출력하라. 
첫째 줄에 정수 N(1 ≤ N ≤ 109)이 주어진다.

~N: N의 비트를 반전
>>> : 부호 없는 오른쪽 시프트 연산자

-> >>> : 양수에서는 부호 있는 오른쪽 시프트와 동일하게 동작하지만 음수일 경우 다르다.
-> 빈 비트를 0으로 채우며 음수의 2진 표현을 양수로 간주
*/
