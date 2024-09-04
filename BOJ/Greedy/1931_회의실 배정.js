const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const meetings = input.slice(1);

meetings.sort((a, b) => a[0] - b[0]).sort((a, b) => a[1] - b[1]);
let ans = 1;
let endTime = meetings[0][1];
for (let i = 1; i < N; i++) {
  const [s, f] = meetings[i];
  if (s >= endTime) {
    endTime = f;
    ans++;
  }
}
console.log(ans);

/*
한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다.
각 회의 I에 대해 시작시간과 끝나는 시간이 주어져 있고,
각 회의가 겹치지 않게 하면서 회의실을 사용할 수 있는 회의의 최대 개수를 찾아보자.
(1 ≤ N ≤ 100,000)
시작 시간과 끝나는 시간은 2^31-1보다 작거나 같은 자연수 또는 0이다.

1 4, 4 5
처음시도: bfs -> 메모리초과
다른사람풀이: 그리디

최대한 회의실을 사용하기 위해서는 끝나는 시간이 빨라야 한다.
끝나는 시간이 같을 경우에는 일찍 시작을 해야 최대한 더 많이 이용을 할 수 있다.
https://yong-nyong.tistory.com/21

13:09~14:14 (65m)
*/
