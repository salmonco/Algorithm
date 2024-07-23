const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const hash = {};
const member = {};
let line = 1;
let groupCnt = 0;
while (true) {
  if (groupCnt === N) {
    // quiz
    break;
  }
  const groupName = input[line++];
  const memberCnt = +input[line++];
  if (!hash[groupName]) hash[groupName] = [];
  for (let i = 0; i < memberCnt; i++) {
    const name = input[line++];
    hash[groupName].push(name);
    member[name] = groupName;
  }
  groupCnt++;
}
Object.values(hash).forEach((arr) => arr.sort());
const ans = [];
while (input[line]) {
  const name = input[line++];
  const type = +input[line++];
  if (type === 0) {
    ans.push(...hash[name]);
  } else {
    ans.push(member[name]);
  }
}
console.log(ans.join("\n"));

/*
Hash
*/
