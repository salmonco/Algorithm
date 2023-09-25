const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
const [A, B] = input;

const solution = (A, B) => {
  const answer = [];

  if (A <= B) {
    answer.push("NO");
    return answer;
  }
  const cnt = A - B;

  if (cnt > B) {
    answer.push("NO");
    return answer;
  }
  answer.push("YES");
  answer.push(cnt);

  const arr = Array.from({ length: cnt - 1 }, () => 1);
  arr.push(B - (cnt - 1));

  for (const v of arr) {
    const str = "a" + "ba".repeat(v);

    answer.push(str);
  }
  return answer;
};

const answer = solution(A, B);

for (const v of answer) {
  console.log(v);
}

/*
A > B 이어야 함
A - B개만큼 햄버거 만들 수 있음
A - B <= B 이어야 함

B를 A-B묶음이 되도록 나누는 경우의 수 구하기
ex) 5를 3묶음이 되도록 나누기: (1,1,3), (1,2,2), ...
그 중 하나 출력하기
*/
