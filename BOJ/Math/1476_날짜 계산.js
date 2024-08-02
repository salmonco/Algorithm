const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [E, S, M] = input[0];
const limit = [15, 28, 19];
let cnt = 1;

while (true) {
  if (
    cnt % limit[0] === E % limit[0] &&
    cnt % limit[1] === S % limit[1] &&
    cnt % limit[2] === M % limit[2]
  ) {
    break;
  }
  // if (
  //   (cnt - E) % limit[0] === 0 &&
  //   (cnt - S) % limit[1] === 0 &&
  //   (cnt - M) % limit[2] === 0
  // ) {
  //   break;
  // }
  cnt++;
}
console.log(cnt);

/*
지구를 나타내는 수를 E, 태양을 나타내는 수를 S, 달을 나타내는 수를 M이라고 했을 때,
이 세 수는 서로 다른 범위를 가진다. (1 ≤ E ≤ 15, 1 ≤ S ≤ 28, 1 ≤ M ≤ 19)

예를 들어, 15년은 15 15 15로 나타낼 수 있다. 하지만, 1년이 지나서 16년이 되면 16 16 16이 아니라 1 16 16이 된다.
이유는 1 ≤ E ≤ 15 라서 범위를 넘어가기 때문이다.

E, S, M이 주어졌고, 1년이 준규가 사는 나라에서 1 1 1일때,
준규가 사는 나라에서 E S M이 우리가 알고 있는 연도로 몇 년인지 구하는 프로그램을 작성하시오.

1 16 31 ...+15
16 +28 +28
16 +19 +19

젤 작은 수에 limit 더해가면서 세 수가 같은지 비교 -> 메모리초과
메모리제한: 4 MB -> 나는 메모리제한에 대한 감이 없는 상태임

다른사람풀이: 나머지 이용
처음시도: 각각 limit으로 나눠서 나머지가 E, S, M인 수 구하기
-> 실패 -> 예외: E가 max인 15인 경우, 15로 나누면 0인데, 15랑 같지 않음
-> 우측도 15로 나눈 거랑 비교 or (cnt-E) % 15 === 0
-> 메모리초과
-> 결국 chatGPT 돌려서 파이썬 코드로 바꿔서 풂
*/
