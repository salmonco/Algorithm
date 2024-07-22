const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const N = +input[0][0];
const queue = [];
let head = 0;
const ans = [];

for (let i = 0; i < N; i++) {
  const [command, v] = input[i + 1];
  // console.log(command, v, queue, head, ans)
  switch (command) {
    case "push":
      queue.push(v);
      break;
    case "pop":
      if (queue.length === head) {
        ans.push(-1);
        break;
      }
      const pop = queue[head++];
      ans.push(pop);
      break;
    case "size":
      ans.push(queue.length - head);
      break;
    case "empty":
      ans.push(queue.length === head ? 1 : 0);
      break;
    case "front":
      if (queue.length === head) {
        ans.push(-1);
        break;
      }
      ans.push(queue[head]);
      break;
    case "back":
      if (queue.length === head) {
        ans.push(-1);
        break;
      }
      ans.push(queue[queue.length - 1]);
      break;
  }
}
console.log(ans.join("\n"));

/*
queue
*/
