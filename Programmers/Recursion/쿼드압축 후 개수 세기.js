function solution(arr) {
  const answer = [0, 0];

  const isSameVal = (x, y, len) => {
    for (let i = x; i < x + len; i++) {
      for (let j = y; j < y + len; j++) {
        if (arr[x][y] !== arr[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  const check = (x, y, len) => {
    if (len === 1 || isSameVal(x, y, len)) {
      return answer[arr[x][y]]++;
    }
    const newLen = len / 2;
    check(x, y, newLen);
    check(x + newLen, y, newLen);
    check(x, y + newLen, newLen);
    check(x + newLen, y + newLen, newLen);
  };

  check(0, 0, arr.length);

  return answer;
}

/*
재귀함수
- 좌표와 범위를 이용해서 푸는 방법 -> 이게 더 간단
- 배열을 가공해서 푸는 방법
*/
