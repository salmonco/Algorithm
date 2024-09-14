const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const cities = input.slice(1);

const getPos = () => {
  const house = [];
  const chicken = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (cities[i][j] === 1) house.push([i, j]);
      else if (cities[i][j] === 2) chicken.push([i, j]);
    }
  }
  return { house, chicken };
};

const { house, chicken } = getPos();
const visited = Array.from({ length: chicken.length }, () => false);

const getMinDist = () => {
  let sum = 0;
  for (const [hr, hc] of house) {
    let min = Infinity;
    for (let j = 0; j < chicken.length; j++) {
      if (!visited[j]) continue;
      const [cr, cc] = chicken[j];
      min = Math.min(min, Math.abs(hr - cr) + Math.abs(hc - cc));
    }
    sum += min;
  }
  return sum;
};

let ans = Infinity;
const dfs = (idx, chickenCnt) => {
  if (chickenCnt === M) {
    ans = Math.min(ans, getMinDist());
    return;
  }
  for (let i = idx; i < chicken.length; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    dfs(i, chickenCnt + 1);
    visited[i] = false;
  }
};
dfs(0, 0);
console.log(ans);

/*
치킨 거리는 집과 가장 가까운 치킨집 사이의 거리이다.
도시의 치킨 거리는 모든 집의 치킨 거리의 합이다.
임의의 두 칸 (r1, c1)과 (r2, c2) 사이의 거리는 |r1-r2| + |c1-c2|로 구한다.
0은 빈 칸, 1은 집, 2는 치킨집이다.
도시에 있는 치킨집 중에서 최대 M개를 고르고, 나머지 치킨집은 모두 폐업시켜야 한다.
어떻게 고르면, 도시의 치킨 거리가 가장 작게 될지 구하는 프로그램을 작성하시오.
N(2 ≤ N ≤ 50)과 M(1 ≤ M ≤ 13)

처음접근: 치킨집->각 집 최소거리 어떻게 구하지? 효율적인 방법이 있나?
다른사람풀이: 최소거리 구할 때 브루트포스로 해도 시간제한 안 걸린다.
https://velog.io/@ywc8851/%EB%B0%B1%EC%A4%80-15686-%EC%B9%98%ED%82%A8-%EB%B0%B0%EB%8B%AC-javascript
치킨집 선택할 때는 전역에 visited 배열 놓고 dfs
-> 시간초과 -> dfs돌릴 때 idx 매개변수 추가해서, 치킨값 선택하는 경우의 수를 적절히 함
*/
