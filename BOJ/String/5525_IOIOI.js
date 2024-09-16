const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
const M = +input[1];
const S = input[2];

let i = 0;
let cnt = 0;
let ans = 0;
while (i < M - 2) {
  if (S[i] === "I" && S[i + 1] === "O" && S[i + 2] === "I") {
    i += 2;
    cnt++;
    if (cnt === N) {
      ans++;
      cnt--;
    }
  } else {
    i++;
    cnt = 0;
  }
}
console.log(ans);

/*
N+1개의 I와 N개의 O로 이루어져 있으면, I와 O이 교대로 나오는 문자열을 PN이라고 한다.
I와 O로만 이루어진 문자열 S와 정수 N이 주어졌을 때, S안에 PN이 몇 군데 포함되어 있는지 구하는 프로그램을 작성하시오.
1 ≤ N ≤ 1,000,000
2N+1 ≤ M ≤ 1,000,000

브루트포스로 스캔해도 10^6이라 괜찮을 듯 -> pattern 길이만큼 비교해야 해서 안 괜찮음. 10^6 * 10^6
-> 비교하는 걸 비트마스킹으로 하면? 그래도 차피 하나하나씩 비교해야 해서 똑같이 시간 걸릴 듯

다른사람풀이: IOI가 몇 번 연속되는지 갯수만 찾아서 체크하게 되면 N * 3 정도의 시간으로 문제를 풀 수 있게 된다. -> good
https://black-hair.tistory.com/135
*/
