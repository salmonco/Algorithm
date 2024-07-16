const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [NA, NB] = input[0];
const hash1 = {};
const hash2 = {};
// for (let i = 0; i < NA; i++) {
// }
for (let c of input[1]) {
  hash1[c] = hash1[c] + 1 || 1;
}
for (let c of input[2]) {
  hash2[c] = hash2[c] + 1 || 1;
}
const ans = [];
Object.entries(hash1).forEach(([k, v]) => {
  if (v === 0 || hash2[k]) return;
  ans.push(k);
});
if (ans.length) {
  console.log(ans.length);
  console.log(ans.join(" "));
} else {
  console.log(0);
}

/*
몇 개의 자연수로 이루어진 두 집합 A와 B가 있다. 집합 A에는 속하면서 집합 B에는 속하지 않는 모든 원소를 구하는 프로그램을 작성하시오.
첫째 줄에 집합 A에는 속하면서 집합 B에는 속하지 않는 원소의 개수를 출력한다. 다음 줄에는 구체적인 원소를 빈 칸을 사이에 두고 증가하는 순서로 출력한다. 집합 A에는 속하면서 집합 B에는 속하지 않는 원소가 없다면 첫째 줄에 0만을 출력하면 된다.
(1 ≤ n(A), n(B) ≤ 500,000)
하나의 집합의 원 소는 2,147,483,647 이하의 자연수이며, 하나의 집합에 속하는 모든 원소의 값은 다르다.

해시
다른사람 풀이1: 정렬 + 투포인터
다른사람 풀이2: 정렬 + 이분탐색
*/
