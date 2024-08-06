const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const N = input[0];
const height = [];
for (let i = 0; i < N; i++) {
  const h = input[i + 1];
  height.push(h);
}

const stack = [];
let ans = 0;
for (let i = 0; i < N; i++) {
  const c = height[i];
  while (stack.length) {
    if (stack[stack.length - 1] <= c) {
      stack.pop();
    } else {
      break;
    }
  }
  stack.push(c);
  ans += stack.length - 1;
}
console.log(ans);

/*
             = 
 =           = 
 =     -     = 
 =     =     =        -> 관리인이 보는 방향
 =  -  =  =  =   
 =  =  =  =  =  = 
10  3  7  4  12 2     -> 빌딩의 높이
[1][2][3][4][5][6]    -> 빌딩의 번호

자신이 위치한 빌딩보다 높거나 같은 빌딩이 있으면 그 다음에 있는 모든 빌딩의 옥상은 보지 못한다.
각 관리인들이 벤치마킹이 가능한 빌딩의 수의 합을 출력한다.
(1 ≤ N ≤ 80,000)

이중 for문 -> 시간초과

Monotonic Stack(단조 스택)
: 스택을 오름차순(Increasing) 또는 내림차순(Decreasing)으로 정렬해주는 알고리즘

[10] - 10을 바라보는 건물은 0 개
[10, 3] - 3을 바라보는 건물은 1개
[10, 7] - 7을 바라보는 건물은 1개 
[10, 7, 4] - 4를 바라보는 건물은 2개
[12] - 12를 바라보는 건물은 0개
[12, 2] - 2를 바라보는 건물은 1개

관리인이 볼 수 있는 건물의 수 = 각 건물이 보여지는 수 있는 위치의 수
*/
