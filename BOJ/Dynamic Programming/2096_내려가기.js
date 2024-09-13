const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const map = input.slice(1);
const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: 3 }, () => Array.from({ length: 2 }, () => 0))
);

for (let i = 1; i <= N; i++) {
  dp[i][0][0] = Math.max(dp[i - 1][0][0], dp[i - 1][1][0]) + map[i - 1][0];
  dp[i][1][0] =
    Math.max(dp[i - 1][0][0], dp[i - 1][1][0], dp[i - 1][2][0]) + map[i - 1][1];
  dp[i][2][0] = Math.max(dp[i - 1][1][0], dp[i - 1][2][0]) + map[i - 1][2];

  dp[i][0][1] = Math.min(dp[i - 1][0][1], dp[i - 1][1][1]) + map[i - 1][0];
  dp[i][1][1] =
    Math.min(dp[i - 1][0][1], dp[i - 1][1][1], dp[i - 1][2][1]) + map[i - 1][1];
  dp[i][2][1] = Math.min(dp[i - 1][1][1], dp[i - 1][2][1]) + map[i - 1][2];
}
const last = dp[dp.length - 1];
const lastMax = last.map((v) => v[0]);
const lastMin = last.map((v) => v[1]);
// console.log(last, lastMax, lastMin)
console.log(Math.max(...lastMax), Math.min(...lastMin));

// import sys

// input = sys.stdin.readline

// n = int(input())

// max_dp = [0] * 3
// min_dp = [0] * 3

// max_tmp = [0] * 3
// min_tmp = [0] * 3

// for i in range(n):
//     a, b, c = map(int, input().split())
//     for j in range(3):
//         if j == 0:
//             max_tmp[j] = a + max(max_dp[j], max_dp[j + 1])
//             min_tmp[j] = a + min(min_dp[j], min_dp[j + 1])
//         elif j == 1:
//             max_tmp[j] = b + max(max_dp[j - 1], max_dp[j], max_dp[j + 1])
//             min_tmp[j] = b + min(min_dp[j - 1], min_dp[j], min_dp[j + 1])
//         else:
//             max_tmp[j] = c + max(max_dp[j], max_dp[j - 1])
//             min_tmp[j] = c + min(min_dp[j], min_dp[j - 1])

//     for j in range(3):
//         max_dp[j] = max_tmp[j]
//         min_dp[j] = min_tmp[j]

// print(max(max_dp), min(min_dp))

/*
N줄에 0 이상 9 이하의 숫자가 세 개씩 적혀 있다.
먼저 처음에 적혀 있는 세 개의 숫자 중에서 하나를 골라서 시작하게 된다. 그리고 다음 줄로 내려가는데,
바로 아래의 수로 넘어가거나, 아니면 바로 아래의 수와 붙어 있는 수로만 이동할 수 있다는 것이다.
숫자표가 주어져 있을 때, 얻을 수 있는 최대 점수, 최소 점수를 구하는 프로그램을 작성하시오. 점수는 원룡이가 위치한 곳의 수의 합이다.
(1 ≤ N ≤ 100,000)

max dp, min dp -> 메모리초과
-> 하나의 dp에 max,min 값 같이 집어넣기 -> 메모리초과 -> 위 방법이랑 어차피 메모리는 동일하게 쓰는 듯

다른사람: 이 문제는 일단 Node.js 로 못푸는 문제이다. 메모리 초과 땜시.
-> 파이썬
https://bmy1320.tistory.com/entry/%EB%B0%B1%EC%A4%80-Gold-5-%EB%AC%B8%EC%A0%9C-%EB%B0%B1%EC%A4%80-Nodejs-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-2096-%EB%82%B4%EB%A0%A4%EA%B0%80%EA%B8%B0-DP
https://cheon2308.tistory.com/entry/%EB%B0%B1%EC%A4%80-2096%EB%B2%88-%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EB%82%B4%EB%A0%A4%EA%B0%80%EA%B8%B0

*/
