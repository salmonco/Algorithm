const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const map = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => " ")
);

const recur = (size, r, c, isEmpty = false) => {
  // console.log(size, r, c, isEmpty)
  if (size === 1) {
    if (!isEmpty) {
      map[r][c] = "*";
    }
    return;
  }
  const newSize = size / 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (isEmpty || (i === 1 && j === 1)) {
        recur(newSize, r + newSize * i, c + newSize * j, true);
      } else {
        recur(newSize, r + newSize * i, c + newSize * j);
      }
    }
  }
};
recur(N, 0, 0);
console.log(map.map((v) => v.join("")).join("\n"));

/*
재귀적인 패턴으로 별을 찍어 보자. N이 3의 거듭제곱(3, 9, 27, ...)이라고 할 때, 크기 N의 패턴은 N×N 정사각형 모양이다.
크기 3의 패턴은 가운데에 공백이 있고, 가운데를 제외한 모든 칸에 별이 하나씩 있는 패턴이다.
N은 3의 거듭제곱이다. 즉 어떤 정수 k에 대해 N=3k이며, 이때 1 ≤ k < 8이다.
첫째 줄부터 N번째 줄까지 별을 출력한다.

NxN 사이즈 배열 미리 만들어놓고 안에 값 채우기

14:26~14:42 (16m)
*/
