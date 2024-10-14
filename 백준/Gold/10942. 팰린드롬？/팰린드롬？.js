const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const seq = input[1];
seq.unshift(0);
const [M] = input[2];
const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }, () => 0)
);
for (let i = 1; i <= N - 1; i++) {
  dp[i][i] = 1;
  if (seq[i] === seq[i + 1]) {
    dp[i][i + 1] = 1;
  }
}
dp[N][N] = 1;

// for (let i = 1; i < N; i++) {
//     for (let j = i+2; j <= N; j++) {
//         if (seq[i] === seq[j] && dp[i+1][j-1] === 1) {
//             dp[i][j] = 1
//         }
//     }
// }
for (let diff = 2; diff <= N; diff++) {
  for (let startIndex = 1; startIndex + diff <= N; startIndex++) {
    let endIndex = startIndex + diff;
    if (dp[startIndex + 1][endIndex - 1] && seq[startIndex] === seq[endIndex]) {
      dp[startIndex][endIndex] = 1;
    }
  }
}

// console.log(dp.map((v) => v.join(' ')).join('\n'))
const ans = [];
for (let i = 0; i < M; i++) {
  const [S, E] = input[3 + i];
  ans.push(dp[S][E]);
}
console.log(ans.join("\n"));

/*
10:12

10^6 * 10^3 = 10^9라서 시간초과 날 것 같다.
먼저 각 범위별 팰린드롬 여부 구한다 해도 n^3이라 10^9여서 시간초과 날 것 같다.
왼 포인터랑 오른쪽 포인터가 같을 때에만 그 안에 거 왼++ 오-- 해가며 스캔하도록 해야 하나? 그래도 차피 포인터 두 개 스캔하는데 n^2걸리고 최악의 경우 다 팰린드롬일 경우 안에도 스캔해야 해서 n^3걸릴 텐데?

스캔과 동시에 팰린드롬인 걸 알 수 있는 방법은 없나..? n^2로 줄일 수 있는 방법.
흠 어려울 거 같은데..

다른사람풀이: dp
아 dp로 하면 중복을 줄여줘서 왼,오 포인터 내부 스캔할 때 이전에 구한 거 갖다 쓸 수 있겠구나.

seq은 인덱스 0부터 시작해서 실수하기 쉬움 -> seq 앞에 unshift로 0 추가

-> 시간초과
중복 최적화가 잘 안되는 느낌. 다른사람풀이: dp 초기화할 때 숫자 하나 말고도 옆 얘랑 비교해서 팰린드롬여부 구함. 이중 for문 안에서 난 while문 써서 범위 내부 스캔했는데, 그거 안 해도 됐음. 걍 if문으로 젤 바로 안쪽 것만 비교하면 팰린드롬인지 아닌지 아므로.
dp 쓰면 범위 내부 스캔 한 번만 하면 되므로 n^2이 되는 듯.

4% 실패. 왜? 다른사람풀이랑 이중for문만 다른데 차피 로직 똑같이 않나?

내 이중for문:
(1, 3~N)
(2, 4~N)
--
다른사람 이중for문:
(1~N-2, 3~N)
(1~N-3, 4~N)
dp를 쓴다면 이렇게 해야 될 듯. 전자의 경우 초기화 이후로 아직 dp값 할당 안 된 것을 참조되는 경우 있음. 예를 들어, (1,4)에서 (2,3)을 참조하는데 아직 (2,3)은 dp값 할당 안 돼서 0을 참조할 거임.
반면 후자의 경우 범위가 작은 것부터 큰 것까지 dp 할당하기 때문에, 나중에 dp 큰 거에서 내부로 들어가서 범위 작은 거 참조하는 경우에 dp 최적화가 됨.
*/
