const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))
const [N, M] = input[0]
const seq = input[1].sort((a, b) => a- b)
const ans = new Set()

const isNotDesc = (arr) => {
    if (arr.length <= 1) return true
    let temp = arr[0]
    for (let i = 1; i < arr.length; i++) {
        const v = arr[i]
        if (temp > v) return false
        temp = v
    }
    return true
}

const dfs = (arr) => {
    // console.log(arr)
    if (!isNotDesc(arr)) return
    if (arr.length === M) {
        const desc = [...arr].sort((a, b) => b - a)
        if (isNotDesc(arr)) {
            ans.add(arr.join(' '))
        }
        return
    }
    for (let i = 0; i < N; i++) {
        dfs([...arr, seq[i]])
    }
}
dfs([])
console.log([...ans].join('\n'))

/*
13:28

2초.
비내림차순인지 아닌지 판단 어떻게? 내림차순 정렬하고 본래 배열이랑 같으면 내림차순.
-> JSON.stringfy로 하면 시간 오래 걸림 + 111 -> 111 비내림차순인데 내림차순이라 판단됨.
-> 그래서 그냥 내림차순 판단하는 함수 만들기. 스캔.
음 잘못 이해한 듯. 비내림차순 판단하는 함수 만드는 게 더 쉬울 듯.

수열은 사전 순으로 증가하는 순서로 출력해야 한대. -> 배열을 오름차순 정렬한 상태에서 탐색해야 할 듯
근데 그렇게 하면 모든 가능한 경우의 수를 탐색하지 못할 거 같은데.
1 6 3 2 -> 비내림차순이라 가능한 경우.
일단 가능한 경우의 수를 다 구한 상태에서, 오름차순 정렬해서 정답 구해야 하나?
아 근데 차피 숫자 중복으로 고르다보면 오름차순 정렬한 상태에서 탐색해도 상관 없을 듯.

-> 시간초과.
비내림차순이 아닌 걸 일찍이 쳐낸다면?

*/