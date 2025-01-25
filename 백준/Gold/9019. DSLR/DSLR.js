const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))
const [T] = input[0]
const MAX = 10000

const bfs = (start, target) => {
    const visited = Array.from({ length: MAX }, () => false)
    const queue = [[start, '']]
    let head = 0
    visited[start] = true
    while (queue.length > head) {
        const [n, result] = queue[head++]
        // console.log(n, result)
        if (n === target) {
            return result
        }
        const candidates = [
            { cmd: 'D', newN: 2*n % MAX },
            { cmd: 'S', newN: (n+MAX-1) % MAX },
            { cmd: 'L', newN: (n%1000)*10 + Math.floor(n/1000) },
            { cmd: 'R', newN: (n%10)*1000 + Math.floor(n/10) },
        ]
        for (const { cmd, newN } of candidates) {
            if (visited[newN]) continue
            queue.push([newN, result+cmd])
            visited[newN] = true
        }
    }
}

const ans = []
for (let tc = 0; tc < T; tc++) {
    const [A, B] = input[tc+1]
    const result = bfs(A, B)
    ans.push(result)
}
console.log(ans.join('\n'))


/*
11:16

6초. 가능한 경우의 수를 다 해봐야 할 듯. 수가 같아지면 stop

-> 무한루프에 빠짐. 반복되는 패턴이 있는 거로 보이니, visited 체크
-> 그래도 스택오버플로우남. 계속 DDDDDDDDDDDDDDDD...
뭐지...그럼 어케 풀지..
뭔가 숫자 계산이 잘못됐거나....다른 방법이 있거나..

다른사람풀이보니 n을 문자열로 처리하지 않고 숫자로 처리함.
음 그렇게 할 수도 있겠네. 그렇게 해봐야겠다

1234 -> 2341
0234 -> 2340

dfs로 했는데,,,그냥 bfs로 하는 게 편할 듯.
*/