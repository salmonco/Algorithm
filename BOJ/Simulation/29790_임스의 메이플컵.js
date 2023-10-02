const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, U, L] = input[0];

if (N >= 1000) {
  if (U >= 8000 || L >= 260) {
    console.log("Very Good");
  } else {
    console.log("Good");
  }
} else {
  console.log("Bad");
}
