const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const T = +input[0];
const ans = [];
let line = 1;
for (let tc = 0; tc < T; tc++) {
  const P = input[line++].split("");
  const N = +input[line++];
  const arr = input[line++]
    .replace("[", "")
    .replace("]", "")
    .split(",")
    .filter((v) => v);
  let isReversed = false;
  let front = 0;
  let rear = arr.length - 1;
  let isError = false;

  for (const c of P) {
    // console.log(queue, isError)
    if (c === "R") {
      isReversed = !isReversed;
    } else if (c === "D") {
      if (front > rear) {
        // empty
        isError = true;
        break;
      }
      if (isReversed) {
        rear--;
      } else {
        front++;
      }
    }
  }
  if (isError) {
    ans.push("error");
  } else {
    const result = arr.slice(front, rear + 1);
    if (isReversed) result.reverse();
    ans.push(`[${result.join(",")}]`);
  }
}
console.log(ans.join("\n"));

/*
AC는 정수 배열에 연산을 하기 위해 만든 언어이다. 이 언어에는 두 가지 함수 R(뒤집기)과 D(버리기)가 있다.
함수 R은 배열에 있는 수의 순서를 뒤집는 함수이고, D는 첫 번째 수를 버리는 함수이다. 배열이 비어있는데 D를 사용한 경우에는 에러가 발생한다.
배열의 초기값과 수행할 함수가 주어졌을 때, 최종 결과를 구하는 프로그램을 작성하시오.
p의 길이는 1보다 크거나 같고, 100,000보다 작거나 같다.
(0 ≤ n ≤ 100,000)
(1 ≤ xi ≤ 100)

처음시도: 큐 구현 -> 시간초과
-> 실제 뒤집기 대신 플래그 사용: 배열을 실제로 뒤집는 대신, R 명령어가 나올 때마다 뒤집기 여부를 나타내는 플래그를 토글합니다. 이후 D 명령어가 나올 때 이 플래그를 참조하여 배열의 앞에서 제거할지, 뒤에서 제거할지 결정합니다. 이렇게 하면 R 연산의 시간 복잡도를 줄일 수 있습니다.
-> 배열을 직접 조작하지 않고 인덱스로 처리: 실제로 배열을 조작하는 대신 인덱스를 이용해 앞 또는 뒤에서 값을 빼는 방식으로 처리할 수 있습니다.

14:14~15:00 (46m)
*/
