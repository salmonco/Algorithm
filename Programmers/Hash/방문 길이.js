function solution(dirs) {
  const obj = {};
  const coord = [0, 0];
  const direct = { U: [0, 1], D: [0, -1], L: [-1, 0], R: [1, 0] };
  const maxCoord = 5;

  for (let i = 0; i < dirs.length; i++) {
    const move = direct[dirs[i]];
    const nextCoord = [coord[0] + move[0], coord[1] + move[1]];
    if (
      nextCoord[0] < -maxCoord ||
      nextCoord[0] > maxCoord ||
      nextCoord[1] < -maxCoord ||
      nextCoord[1] > maxCoord
    )
      continue;

    obj[coord.join("") + nextCoord.join("")] = true;
    obj[nextCoord.join("") + coord.join("")] = true;
    coord[0] += move[0];
    coord[1] += move[1];
  }
  // console.log(obj)
  return Object.keys(obj).length / 2;
}

/*
# 예1
(0,0) (0,1) (-1,1) (-1,2) (0,2) (1,2) (1,1) (0,1) (-1,1) (-1,2)

(시작점,도착점), (도착점,시작점)을 방문 true로 해시에 저장
해시에 저장된 키 개수/2가 중복 제거한 길의 길이가 됨
*/
