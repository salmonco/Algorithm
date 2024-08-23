const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
const map = input.slice(1).map((v) => v.split(""));

const recur = (size, r, c) => {
  const dot = map[r][c];
  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      if (map[i][j] !== dot) {
        const newSize = size / 2;
        return (
          "(" +
          recur(newSize, r, c) +
          recur(newSize, r, c + newSize) +
          recur(newSize, r + newSize, c) +
          recur(newSize, r + newSize, c + newSize) +
          ")"
        );
      }
    }
  }
  return dot;
};
const ans = recur(N, 0, 0);
console.log(ans);

/*
위 그림에서 왼쪽의 영상은 오른쪽의 배열과 같이 숫자로 주어지며, 이 영상을 쿼드 트리 구조를 이용하여 압축하면 "(0(0011)(0(0111)01)1)"로 표현된다.
N ×N 크기의 영상이 주어질 때, 이 영상을 압축한 결과를 출력하는 프로그램을 작성하시오.
N 은 언제나 2의 제곱수로 주어지며, 1 ≤ N ≤ 64의 범위를 가진다.
각 문자열은 0 또는 1의 숫자로 이루어져 있으며, 영상의 각 점들을 나타낸다.

15:46~16:08 (22m)
*/
