const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const N = input[0]; // 첫 번째 장대에 쌓인 원판의 개수
const ans = [];
let cnt = 0;

const recur = (n, from, other, to) => {
  if (n === 0) return;
  recur(n - 1, from, to, other);
  ans.push(`${from} ${to}`);
  cnt++;
  recur(n - 1, other, from, to);
};
recur(N, 1, 2, 3);
console.log(cnt);
console.log(ans.join("\n"));

/*
하노이 탑
세 개의 장대가 있고 첫 번째 장대에는 반경이 서로 다른 n개의 원판이 쌓여 있다. 각 원판은 반경이 큰 순서대로 쌓여있다.
이제 수도승들이 다음 규칙에 따라 첫 번째 장대에서 세 번째 장대로 옮기려 한다.
- 한 번에 한 개의 원판만을 다른 탑으로 옮길 수 있다.
- 쌓아 놓은 원판은 항상 위의 것이 아래의 것보다 작아야 한다.

첫째 줄에 옮긴 횟수 K를 출력한다.
두 번째 줄부터 수행 과정을 출력한다. 두 번째 줄부터 K개의 줄에 걸쳐 두 정수 A B를 빈칸을 사이에 두고 출력하는데,
이는 A번째 탑의 가장 위에 있는 원판을 B번째 탑의 가장 위로 옮긴다는 뜻이다.

우선 맨 밑의 원반을 시작 기둥(from)에서 목표기둥(to)으로 옮겨야 함
그러기 위해선, 맨 밑 원반을 제외한 나머지 원반들이 시작 기둥에서 나머지 기둥(other)으로 옮겨져 있어야 함
그리고 나서 나머지 원반들을 나머지 기둥(other)에서 목표 기둥(to)으로 옮겨야 함
-> n-1 원반을 from->other 기둥으로 옮기고
-> 젤 밑 원반을 from->to 기둥으로 옮기고
-> n-1 원반을 other->to 기둥으로 옮기기

재귀
*/
