const fs = require("fs");
const [n, str] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [N, K] = n.split(" ");
const input = str.split(" ").map((item) => +item);

let use = [];
let cnt = 0;

for (let i = 0; i < K; i++) {
  // console.log(use, input[i], cnt)
  if (use.includes(input[i])) continue;

  if (use.length < N) {
    use.push(input[i]);
    continue;
  }

  cnt++;
  if (i === K - 1) break;

  let remain = input.slice(i + 1);
  let emitIndex;
  let max = -1;
  for (let i = 0; i < N; i++) {
    let index = remain.indexOf(use[i]);
    if (index === -1) {
      emitIndex = i;
      break;
    }
    if (max < index) {
      max = index;
      emitIndex = i;
    }
  }
  use.splice(emitIndex, 1, input[i]);
}

console.log(cnt);
