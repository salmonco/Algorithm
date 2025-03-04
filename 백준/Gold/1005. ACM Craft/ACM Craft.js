const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(' ').map(Number))
const [T] = input[0]

const bfs = (target, graph, times, indegrees) => {
    const max = [...times]
    const queue = []
    let head = 0

    for (let i = 1; i <= times.length-1; i++) {
        if (indegrees[i] === 0) {
            queue.push(i)
        }
    }
    
    while (queue.length > head) {
        const c = queue[head++]
        // console.log({c, queue, max})
        for (const n of graph[c]) {
            const newT = max[c]+times[n]
            max[n] = Math.max(max[n], newT)
            indegrees[n]--
            if (indegrees[n] === 0) {
                queue.push(n)
            }
        }
    }
    return max[target]
}

const ans = []
let line = 1
for (let tc = 0; tc < T; tc++) {
    const [N, K] = input[line++]
    const times = [0, ...input[line++]]
    const graph = Array.from({ length: N+1 }, () => [])
    const indegrees = Array.from({ length: N+1 }, () => 0)
    for (let i = 0; i < K; i++) {
        const [X, Y] = input[line++]
        graph[X].push(Y)
        indegrees[Y]++
    }
    const [W] = input[line++]
    const min = bfs(W, graph, times, indegrees)
    ans.push(min)
}
console.log(ans.join('\n'))

/*
15:20

1초. 동시에 건물 짓기 가능. 최소시간.
선수과목이 있는 그래프. 근데 뭔 알고리즘이었는지 정확히 기억나지 않음.

일단 그래프에 담아. X -> Y
1->2
1->3
2->4
3->4
타깃이 4니깐. 역순으로 타고가는 게 낫겠다.
[[4, 10]]
max[4]=10
4를 지으려면 2,3을 먼저 지어야 해.
[[2, 11], [3, 110]]
max[2]=11
max[3]=110
2를 지으려면 1을 지어야 해.
[[3, 110], [1, 21]]
max[1]=21
3을 지으려면 1을 지어야 해.
[[1, 21], [1, 120]]
max[1]=max(max[1], 120)=120
1을 지으려면...연결이 없네. 최소값 저장. ans=min(Infinity, max[1])=120


    30     10 100
        40            10
``10      90 50

110 -> 150
140 -> 180
단순하게 생각해서, 그냥 한 지점에 대해 걸리는 시간을 최대값으로 저장해놨다가,
다른 경로로 타고타고 갈 때 그 최대값 이용해서 계산하고,
더이상 연결 없는 지점이면 최소값 저장

테케2도 시뮬해보자.
[[7, 1]]
max[7]=1
7을 지으려면 5,6을 지어야 해.
[[5, 9], [6, 8]]
max[5]=9
max[6]=8
5를 지으려면 2를 지어야 해.
[[6, 8], [2, 29]]
max[2]=29
6을 지으려면 3을 지어야 해.
[[2, 29], [3, 9]]
max[3]=9
2를 지으려면 1을 지어야 해.
[[3, 9], [1, 39]]
max[1]=39
3을 지으려면 1을 지어야 해.
[[1, 39], [1, 19]]
max[1]=max(max[1], 19)=39
1을 지으려면...연결이 없네. 최소값 저장. ans=min(Infinity, max[1])=39

예제2도 해보자.
[[1, 1]]
max[1]=1
1을 지으려면 2를 지어야 해.
[[2, 3]]
max[2]=3
2를 지으려면 3을 지어야 해.
[[3, 6]]
max[3]=6
3을 지으려면..연결이 없네. ans=min(Infinity, max[3])=6

[[4, 99994]]
max[4]=99994
4를 지으려면 3,2를 지어야 해.
[[3, 99994+99997], [2, 99994+99999], [1, 99994+100000]]
max[3]=99994+99997
max[2]=99994+99999
max[1]=99994+100000
3을 지으려면 2,1를 지어야 해.
[[2, 99994+99999], [1, 99994+100000], [2, 99994+99997+99999], [1, 99994+99997+100000]]
max[2]=max(99994+99999, 99994+99997+99999)=99994+99997+99999
max[1]=max(99994+100000, 99994+99997+100000)
2를 지으려면 1을 지어야 해.
[[1, 99994+100000], [2, 99994+99997+99999], [1, 99994+99997+100000], [1, 99994+99999+100000]]
max[1]=99994+99999+100000
2를 지으려면 1을 지어야 해.
중복.

그래프, 큐, max 저장
연결 더이상 없으면 min 저장

답은 399990인데, 299993이 출력됨...
큐에 함께 넣는 t의 필요성에 대한 의문. 그냥 max[2]+max[1]하면 안 되나? 그럼 될 거 같은데..

-> 테케는 통과. 근데 메모리 초과.
뭔가 중복이 생기는 것 같다. 빠르게 stop할 수 있는 방법?
새로 계산한 max가 기존 max보다 작으면 굳이 큐에 넣을 필요 없을 듯
-> 시간초과. 뭐지.
아님 연결 없으면 바로 stop해줘도 되나...?
내가 짜놓은 코드의 프로세스를 정확하게 모르겠다.
왜 이렇게 짰는지 확실히 이해되지 않은채로 느낌에 따라 짰다.
그래서 어디서 시간이 오래 걸리는지 파악이 어려운 상태.

bfs라서 depth가 꼬이지 않아서. 3depth->2depth->1depth 이렇게 가서
바로 stop해줘도 나머지 depth를 못보고 가는 일이 없을 거 같다.
-> 근데 4%에서 실패.

다른사람풀이 찾아보니..이 선수과목을 위상정렬이라 했었군.
오. dp. 내가 푼 방법이랑 비슷한데.
그냥 목표로 한 건물의 dp 출력하면 되구나.
아 그럼. 나는 그래프 역순으로 타고갔는데, 걍 정순으로 타고가서 목적지 dp 출력하면 되는...
그방법이 더 쉽겠네.... 첨에 dp 생각 못해서 어케 목적지까지 걸리는 시간 알지
막막해서 역순으로 타고가는 방법을 생각했던 건데, 최대값을 쌓다보면 되겠네...

-> 메모리초과. 왜지.
큐를 head로 관리하지말고 요소를 그냥 삭제할까?
-> 그러면 시간초과.



선수과목. 위상정렬. dp. indegree 관리
*/