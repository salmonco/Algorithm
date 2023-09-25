const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const N = +input;

const isPrime = (n) => {
  if (n === 1) return false;
  for (let i = 2; i <= n ** (1 / 2); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

let answer = [];
const visited = Array.from({ length: N + 1 }, () => false);
let finish = false;

const dfs = ([current, sum, arr]) => {
  // console.log(current, sum, arr)
  if (arr.length == N) {
    answer = arr;
    finish = true;
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (finish) return;
    if (visited[i] || isPrime(sum + i)) continue;
    visited[i] = true;
    dfs([i, sum + i, [...arr, i]]);
    visited[i] = false;
  }
};

const totalSum = (N * (N + 1)) / 2;

if (isPrime(totalSum)) {
  console.log("NO");
} else {
  for (let i = 1; i <= N; i++) {
    if (isPrime(i)) continue;
    visited[i] = true;
    dfs([i, i, [i]]);
    visited[i] = false;
  }
  if (!answer.length) {
    console.log("NO");
  } else {
    console.log("YES");
    console.log(answer.join(" "));
  }
}

/*
1부터 N까지 합한 수가 소수면 안 됨
시간 초과 -> finish 변수 추가. 탐색 중인 것들에게 끝났음을 알리기
*/
