const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
let words = [];
for (let i = 0; i < N; i++) {
  const str = input[i + 1];
  words.push(str);
}
words = [...new Set(words)];
words.sort((str1, str2) => (str1 < str2 ? -1 : 1));
words.sort((str1, str2) => (str1.length < str2.length ? -1 : 1));
console.log(words.join("\n"));

/*
알파벳 소문자로 이루어진 N개의 단어가 들어오면 아래와 같은 조건에 따라 정렬하는 프로그램을 작성하시오.
1. 길이가 짧은 것부터
2. 길이가 같으면 사전 순으로
단, 중복된 단어는 하나만 남기고 제거해야 한다.
(1 ≤ N ≤ 20,000)

12:16~12:21 (5m)
*/
