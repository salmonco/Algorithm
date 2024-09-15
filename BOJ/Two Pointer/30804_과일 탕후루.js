const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const fruit = input[1];
let ans = 0;
let left = 0;
let right = 0;
const fruitCount = new Map();

while (right < fruit.length) {
  // 현재 과일의 개수를 맵에 추가
  fruitCount.set(fruit[right], (fruitCount.get(fruit[right]) || 0) + 1);

  // 두 종류 초과일 경우, left 포인터를 증가시키며 과일의 종류를 줄임
  while (fruitCount.size > 2) {
    fruitCount.set(fruit[left], fruitCount.get(fruit[left]) - 1);
    if (fruitCount.get(fruit[left]) === 0) {
      fruitCount.delete(fruit[left]);
    }
    left++;
  }

  // 두 종류 이하일 때 최대 길이 갱신
  ans = Math.max(ans, right - left + 1);
  right++;
}

console.log(ans);

/*
막대의 앞쪽과 뒤쪽에서 몇 개의 과일을 빼서 두 종류 이하의 과일만 남기기로 했습니다.
이렇게 만들 수 있는 과일을 두 종류 이하로 사용한 탕후루 중에서, 과일의 개수가 가장 많은 탕후루의 과일 개수를 구하세요.

처음시도: left, right 인자로 갖는 dfs -> 런타임 에러
-> dfs 재귀 호출에 의한 스택 오버플로우로 인한 것일 가능성이 높습니다.

다른사람풀이: 슬라이딩 윈도우
1. 슬라이딩 윈도우: left와 right 포인터를 사용해 탐색 범위를 유지하면서 right를 확장해가며 두 종류 이하의 과일만 허용되는 가장 긴 구간을 찾습니다.
2. 과일 종류 관리: fruitCount라는 Map을 사용해 현재 슬라이딩 윈도우 안에 있는 과일의 종류와 그 개수를 관리합니다.
3. 범위 조정: right를 확장하면서 과일이 두 종류를 초과할 때, left 포인터를 이동시켜 과일의 종류를 줄입니다.
4. 결과 갱신: 과일 종류가 두 종류 이하일 때마다 최대 길이를 갱신합니다.

*/
