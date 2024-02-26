function solution(n, t, m, p) {
  let num = 0;
  let turn = 1;
  const myTurn = p % m;
  let answer = "";
  while (answer.length < t) {
    const str = num.toString(n);
    for (let i = 0; i < str.length; i++) {
      const s = str[i];
      if (turn % m === myTurn) {
        if (answer.length >= t) break;
        answer += s.toUpperCase();
        // console.log(turn, num, answer)
      }
      turn++;
    }
    num++;
  }
  return answer;
}

/*
# 예1
[0] 1 [1] 0 [1] 1 [1] 0

# 예2
[0] 1 [2] 3 [4] 5 [6] 7 [8] 9 [A] B [C] D [E] F [1] 0 [1] 1 [1] 2 ...

1 2 3 4 5 %m
1 0 1 0 1 === p%m
*/
