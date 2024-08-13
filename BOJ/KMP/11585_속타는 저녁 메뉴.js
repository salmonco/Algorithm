const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const N = +input[0][0];
const P = input[1];
const T = input[2];

const getPi = (p) => {
  const pi = Array.from({ length: p.length }, () => 0);
  let j = 0;
  for (let i = 1; i < p.length; i++) {
    while (j > 0 && p[j] !== p[i]) {
      j = pi[j - 1];
    }
    if (p[j] === p[i]) {
      pi[i] = ++j;
    }
  }
  return pi;
};

const KMP = (t, p) => {
  const pi = getPi(p);
  let j = 0;
  let cnt = 0;
  for (let i = 0; i < t.length - 1; i++) {
    while (j > 0 && t[i] !== p[j]) {
      j = pi[j - 1];
    }
    if (t[i] === p[j]) {
      if (j === p.length - 1) {
        cnt++;
        j = pi[j];
      } else {
        j++;
      }
    }
  }
  return cnt;
};

const cnt = KMP([...T, ...T], P);
// console.log(cnt, N)

const gcd = (n1, n2) => {
  return n2 > 0 ? gcd(n2, n1 % n2) : n1;
};
const g = gcd(N, cnt);
console.log(`${cnt / g}/${N / g}`);

/*
N(1 ≤ N ≤ 1,000,000)
환형. T 배열을 두 배 늘리기
문자열 탐색 카운트
찾아지면 점프

분수 구하기
-> 최대공약수로 분모,분자 나눠주기

50% 실패
-> parent의 문자열의 길이를 n1이라 할 때, for문은 0~n1-2까지 탐색해준다. (첫 문자열과 마지막 문자열 중복 방지)
https://loosie.tistory.com/575
*/
