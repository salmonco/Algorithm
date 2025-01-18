const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))
const [A, B, V] = input[0]
const ans = Math.ceil((V-A)/(A-B))+1
console.log(ans)

/*
12:52

0.25초 제한인데, 10^9

2->1
3->2
4->3
5->4

5->4
9->8
13->12
17->16

올라가보고 V보다 크거나 같은지 확인.
밤을 지나고.. 이걸 반복하면 얼마나 걸리지? 계속 반복하기엔 시간초과날 것 같은데.
규칙이 있을지도..?

하루가 지나면 A-B만큼 증가함.

A+ (A-B)n

5 -> 5-5=0 -> 1일
6 -> 6-5=1 -> ceil(1/4)+1 = 2일
9-> 9-5=4 -> ceil(4/4)+1 = 2일
10 -> 10-5=5 -> ceil(5/4)+1 = 3일
13 -> 13-5=8 -> ceil(8/4)+1 = 3일
14 -> 14-5=9 -> ceil(9/4)+1 = 4일

ceil((V-A)/(A-B))+1 만큼 걸림
음.. 숫자가 큰 경우 BigInt 써야 할 거 같은데. 일단 돌려보고 실패하는지 봐야겠다.
*/