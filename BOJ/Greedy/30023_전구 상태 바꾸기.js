const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const N = input[0];
const S = input[1].split("");
const colors = ["R", "G", "B"];
const obj = { R: 0, G: 1, B: 2 };

const getNextColorPos = (color) => {
  return (obj[color] + 1) % colors.length;
};

const changeColor = (S, color) => {
  const newColorArr = [...S];
  let cnt = 0;

  for (let i = 0; i < newColorArr.length - 2; i++) {
    if (newColorArr[i] === color) continue;

    newColorArr[i] = colors[getNextColorPos(newColorArr[i])];
    newColorArr[i + 1] = colors[getNextColorPos(newColorArr[i + 1])];
    newColorArr[i + 2] = colors[getNextColorPos(newColorArr[i + 2])];
    cnt++;
    i--;
  }

  if (newColorArr.at(-2) === color && newColorArr.at(-1) === color) return cnt;
  else return Infinity;
};

if (S.length === 3) {
  const char = S[0];
  let isSameColor = true;

  for (let i = 1; i < 3; i++) {
    if (char !== S[i]) {
      isSameColor = false;
      break;
    }
  }
  if (isSameColor) console.log(0);
  else console.log(-1);
} else {
  const cntR = changeColor(S, "R");
  const cntG = changeColor(S, "G");
  const cntB = changeColor(S, "B");
  const min = Math.min(cntR, cntG, cntB);

  if (min === Infinity) console.log(-1);
  else console.log(min);
}

/*
R -> G -> B

[RGGB]
모든 문자를 R로 만들기
RBBR
RRRG (x)

모든 문자를 G로 만들기
GBBB 1
GRRR 2
GGGG 3 (o)

[BGRGB]
모든 문자를 R로 만들기
RBGGB 1
RRBBB 2
RRRRR 3 (o)

[BRR] (x)

문자열 개수가 3 인데 모두 같은 문자가 아니면 -1

모든 문자를 각각 R, G, B로 만드는 3가지 경우에 대해 보기
-> 모든 문자를 R or G or B로 만들 수 없으면 -1

앞에서부터 특정 문자가 되도록 변환
뒤에서부터 1,2번째 문자열을 봤을 때 특정 문자가 아니면 -1
*/
