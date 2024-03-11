function solution(w, h) {
  const slope = h / w;
  let cnt = 0;
  for (let i = 1; i <= w; i++) {
    cnt += Math.ceil(slope * i);
  }
  return (w * h - cnt) * 2;
}

/*
가로:세로 -> 버리는 정사각형수
1:1 -> 1
1:2 -> 2
1:3 -> 3
1:n -> n

2:3 -> 1:1.5 -> 2*2
2:5 -> 1:2.5 -> 3*2

# 예1
8:12 -> 1:1.5 -> 2*8

# 반례1
5:7 -> 1:1.4 -> 2*5 but 실제론 9 = 2*5 - 1

# 반례2
6:8 -> 1:1.333 -> 2*6 but 실제론 11 = 2*6 - 1

# 반례3
3:4 -> 1:1.333 -> 2*3 - 1

최대공약수? -> 잘 이해 못하겠음

기울기 이용
가로길이 1부터 시작해서 한쪽 회색 정사각형 구하기. 그리고 두 배 해주기
*/
