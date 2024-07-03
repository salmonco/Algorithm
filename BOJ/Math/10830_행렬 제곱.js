const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const N = +input[0][0];
const B = BigInt(input[0][1]);
const DIV = 1000n;

const matrix = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => 0n)
);
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const v = BigInt(input[i + 1][j]);
    matrix[i][j] = v % DIV;
  }
}

const mulMatrix = (m1, m2) => {
  const newMatrix = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => 0n)
  );
  for (let i = 0; i < N; i++) {
    // matrix의 row
    // matrix의 column을 스캔. column의 이동은 j, row의 이동은 k
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        newMatrix[i][j] += m1[i][k] * m2[k][j];
      }
      newMatrix[i][j] %= DIV;
    }
  }
  return newMatrix;
};

const powMatrix = (m, e) => {
  if (e === 1n) return m;
  if (e % 2n === 0n) {
    const half = powMatrix(m, e / 2n);
    return mulMatrix(half, half);
  } else {
    const half = powMatrix(m, (e - 1n) / 2n);
    return mulMatrix(half, mulMatrix(half, m));
  }
};

const ansMatrix = powMatrix(matrix, B);
for (let i = 0; i < N; i++) {
  let str = "";
  for (let j = 0; j < N; j++) {
    str += ansMatrix[i][j] + " ";
  }
  console.log(str);
}

/*
분할 정복

80%에서 실패 -> 초기 원소도 1000으로 나눠주기
B=1일 때 pow과정에서 바로 matrix가 반환될 수 있는데, 이때 모듈러연산이 실행되지 않기에 오답이 되어버린다고 함.
근데 원소 1000보다 작다고 했는데.. Why?
*/
