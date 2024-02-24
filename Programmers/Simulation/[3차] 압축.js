function solution(msg) {
  let len = 26;
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const dict = {};
  alphabet.forEach((v, i) => (dict[v] = i + 1));
  const answer = [];

  msg = msg.split("");
  for (let i = 0; i < msg.length; i++) {
    const v = msg[i];
    if (v === "@") continue;
    if (i === msg.length - 1) {
      answer.push(dict[v]);
      break;
    }
    let j = i + 1;
    let currentStr = v;
    let nextStr = v + msg[j];
    while (dict[nextStr]) {
      currentStr += msg[j];
      nextStr += msg[++j];
    }
    answer.push(dict[currentStr]);
    dict[nextStr] = ++len;

    for (let k = i; k < j; k++) {
      msg[k] = "@";
    }
  }
  return answer;
}

/*
# 예3
ABABABABABABABAB
A, AB(27)
-> 1
B, BA(28)
-> 2
A, AB / AB, ABA(29)
-> 27
A, AB / AB, ABA / ABA, ABAB(30)
-> 29
B, BA / BA, BAB(31)
-> 28
...

유의할 사항: 문자열을 배열처럼 다룰 땐 정말 배열로 만들기. 문자열에 특정 인덱스에 값 할당하려니 마음처럼 안 됨.
*/
