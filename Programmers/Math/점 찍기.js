function solution(k, d) {
  let cnt = 0;

  for (let i = 0; i <= d; i += k) {
    const maxCoord = Math.floor((d ** 2 - i ** 2) ** (1 / 2));
    cnt += Math.floor(maxCoord / k) + 1;
  }
  return cnt;
}

/*
x, y 증가시켜가면서 브루트포스 -> n^2 -> 시간초과

# 예1
k=2, d=4
for 0 2 4
4 3 0
4/2 3/2 0/2

3+ 2 1 0 = 6

# 예2
k=1, d=5
for 0 1 2 3 4 5
5 4 4 4 3 0

6+ 5+4+4+4+3+0 = 26
*/
