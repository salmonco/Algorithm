const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const M = +input[0][0];
let set = new Set();
const ans = [];
for (let i = 0; i < M; i++) {
  // console.log(set)
  const c = input[i + 1][0];
  const v = +input[i + 1][1];
  if (c === "add") {
    set.add(v);
  } else if (c === "remove") {
    set.delete(v);
  } else if (c === "check") {
    if (set.has(v)) ans.push(1);
    else ans.push(0);
  } else if (c === "toggle") {
    if (set.has(v)) set.delete(v);
    else set.add(v);
  } else if (c === "all") {
    set = new Set();
    for (let i = 1; i <= 20; i++) {
      set.add(i);
    }
  } else if (c === "empty") {
    set = new Set();
  }
}
console.log(ans.join("\n"));

// import sys

// m = int(sys.stdin.readline())
// S = set()

// for _ in range(m):
//     temp = sys.stdin.readline().strip().split()

//     if len(temp) == 1:
//         if temp[0] == "all":
//             S = set([i for i in range(1, 21)])
//         else:
//             S = set()

//     else:
//         func, x = temp[0], temp[1]
//         x = int(x)

//         if func == "add":
//             S.add(x)
//         elif func == "remove":
//             S.discard(x)
//         elif func == "check":
//             print(1 if x in S else 0)
//         elif func == "toggle":
//             if x in S:
//                 S.discard(x)
//             else:
//                 S.add(x)

/*
비어있는 공집합 S가 주어졌을 때, 아래 연산을 수행하는 프로그램을 작성하시오.

add x: S에 x를 추가한다. (1 ≤ x ≤ 20) S에 x가 이미 있는 경우에는 연산을 무시한다.
remove x: S에서 x를 제거한다. (1 ≤ x ≤ 20) S에 x가 없는 경우에는 연산을 무시한다.
check x: S에 x가 있으면 1을, 없으면 0을 출력한다. (1 ≤ x ≤ 20)
toggle x: S에 x가 있으면 x를 제거하고, 없으면 x를 추가한다. (1 ≤ x ≤ 20)
all: S를 {1, 2, ..., 20} 으로 바꾼다.
empty: S를 공집합으로 바꾼다.

(1 ≤ M ≤ 3,000,000)

js 언어제한
-> 파이썬의 set 함수
https://yoonsang-it.tistory.com/38
*/
