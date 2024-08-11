const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const L = +input[0];
const STR = input[1];

const getPi = (str) => {
  const len = str.length;
  const pi = Array.from({ length: len }, () => 0);
  let j = 0;
  for (let i = 1; i < len; i++) {
    while (j > 0 && str[j] !== str[i]) {
      j = pi[j - 1];
    }
    if (str[j] === str[i]) {
      pi[i] = ++j;
    }
  }
  return pi;
};

const pi = getPi(STR);
const lastPi = pi[STR.length - 1];
console.log(L - lastPi);

/*
만약 전광판의 크기가 L이라면, 한번에 L개의 문자를 표시할 수 있는 것이다.
광고업자는 최대한의 광고효과를 내기 위해서 길이가 N인 광고를 무한히 붙여서 광고한다.
예를 들어, 광고하고 싶은 내용이 aaba 이고, 전광판의 크기가 6이라면 맨 처음에 보이는 내용은 aabaaa 이다. 시간이 1초가 지날 때마다, 문자는 한 칸씩 옆으로 이동한다.
세준이가 어느 순간 전광판을 쳐다봤을 때, 그 때 쓰여 있는 문자가 입력으로 주어졌을 때, 가능한 광고의 길이중 가장 짧은 것을 출력하는 프로그램을 작성하시오.

1 ≤ L ≤ 1,000,000
광고판에 보이는 문자열은 알파벳 소문자로만 이루어져 있다.

텍스트내(본문)에서 특정 문자열, 패턴("테이프")를 찾는 것을 문자열 검색이라고 부릅니다.
단순한 방법: 텍스트의 길이를 N, 패턴의 길이를 M이라 할 때 각 텍스트의 인덱스에 대해 패턴이 일치하는지 비교하므로 O(NM)입니다.
단순한 방법은 정보를 낭비하고 있다!
KMP 알고리즘을 이용하면 O(N+M)에 문자열 검색을 할 수 있습니다.
만든 사람이름이 Knuth, Morris, Prett
kmp 알고리즘은 틀렸다는 사실이 아니라 조금이라도 일치했었다는 정보에 주목하고 미리 전처리 해둔 pi배열을 이용해서 많은 중간 시도를 껑충 건너띌 수 있게 합니다.
https://bowbowbow.tistory.com/6

광고 문자열의 최소 길이 = 광고판 길이 - 접미사의 최대 길이
*/
