const input = require("fs").readFileSync("/dev/stdin").toString();
const N = +input;
const row = Array.from({ length: N }, () => 0);
let answer = 0;

const isPossible = (depth, X) => {
  for (let i = 0; i < depth; i++) {
    if (X === row[i] || Math.abs(X - row[i]) === depth - i) {
      return false;
    }
  }
  return true;
};

const dfs = (depth) => {
  if (depth === N) {
    answer++;
    return;
  }
  for (let i = 0; i < N; i++) {
    if (isPossible(depth, i)) {
      row[depth] = i;
      dfs(depth + 1);
    }
  }
};

dfs(0);
console.log(answer);

/*
N-Queen 문제는 크기가 N × N인 체스판 위에 퀸 N개를 서로 공격할 수 없게 놓는 문제이다.
N이 주어졌을 때, 퀸을 놓는 방법의 수를 구하는 프로그램을 작성하시오.

퀸은 상하좌우 대각선으로 무한정 이동 가능
*/
