const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(' ').map(Number))
const [T] = input[0]
const [N] = input[1]
const arrA = input[2]
const [M] = input[3]
const arrB = input[4]
let cnt = 0

// arrA.sort((a, b) => a - b)
// arrB.sort((a, b) => a - b)

// const dfs = (sum, idxA, idxB, cntA, cntB) => {
//     if (sum >= T) {
//         if (cntA === 0 || cntB === 0) return
//         if (sum === T) cnt++
//         return
//     }
//     for (let i = idxA+1; i < arrA.length; i++) {
//         const a = arrA[i]
//         dfs(sum+a, i, idxB, cntA+1, cntB)
//     }
//     for (let i = idxB+1; i < arrB.length; i++) {
//         const b = arrB[i]
//         dfs(sum+b, idxA, i, cntA, cntB+1)
//     }
// }
// dfs(0, 0, 0, 0, 0)
// console.log(cnt)

const mapA = {}
for (let i = 0; i < N; i++) {
    let sum = 0
    for (let j = i; j < N; j++) {
        const v = arrA[j]
        sum += v
        mapA[sum] = mapA[sum]+1 || 1
    }
}
// console.log(mapA)
for (let i = 0; i < M; i++) {
    let sum = 0
    for (let j = i; j < M; j++) {
        const v = arrB[j]
        sum += v
        if (mapA[T-sum]) {
            cnt += mapA[T-sum]
        }
    }
}
console.log(cnt)


/*
12:26

2초. n은 10^3. T는 10^9
음...A배열이랑 B배열 요소 합해서 T가 되는 경우의 수.
일단 두 배열에서 각각 최소 하나씩 포함이 되어야 함.
몇 개씩 뽑을지를 정해놓고 가야 하나?
1-1
2-1
3-1
n-1
...
1-2
2-2
n-2
...
1-n
2-n
n-n

뽑는 개수 쌍의 경우의 수. n*n=10^6
뽑는 경우의 수.
nC1
10C1=10
10C5=9*2*7*2
10*9*8*7*6
5*4*3*2
10이 아니라 n이면... 시간복잡도 괜찮나?
왜 모르겠지.. 어떻게 산정해야 하지.. 조합을 구현하는 것도 문젠데...
걍 다 스캔하면서 구해?

1 3 1 2
1 3 2

1
1 / 3 / 2
1 3 / 1 2 / 3 2
1 3 2

2^n=2^(10^3)
2^30=1초. 에반데.
bfs같은 브루트포스로 하면 무조건 시간초과 나겠는데..

다른방법...어떤알고리즘이 있을 수 있을까.
그리디
이분탐색
dp

뭔가 다 가능성이 희박해보인다.
아. 걍 dfs같은 브루트포스로 하되 sum이 T를 초과한 거 쳐내면 시간 줄지 않을까?
쳐내면 얼마나 시간 줄어드는지 모르겠음. 그래도 함 해볼까?

정렬같은 거 하는 게 좋을까? 정렬이 필요할까?
1 1 2 3
1 2 3
쳐낼 때 유용할 것 같기도..

-> 시간초과

다른사람풀이보니 되게 현명하게 풀었음.
A배열에서 나올 수 있는 sum을 key로, value를 sum의 경우의 수로 하는 객체 만들고
B배열이랑 더해서 T가 되는 경우의 수를 구했음.

근데 중간에 건너뛰기 안해도 되는 건가?
이렇게 하면 1 _ _ 3 의 합이 안 구해지는데
1 / 1 1 / 1 1 2 / 1 1 2 3 이렇게만 되는 거 아냐?
부분 배열의 합이 연속적이지 않은 경우를 고려하지 않아도 되는 거야?
아.... 내가 문제이해를 잘못한듯. 
부 배열의 합은 A[i]+…+A[j]를 의미한다. -> 연속적인 걸 의미한 거였구나.
그럼 이 풀이가 이해가 됨.

*/