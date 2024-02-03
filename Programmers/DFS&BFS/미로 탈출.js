function solution(maps) {
  const yLen = maps.length;
  const xLen = maps[0].length;
  const dy = [-1, 0, 1, 0];
  const dx = [0, 1, 0, -1];

  const isOut = (a, b) => a < 0 || a >= yLen || b < 0 || b >= xLen;

  const findDist = (source, target) => {
    const visited = Array.from({ length: yLen }, () =>
      Array.from({ length: xLen }, () => false)
    );
    const queue = [[source[0], source[1], 0]];

    while (queue.length) {
      const [y, x, depth] = queue.shift();
      // console.log(y,x,visited,source)
      // visited[y][x] = true
      // if (y === target[0] && x === target[1]) {
      //     return depth
      // }

      for (let i = 0; i < dy.length; i++) {
        const [py, px] = [y + dy[i], x + dx[i]];
        if (isOut(py, px) || visited[py][px] || maps[py][px] === "X") continue;
        if (py === target[0] && px === target[1]) {
          return depth + 1;
        }
        queue.push([py, px, depth + 1]);
        visited[py][px] = true;
      }
    }
    return 0;
  };

  let start, lever, end;
  for (let i = 0; i < yLen; i++) {
    for (let j = 0; j < xLen; j++) {
      if (maps[i][j] === "S") start = [i, j];
      else if (maps[i][j] === "L") lever = [i, j];
      else if (maps[i][j] === "E") end = [i, j];
    }
  }
  const dist1 = findDist(start, lever);
  if (dist1 === 0) return -1;
  const dist2 = findDist(lever, end);
  return dist2 === 0 ? -1 : dist1 + dist2;
}

/*
bfs
몇 번째에 도착지점에 도착하는지 트래킹 -> depth

visited true를 for문 밖에 넣으니 시간초과
-> queue에 추가하려고 할 때 조건 처리해주는 게 시간 줄일 수 있음

# 예1
["SOOOL"
,"XXXXO"
,"OOOOO"
,"OXXXX"
,"OOOOE"]
S->L
L->E

# 예2
["LOOXS"
,"OOOOX"
,"OOOOO"
,"OOOOO"
,"EOOOO"]	
*/
