const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const T = input[0];

// const fibo = (n, cnt) => {
//     if (n === 0 || n=== 1) {
//         cnt[n]++
//         return n
//     }
//     return fibo(n-1, cnt) + fibo(n-2, cnt)
// }

const ans = [];
for (let i = 0; i < T; i++) {
  const N = input[i + 1];
  // const cnt = [0, 0]
  // fibo(N, cnt)
  const cnt = [
    [1, 0],
    [0, 1],
  ];
  for (let j = 2; j <= N; j++) {
    cnt[j] = [cnt[j - 1][0] + cnt[j - 2][0], cnt[j - 1][1] + cnt[j - 2][1]];
  }
  // ans.push(cnt.join(' '))
  ans.push(cnt[N].join(" "));
}
console.log(ans.join("\n"));

/*
N이 주어졌을 때, fibonacci(N)을 호출했을 때, 0과 1이 각각 몇 번 출력되는지 구하는 프로그램을 작성하시오.
N은 40보다 작거나 같은 자연수 또는 0이다.

처음시도: 피보나치 함수 재귀 -> 시간초과
다른사람풀이: dp
https://gurtn.tistory.com/69
*/
