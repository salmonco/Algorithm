const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const N = input[0];
const arr = [];
for (let i = 0; i < N; i++) {
  arr[i] = input[i + 1];
}

let sum = 0;
for (let i = N - 2; i >= 0; i--) {
  const current = arr[i];
  const next = arr[i + 1];
  if (current >= next) {
    sum += current - next + 1;
    arr[i] = next - 1;
  }
}
console.log(sum);

/*
동준이는 레벨을 난이도 순으로 배치했다. 하지만, 실수로 쉬운 레벨이 어려운 레벨보다 점수를 많이 받는 경우를 만들었다.
이 문제를 해결하기 위해 동준이는 특정 레벨의 점수를 감소시키려고 한다.
점수는 항상 양수이어야 하고, 1만큼 감소시키는 것이 1번이다.
첫째 줄에 점수를 몇 번 감소시키면 되는지 출력한다.

뒤에 수보다 현재 수가 크거나 같으면 현재 수를 뒤에 수 -1로 변경 -> 그리디
뒤에 수랑 현재 수의 차이+1을 누적 카운팅
뒤에서부터 돌면서 업데이트
*/
