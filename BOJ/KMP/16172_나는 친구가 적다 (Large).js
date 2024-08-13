const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const S = input[0];
const K = input[1];
const T = S.replace(/[0-9]/g, "");

const getPi = (p) => {
  const pi = Array.from({ length: p.length }, () => 0);
  let j = 0;
  for (let i = 1; i < p.length; i++) {
    while (j > 0 && p[j] !== p[i]) {
      j = p[j - 1];
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
  for (let i = 0; i < t.length; i++) {
    while (j > 0 && t[i] !== p[j]) {
      j = pi[j - 1];
    }
    if (t[i] === p[j]) {
      if (j === p.length - 1) {
        return 1;
      } else {
        ++j;
      }
    }
  }
  return 0;
};

const ans = KMP(T, K);
console.log(ans);

/*
성민이가 듣는 과목의 교과서는, 알파벳 소문자(a-z)와 알파벳 대문자(A-Z)로만 이루어져 있다. 성민이가 교과서에서 찾고자 하는 키워드도 역시 알파벳 소문자와 대문자로만 이루어져 있다.
하지만, 성민이에겐 큰 문제가 생겼다. 결석한 날의 수업 내용을 친구에게 빌려 필기를 하던 중, 교과서에 숫자(0-9)를 적어버린 것이다.

숫자 제거
문자열 탐색
*/
