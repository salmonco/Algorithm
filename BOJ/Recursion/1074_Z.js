const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, R, C] = input[0];
const SIZE = 2 ** N;
// const map = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => -1))

let cnt = 0;
const recur = (size, r, c) => {
  if (r === R && c === C) {
    console.log(cnt);
    return;
  }
  if (size === 1) {
    // map[r][c] = cnt++
    cnt++;
    return;
  }
  // 해당 영역 내에 찾고자 하는 좌표가 없으면 건너뛰기
  if (R < r || R >= r + size || C < c || C >= c + size) {
    cnt += size * size;
    return;
  }
  const newSize = size / 2;
  recur(newSize, r, c);
  recur(newSize, r, c + newSize);
  recur(newSize, r + newSize, c);
  recur(newSize, r + newSize, c + newSize);
};
recur(SIZE, 0, 0);
// console.log(map[R][C])

/*
한수는 크기가 2^N × 2^N인 2차원 배열을 Z모양으로 탐색하려고 한다.
예를 들어, 2×2배열을 왼쪽 위칸, 오른쪽 위칸, 왼쪽 아래칸, 오른쪽 아래칸 순서대로 방문하면 Z모양이다.
N > 1인 경우, 배열을 크기가 2^(N-1) × 2^(N-1)로 4등분 한 후에 재귀적으로 순서대로 방문한다.
N이 주어졌을 때, r행 c열을 몇 번째로 방문하는지 출력하는 프로그램을 작성하시오.

-> 시간초과
-> map 카운트 다 구하지 말고, 특정 열과 행에 있는 숫자만 바로 구할 수 있도록 규칙이 있지 않을까 -> 규칙 구하기 어렵다..
-> r,c에서 재귀 멈추면 되지 않을까 -> 시간초과

다른사람풀이: 시간단축을 위해, 해당 영역에서 좌표를 포함하고 있지 않을 때, 건너뛰기
https://breathtaking-life.tistory.com/155

N=3
0,1 -> 1
0,2 -> 4
0,3 -> 5
0,4 -> 16

  0,0 -> 0
1,0 -> 2
2,0 -> 8
3,0 -> 10
  4,0 -> 32
5,0 -> 34
6,0 -> 40
7,0 -> 42
8,0 -> 

1,1 -> 3
2,2 -> 12
3,3 -> 15
4,4 -> 48

11:36~12:19 (43m)
*/
