const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const [T, P] = input[2];

// S, M, L, XL, XXL, XXXL
const groupTshirtCnt = input[1].reduce((p, size) => p + Math.ceil(size / T), 0);
const groupPenCnt = Math.floor(N / P);
const onePenCnt = N - groupPenCnt * P;
console.log(groupTshirtCnt);
console.log(groupPenCnt, onePenCnt);

/*
- 티셔츠는 S, M, L, XL, XXL, 그리고 XXXL의 6가지 사이즈가 있습니다. 티셔츠는 같은 사이즈의 
$T$장 묶음으로만 주문할 수 있습니다.
- 펜은 한 종류로, $P$자루씩 묶음으로 주문하거나 한 자루씩 주문할 수 있습니다.
티셔츠는 남아도 되지만 부족해서는 안 되고 신청한 사이즈대로 나눠주어야 합니다.
펜은 남거나 부족해서는 안 되고 정확히 참가자 수만큼 준비되어야 합니다.

티셔츠를 $T$장씩 최소 몇 묶음 주문해야 하는지,
그리고 펜을 $P$자루씩 최대 몇 묶음 주문할 수 있고, 그 때 펜을 한 자루씩 몇 개 주문하는지 구하세요.

*/
