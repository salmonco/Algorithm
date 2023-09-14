const fs = require("fs");
const [n, str] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const input = str.split(" ").map((item) => +item);

if (input.length === 1) {
  console.log("A");
} else if (input.length === 2) {
  if (input[0] === input[1]) {
    console.log(input[0]);
  } else {
    console.log("A");
  }
} else {
  let a = 0;
  let b = 0;
  if (input[1] - input[0] !== 0) {
    a = (input[2] - input[1]) / (input[1] - input[0]);
  }
  b = input[1] - input[0] * a;

  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    console.log("B");
  } else {
    for (let i = 1; i < n - 1; i++) {
      if (input[i] * a + b !== input[i + 1]) {
        console.log("B");
        break;
      }
      if (i === input.length - 2) {
        console.log(input.at(-1) * a + b);
      }
    }
  }
}
