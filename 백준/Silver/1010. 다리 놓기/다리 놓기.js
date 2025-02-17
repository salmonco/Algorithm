const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(' ').map(Number))
const [T] = input[0]
const ans = []

const factorial = (n) => {
    if (n <= 1) return 1
    return n*factorial(n-1)
}

const getCombCnt = (m, n) => {
    return factorial(m) / (factorial(m-n) * factorial(n))
}

for (let tc = 0; tc < T; tc++) {
    const [N, M] = input[1+tc]
    const cnt = getCombCnt(M, N)
    ans.push(Math.round(cnt))
}

console.log(ans.join('\n'))

/*
8:45

0.5초. N<=M<30
그냥 mCn * n! 아닌가?
-> 다리끼리는 서로 겹쳐질 수 없다.
그럼 순서가 정해진 거라 봐도 무방할 듯

mCn. 조합 구하기. 어케 구하지.
dfs? 흠.. 근데 개수만 구하면 되는 거 아냐.

m! / ((m-n)! * n!)

소수점이 나옴.. ceil하니 실패.
숫자가 클 수 있으니 BigInt 해줘야 하나? 다른사람풀이보니 안 해줬는데.
round를 해줘야 하나? 근데 왜?

*/