const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number)
const X = input[0]
let limit = 1
let zigzagLine = 1
while (limit < X) {
    zigzagLine++
    limit += zigzagLine
}
const order = zigzagLine-(limit-X)
// console.log(zigzagLine, limit, order)

if (zigzagLine % 2 === 0) {
    console.log(`${order}/${zigzagLine+1-order}`)
} else {
    console.log(`${zigzagLine+1-order}/${order}`)
}

/*
8:39

1/1
1/2 2/1
3/1 2/2 1/3
1/4 2/3 3/2 4/1
5/1 4/2 3/3 2/4 1/5
...

x 번째 분수를 어떻게 찾지?
1, 2, 4, 7, 11, 16

뭔가 규칙이 있을 거 같은데..
합이 n이 되는 첫 번째 인덱스 구해놓고
수 들어오면 그 수랑 가까운 인덱스 찾아서 -> 몇 번째 줄인지 찾아서
그 줄에서 몇 번째에 위치하는지 알면 됨

미리 분기점이 되는 수를 구해놓는다 -> 10^7 까지 숫자. 건너뛰니깐 시간복잡도 괜찮지 않을까?
그 수에 가까운 분기점 찾기 -> 이분탐색?

-> 실패. 왲?
흠. 바로 틀렸다는데. 테케는 통과하는데...반례가 뭐지?

다른사람풀이 보니 뭔가 수학적 규칙을 발견해서 푼 듯
그런 거 발견하기 쉽지 않은데.. 만약 못 발견했다해도 풀 수 있는 방법은 없나?

질문하기 게시판에서 반례를 찾음
6677685 입력으로 넣으면 3656/0 이 출력되는데, 정답은 3654/1 임
leftIdx === midIdx 인데 arr[midIdx] < target 인 경우 midIdx-1를 반환하도록 처리해줌.
-> 실패

몇 번째 줄에, 몇 번째 순서에 위치하는지
규칙 찾는 거 나도 했는데. 근데 식 세워서 바로 구할 수 있대.

*/