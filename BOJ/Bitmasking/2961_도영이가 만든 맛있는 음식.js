const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const ingredient = [];
for (let i = 0; i < N; i++) {
  const [sour, bitter] = input[i + 1];
  ingredient.push([sour, bitter]);
}

let ans = Infinity;
for (let i = 1; i < 1 << N; i++) {
  // 1(00..001) 부터 2^n-1(11..111)까지 (n자리수) -> 가능한 재료 조합 탐색
  let s = 1;
  let b = 0;
  for (let x = 0; x < N; x++) {
    // 최대 n-1칸 shiftleft -> 어떤 재료가 포함되는지 탐색
    if (i & (1 << x)) {
      // 조건문 결과가 1이면 해당 재료 사용한거임
      const [ns, nb] = ingredient[x];
      s *= ns;
      b += nb;
    }
  }
  ans = Math.min(ans, Math.abs(s - b));
}
console.log(ans);

// const visited = Array.from({ length: N }, () => false)
// let ans = Infinity

// const dfs = (idx, sourSum, bitterSum) => {
//     // console.log(idx, sourSum, bitterSum)
//     ans = Math.min(ans, Math.abs(sourSum-bitterSum))
//     for (let i = 0; i < N; i++) {
//         if (visited[i]) continue
//         visited[i] = true
//         const [ns, nb] = ingredient[i]
//         dfs(i, sourSum*ns, bitterSum+nb)
//         visited[i] = false
//     }
// }

// for (let i = 0; i < N; i++) {
//     const [s, b] = ingredient[i]
//     visited[i] = true
//     dfs(i, s, b)
//     visited[i] = false
// }
// console.log(ans)

/*
지금 도영이의 앞에는 재료가 N개 있다. 도영이는 각 재료의 신맛 S와 쓴맛 B를 알고 있다.
여러 재료를 이용해서 요리할 때, 그 음식의 신맛은 사용한 재료의 신맛의 곱이고, 쓴맛은 합이다.
재료는 적어도 하나 사용해야 한다.
재료의 신맛과 쓴맛이 주어졌을 때, 신맛과 쓴맛의 차이가 가장 작은 요리를 만드는 프로그램을 작성하시오.
모든 재료를 사용해서 요리를 만들었을 때, 그 요리의 신맛과 쓴맛은 모두 1,000,000,000보다 작은 양의 정수이다.

처음풀이: dfs
다른사람풀이: 비트마스킹

재료가 총 4개 있다고 해보자.
0001 (0번 재료 선택)
0010 (1번 재료 선택)
...
1111 (0,1,2,3번 재료 선택)

따라서 0101인 경우, 몇번째 재료들을 선택한 건지 알아내기 위해서는
0101 & (1<<i) 가 0인지 아닌지 확인하면 된다.

0101 & (1<<0) == 0001 (0아님 -> 0번째 재료 선택O)
0101 & (1<<1) == 0000 (0임 -> 1번째 재료 선택X)
0101 & (1<<2) == 0100 (0아님 -> 2번째 재료 선택O)
0101 & (1<<3) == 0000 (0임 -> 3번째 재료 선택X)

재료가 총 N개 이므로
1(00..001)부터 2^N-1(11..111)까지 순회하며 각각을
(1<<0) ... (1<<N-1)와 & 연산 하여 재료 선택 여부를 체크하고
문제 상황에 맞게 필요한 코드를 작성하면 된다.
https://ezeun.tistory.com/205
*/
