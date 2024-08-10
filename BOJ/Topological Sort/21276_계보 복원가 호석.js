const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const N = +input[0][0];
const name = input[1];
const M = +input[2][0];
const graph = {};
const inDegrees = {};
for (let i = 0; i < M; i++) {
  const [X, Y] = input[i + 3]; // X의 조상 중에 Y가 있다
  if (!graph[Y]) graph[Y] = [];
  graph[Y].push(X);
  inDegrees[X] = inDegrees[X] + 1 || 1;
}
// console.log(inDegrees)
const topologicalSort = () => {
  const queue = [];
  const hash = {};
  const child = {};
  let head = 0;
  for (const v of name) {
    if (!inDegrees[v]) queue.push([v, v]);
  }
  while (queue.length > head) {
    const [v, ancestor] = queue[head++];
    hash[v] = ancestor;
    if (!graph[v]) continue;
    if (!child[v]) child[v] = [];
    for (const nv of graph[v]) {
      inDegrees[nv]--;
      if (inDegrees[nv] === 0) queue.push([nv, ancestor]);
      child[v].push(nv);
    }
  }
  return { hash, child };
};

const { hash, child } = topologicalSort();
// console.log(hash, child)
const ancestor = Object.entries(hash)
  .filter(([k, v]) => k === v)
  .map((arr) => arr[0])
  .sort();

let sorted = Object.entries(child).sort((a, b) => a[1].length - b[1].length);
sorted.forEach((arr) => arr[1].sort());
const childHash = {};
const checkHash = {};
for (const [k, arr] of sorted) {
  for (const v of arr) {
    if (checkHash[v]) continue;
    if (!childHash[k]) childHash[k] = [];
    childHash[k].push(v);
    checkHash[v] = true;
  }
}
// console.log(childHash)
const ans = [];
name.sort();
for (const v of name) {
  if (!childHash[v]) ans.push(`${v} 0`);
  else ans.push(`${v} ${childHash[v].length} ${childHash[v].join(" ")}`);
}
console.log(ancestor.length);
console.log(ancestor.join(" "));
console.log(ans.join("\n"));

/*
첫번째 줄에는 가문의 개수 K 를 출력하라.
두 번째 줄에는 각 가문의 시조들의 이름을 공백으로 구분하여 사전순으로 출력하라.
세번째 줄부터는 이름의 사전순 대로 사람의 이름과 자식의 수, 그리고 사전순으로 자식들의 이름을 공백으로 구분하여 출력하라.

조상->후손
Y->X
*/
