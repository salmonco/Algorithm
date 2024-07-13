const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const arr1 = input[0].split("");
const arr2 = input[1].split("");
const hash1 = {};
const hash2 = {};
const compare = {};
for (let i = 0; i < 26; i++) {
  const c = String.fromCharCode(i + "a".charCodeAt());
  hash1[c] = 0;
  hash2[c] = 0;
}
for (let c of arr1) {
  hash1[c]++;
}
for (let c of arr2) {
  hash2[c]++;
}
for (let i = 0; i < 26; i++) {
  const c = String.fromCharCode(i + "a".charCodeAt());
  compare[c] = Math.abs(hash1[c] - hash2[c]);
}
const ans = Object.values(compare).reduce((p, c) => p + c, 0);
console.log(ans);

/*
두 영어 단어가 철자의 순서를 뒤바꾸어 같아질 수 있을 때, 그러한 두 단어를 서로 애너그램 관계에 있다고 한다.
두 개의 영어 단어가 주어졌을 때, 두 단어가 서로 애너그램 관계에 있도록 만들기 위해서 제거해야 하는 최소 개수의 문자 수를 구하는 프로그램을 작성하시오.
첫째 줄과 둘째 줄에 영어 단어가 소문자로 주어진다. 각각의 길이는 1,000자를 넘지 않으며, 적어도 한 글자로 이루어진 단어가 주어진다.
-> 알파벳 별 개수 세서 비교
*/
