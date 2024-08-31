const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [x, y] = input[0];

const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

const d = gcd(x, y);
console.log(d);
console.log((x * y) / d);

/*
두 개의 자연수를 입력받아 최대 공약수와 최소 공배수를 출력하는 프로그램을 작성하시오.
첫째 줄에는 두 개의 자연수가 주어진다. 이 둘은 10,000이하의 자연수이며 사이에 한 칸의 공백이 주어진다.

6 4
4 2
2 0

12:11~12:15 (4m)
*/
