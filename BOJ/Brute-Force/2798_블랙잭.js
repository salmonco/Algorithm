const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const card = input[1];
let max = 0;

for (let i = 0; i < N - 2; i++) {
  const first = card[i];
  for (let j = i + 1; j < N - 1; j++) {
    const second = card[j];
    for (let k = j + 1; k < N; k++) {
      const third = card[k];
      const sum = first + second + third;
      if (sum <= M && sum > max) {
        max = sum;
      }
    }
  }
}
console.log(max);

/*
카드의 합이 21을 넘지 않는 한도 내에서, 카드의 합을 최대한 크게 만드는 게임이다.
김정인 버전의 블랙잭에서 각 카드에는 양의 정수가 쓰여 있다. 그 다음, 딜러는 N장의 카드를 모두 숫자가 보이도록 바닥에 놓는다. 그런 후에 딜러는 숫자 M을 크게 외친다.
이제 플레이어는 제한된 시간 안에 N장의 카드 중에서 3장의 카드를 골라야 한다. 블랙잭 변형 게임이기 때문에, 플레이어가 고른 카드의 합은 M을 넘지 않으면서 M과 최대한 가깝게 만들어야 한다.
N장의 카드에 써져 있는 숫자가 주어졌을 때, M을 넘지 않으면서 M에 최대한 가까운 카드 3장의 합을 구해 출력하시오.
(3 ≤ N ≤ 100)
(10 ≤ M ≤ 300,000)

3장 뽑는 경우의 수
삼중 for문. 10^6 이라 시간 괜찮을 듯
*/
