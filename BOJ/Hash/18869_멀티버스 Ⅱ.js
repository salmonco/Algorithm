const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [M, N] = input[0];
const universe = [];
for (let i = 0; i < M; i++) {
  const arr = input[i + 1];
  universe[i] = arr;
}

// const binarySearch = (arr, target) => {
//     let left = 0
//     let right = arr.length-1
//     while (left <= right) {
//         const mid = Math.floor((left+right)/2)
//         const v = arr[mid]
//         if (target === v) return mid
//         if (target > v) left = mid+1
//         else right = mid-1
//     }
//     return -1
// }

// const compression = []
// for (let i = 0; i < M; i++) {
//     const uni = universe[i]
//     let sorted = [...uni].sort((a, b) => a - b)
//     sorted = [...new Set(sorted)]
//     const comp = []
//     for (let j = 0; j < N; j++) {
//         const v = uni[j]
//         const idx = binarySearch(sorted, v)
//         comp.push(idx)
//     }
//     compression.push(comp)
// }
const compression = {};
for (let i = 0; i < M; i++) {
  const uni = universe[i];
  let sorted = [...uni].sort((a, b) => a - b);
  sorted = [...new Set(sorted)];
  const hash = {};
  sorted.forEach((v, i) => {
    hash[v] = i;
  });
  const comp = [];
  for (let j = 0; j < N; j++) {
    const v = uni[j];
    const idx = hash[v];
    comp.push(idx);
  }
  const str = comp.join(" ");
  compression[str] = compression[str] + 1 || 1;
}

let cnt = 0;
// for (let i = 0; i < M-1; i++) {
//     for (let j = i+1; j < M; j++) {
//         const c1 = JSON.stringify(compression[i])
//         const c2 = JSON.stringify(compression[j])
//         if (c1 === c2) cnt++
//     }
// }
Object.values(compression).forEach((v) => {
  cnt += (v * (v - 1)) / 2;
});
console.log(cnt);

// const isSame = (u1, u2) => {
//     for (let k = 0; k < N-1; k++) {
//         for (let l = k+1; l < N; l++) {
//             const state1 = u1[k] > u1[l]
//             const state2 = u2[k] > u2[l]
//             if (state1 !== state2) return false
//         }
//     }
//     return true
// }

// let cnt = 0
// for (let i = 0; i < M-1; i++) {
//     for (let j = i+1; j < M; j++) {
//         const u1 = universe[i]
//         const u2 = universe[j]
//         if (isSame(u1, u2)) cnt++
//     }
// }
// console.log(cnt)

/*
좌표압축

두 우주의 행성 크기가 모든 1 ≤ i, j ≤ N에 대해서 아래와 같은 조건을 만족한다면, 두 우주를 균등하다고 한다.
- Ai < Aj → Bi < Bj
- Ai = Aj → Bi = Bj
- Ai > Aj → Bi > Bj

첫째 줄에 균등한 우주의 쌍의 개수를 출력한다.

2 ≤ M ≤ 100
3 ≤ N ≤ 10,000
1 ≤ 행성의 크기 ≤ 1,000,000

가능한 우주의 쌍을 모두 따져봐야 함 -> n^2 -> 10^4
우주 내에서 가능한 행성의 쌍을 모두 따져봐야 함 -> n^2 -> 10^8
브루트포스 -> 시간초과

행성들 간에 대소관계가 같은지 판단하는 방법 -> 좌표압축(이분탐색을 통한)
압축한 좌표가 같은 쌍이 있다면 카운트 1 증가
-> 시간초과. 좌표압축할 때 이분탐색 말고 해시 사용
*/
