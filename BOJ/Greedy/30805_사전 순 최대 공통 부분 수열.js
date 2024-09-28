const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const A = input[1];
const [M] = input[2];
const B = input[3];

const findMaxNum = (arr1, arr2) => {
  let p1 = 0;
  let p2 = 0;
  while (p1 < arr1.length && p2 < arr2.length) {
    if (arr1[p1] === arr2[p2]) return arr1[p1];
    if (arr1[p1] < arr2[p2]) {
      p2++;
    } else {
      p1++;
    }
  }
  return -1;
};

let tempA = [...A];
let tempB = [...B];
const ans = [];
while (tempA.length && tempB.length) {
  const sortedA = [...tempA].sort((a, b) => b - a);
  const sortedB = [...tempB].sort((a, b) => b - a);
  const v = findMaxNum(sortedA, sortedB);
  if (v === -1) break;
  ans.push(v);
  const idxA = tempA.indexOf(v);
  const idxB = tempB.indexOf(v);
  tempA = tempA.slice(idxA + 1);
  tempB = tempB.slice(idxB + 1);
}
console.log(ans.length);
console.log(ans.join(" "));

/*
두 수열 중 첫 번째 수가 큰 쪽은 사전 순으로 나중입니다.
두 수열의 첫 번째 수가 같다면, 첫 번째 수를 빼고 두 수열을 다시 비교했을 때 사전 순으로 나중인 쪽이 사전 순으로 나중입니다.
길이가 $0$인 수열과 다른 수열을 비교하면, 다른 수열이 사전 순으로 나중입니다.
수열 $A$와 수열 $B$가 공통으로 갖는 부분 수열들 중 사전 순으로 가장 나중인 것을 구하세요.
1 <= N, M <= 100

길이 상관 없이 젤 첫 숫자부터 비교해서 큰 게 나중임
공통 부분 수열 어떻게 찾지?
A, B 각각 모든 경우의 수 구해서 공통된 거 찾자니 길이 100이라서 2^100이라 시간초과 날텐데.

공통으로 갖는 젤 큰 숫자 찾기. 그게 차피 젤 나중인 부분 수열이므로.
정렬
9 7 3 1
8 7 5 3 1
-> 7이 공통

3
5 3
정렬
3
5 3
-> 3이 공통

{}
{5}
공통되는 숫자가 없으므로 끝
*/
