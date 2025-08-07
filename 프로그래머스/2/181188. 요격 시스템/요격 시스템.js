function solution(targets) {
    const orderedTargets = [...targets].sort((a, b) => b[0] - a[0])
    let pivotX = orderedTargets[0][0]
    let cnt = 1
    orderedTargets.slice(1).forEach((t) => {
        const [s, e] = t
        if (pivotX < e) {
            return
        }
        pivotX = s
        cnt += 1
    })
    return cnt
}

/*
10^5, 10^8

폭격 미사일의 끝점에서는 요격이 안 됨.
그리디로 알 수는 없을 듯.
경우의 수를 해봐야 알 것 같은데, 구간을 나눠봐야 하나?
1 2 3 2 3 2 1 2 3 2 1

전략을 그리디로 짜야 효율적일 거 같은데..
중복 많은 거부터 dfs 돌리기? 시간 괜찮나?
근데 구간이 엄청 많아져서 시간초과 날거같은데.

다른사람풀이 보니 그리디라고 함.
경우의수가 엄청 많아져서 그럴 거 같긴 함. 근데 어떻게 전략을 짜지?

https://chamdom.blog/pg2-181188/
오.. x축의 시작점을 기준으로 내림차순 정렬하고
다음 폭격 미사일의 끝점이랑 비교해서, 기준점이 끝점보다 작으면 요격할 필요X
크거나 같으면 요격 카운트 증가
어떻게 하면 이런 접근을 한 거지. 다른 미사일 간에 시작점이랑 끝점 비교해서 쏠지말지 판단.. 내림차순이라는 전제하에.
*/