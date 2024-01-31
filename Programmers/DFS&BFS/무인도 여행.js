function solution(maps) {
  const rowLen = maps.length;
  const colLen = maps[0].length;
  const visited = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );
  const answer = [];
  const dy = [-1, 0, 1, 0];
  const dx = [0, 1, 0, -1];

  const isOut = (a, b) => {
    return a < 0 || a >= rowLen || b < 0 || b >= colLen;
  };

  const find = (a, b, food) => {
    let sum = 0;
    const queue = [{ a, b, food }];

    while (queue.length) {
      const { a, b, food } = queue.shift();
      if (isOut(a, b) || visited[a][b]) continue;
      visited[a][b] = true;
      sum += food;
      // console.log(visited, sum)

      for (let i = 0; i < dy.length; i++) {
        const [x, y] = [a + dy[i], b + dx[i]];
        if (isOut(x, y) || visited[x][y] || maps[x][y] === "X") continue;
        queue.push({ a: x, b: y, food: +maps[x][y] });
      }
    }
    return sum;
  };

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (!visited[i][j] && maps[i][j] !== "X") {
        answer.push(find(i, j, +maps[i][j]));
      }
    }
  }
  return answer.length ? answer.sort((a, b) => a - b) : [-1];
}

/*
BFS

# 예1
["X591X"
,"X1X5X"
,"X231X"
,"1XXX1"]

# 예2
["XXX"
,"XXX"
,"XXX"]
*/
