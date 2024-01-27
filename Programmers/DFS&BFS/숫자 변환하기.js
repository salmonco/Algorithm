function solution(x, y, n) {
  let min = Infinity;
  const queue = [{ target: y, cnt: 0 }];

  while (queue.length) {
    const { target, cnt } = queue.shift();
    if (target === x) {
      min = Math.min(min, cnt);
      break;
    }
    if (target < x) continue;
    if (Number.isInteger(target / 2)) {
      queue.push({ target: target / 2, cnt: cnt + 1 });
    }
    if (Number.isInteger(target / 3)) {
      queue.push({ target: target / 3, cnt: cnt + 1 });
    }
    queue.push({ target: target - n, cnt: cnt + 1 });
  }

  return min === Infinity ? -1 : min;
}

/*
y->x 찾아가기
bfs. queue를 사용. y랑 x가 가장 처음 같아지는 경우가 최소 연산 횟수가 됨. 그 다음은 볼 필요 없음.
*/
