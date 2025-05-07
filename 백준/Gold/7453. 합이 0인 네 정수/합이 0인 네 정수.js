const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n").map((v) => v.split(' ').map(Number))
const [N] = input[0]
const arr = input.slice(1)

const A = arr.map((v) => v[0])
const B = arr.map((v) => v[1])
const C = arr.map((v) => v[2])
const D = arr.map((v) => v[3])

const X = []
const Y = []
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        const sum1 = A[i] + B[j]
        const sum2 = C[i] + D[j]
        X.push(sum1)
        Y.push(sum2)
    }
}
// console.log(X.arr)
// console.log(Y.arr)


const map = new Map()
let ans = 0

for (const v of X) {
    const target = -v
    map.set(target, map.get(target) + 1 || 1)
}

for (const v of Y) {
    ans +=  map.get(v) || 0
}

console.log(ans)

/*
22:59

12초. N 최대 10^3
경우의 수는 n*n*n*n = n^4 = 10^12 = 1초 * 10^4 -> 시간초과 예상
브루트포스 안되고... 그럼 어떻게 하지?
그럼.. 일단 선택하긴 해야 할 텐데. dp 로 가면 될 듯?
이전 선택에서 중복으로 계산해놓은 게 있을 것 같다.

점화식을 세워야 하는데..
dp[1~4][1~n]
dp[i][j] = 
근데 최솟값 최대값이 아니라 합이 0이어야 하잖아.
무슨 값을 optimal 값으로 해야 할지가 불명확한데...
dp 테이블 그림으로 생각해보자
dp[1][1] = -45
dp[2][1] = 
합이 0이 되는 걸 아는 시점은 4개의 수를 다 더했을 때인데.
아직 dp 로 쌓아올리기 전에는 뭐가 최적인지 알고 저장해놓는지 모르겠음
그래서 dp 로 풀기 어려워 보임

합이 0이 된다라...
트리구조.. 이분탐색이라.. 3개의 수 합 구해놓고 나머지 하나 스캔할 땐 전체 n 스캔할 필요 없이 이분탐색으로 찾기 가능한데
만약 그럼 시간복잡도 어케되지? N^3 * logN = 10^9 * 3 = 1초 * 30 -> 시간초과 예상

음 그럼.. 2개씩 구해서 이분탐색하면?
N^2 -> X
N^2 -> Y
X 돌면서 Y 이분탐색으로 찾기. N^2 * log(N^2) = 10^6 * 6 -> 1초 미만
함 해보자..

53 41 32 12 -2 -10
-63 -32 -12 2 13 42

53 -> -53 이 있나?
41 -> -41 이 있나?
...
-10 -> 10 이 있나?

-> 시간초과. 왜지...
아. 정렬할 때 (N^2)^2 = N^4 이 드는구나.
그러면 정렬을 위해 트리구조로 만들어줘야 해...

힙을 구현해야겠다... 근데 귀찮다. -> 이전에 만들어둔 거 복붙하자
-> 왜 힙에 푸시했는데 배열 정렬이 안 되지? -> 트리구조에서의 정렬이었음. 배열로 볼 땐 정렬된 게 아님.

다른사람풀이 보니, 맵을 이용
X 가 가진 합을 맵에다 저장해놓고, Y 돌면서 갖고있는지 확인
그럼 정렬할 필요도 없이 가능하겠구나. 이분탐색도 필요 없고.
*/