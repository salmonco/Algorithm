const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const mat = input.slice(1);

for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (mat[i][k] && mat[k][j]) {
        mat[i][j] = 1;
      }
    }
  }
}
console.log(mat.map((v) => v.join(" ")).join("\n"));

// const bfs = (s, t) => {
//     if (s === t && mat[s][t] === 1) return 1
//     const queue = [s]
//     const visited = Array.from({ length: N }, () => false)
//     let head = 0
//     visited[s] = true
//     while (queue.length > head) {
//         const c = queue[head++]
//         // console.log(c, visited)
//         if (s !== t && c === t) return 1
//         for (let i = 0; i < N; i++) {
//             if (c === i || mat[c][i] === 0) continue
//             if (s === t && t === i) return 1
//             if (visited[i]) continue
//             queue.push(i)
//             visited[i] = true
//         }
//     }
//     return 0
// }

// const ans = Array.from({ length: N }, () => Array.from({ length: N }, () => 0))
// for (let i = 0; i < N; i++) {
//     for (let j = 0; j < N; j++ ) {
//         ans[i][j] = bfs(i, j)
//     }
// }
// console.log(ans.map((v) => v.join(' ')).join('\n'))

/*
가중치 없는 방향 그래프 G가 주어졌을 때, 모든 정점 (i, j)에 대해서, i에서 j로 가는 길이가 양수인 경로가 있는지 없는지 구하는 프로그램을 작성하시오.
(1 ≤ N ≤ 100)

처음시도: 각 i->j 경로 있는 찾는 데 bfs 돌리기 -> 성공
다른사람풀이: 플로이드-와샬 -> 이게 더 간단해 보임. 더 빠름
*/
