const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map(Number)
const N = BigInt(input[0])
const SIZE = 6n
const maxRanges = [1n]
const MAX_N = 1_000_000_000n

let depth = 1n
let last = 1n
while (true) {
    const nextRange = last + SIZE*depth
    maxRanges.push(nextRange)
    if (nextRange > MAX_N) {
        break
    }
    last = nextRange
    depth++
}
// console.log(maxRanges)
for (let i = 0; i < maxRanges.length; i++) {
    const range = maxRanges[i]
    if (N <= range) {
        console.log(i+1)
        return
    }
}

/*
9:37

2초. 10^9
육각형 벌집

1
2~7
8~19
20~37
38~61
62~

6
12
18
24
...

6의 배수만큼 증가
1
1+6*1=7
7+6*2=19
...

범위를 알았으니 해당 숫자가 몇 번째 depth에 속하는지 알 수 있을 듯
19->
13->
미리 범위 다 구해놓고 비교해야 할지? 시간복잡도 괜찮나..
일단 미리 범위 다 구해놓고 비교하는 방법으로 시도해보고, 안 되면 바로 숫자를 보고 depth 구할 수 있는 방법을 찾아봐야 할 듯

범위 사이의 숫자 찾을 때, 첨부터 다 스캔하기보다는 이분탐색해서 찾는 게 나을 듯
근데 차피 스캔해도 10^9라 2초 초과는 안 할 듯. 그래서 일단 브루트포스 해보고 혹시나 시간초과나면 이분탐색해야겠다

-> 실패. 왜?
N === range인 경우 놓쳤음
-> 실패. 왜?
MAX_N을 N으로 넣어보니 아무것도 출력되지 않음
-> BigInt로 해야 할 듯
근데 그 외에도 MAX_N이 N인 경우에 대한 처리가 되어있지 않았음

*/