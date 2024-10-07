const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n").map((v) => v.split(' ').map(Number))
const [N] = input[0]
const coord = input.slice(1)
coord.push(coord[0])
let area = 0
for (let i = 0; i < N; i++) {
    area += coord[i][0]*coord[i+1][1]
    area -= coord[i+1][0]*coord[i][1]
}
const ans = Math.abs(area)/2
console.log(ans.toFixed(1))

/*
9:31

삼각형, 사각형 정도는 계산하겠는데
n개의 점으로 이루어진 다각형을 다 대응해야 한다는 게 무슨 규칙이 있는 건가?
면적을 어떻게 쪼개서 구할 것인가
- 삼각형으로 쪼개는 방법
- 네 방향으로 최소최대값 구해서 면적 아닌 영역을 빼주는 방법
  - 그 빼주는 영역이 어느 점과 이어지는지 어떻게 알지?

https://darkpgmr.tistory.com/86
2차원 평면에서 세 점의 좌표를 알 때 삼각형 면적 구하기
- 헤론의 공식
- 벡터의 외적 (신발끈 공식)
  - 이게 더 연산량 적음
S = | (x2-x1)(y3-y1) - (x3-x1)(y2-y1) | / 2
   = | x1y2 - x2y1 + x2y3 - x3y2 + x3y1 - x1y3 | / 2

*/
