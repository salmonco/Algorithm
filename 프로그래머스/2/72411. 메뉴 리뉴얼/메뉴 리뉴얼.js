function solution(orders, course) {
    const maxCourseCnt = Math.max(...course)
    const cnt = {}
    orders = orders.map((str) => [...str].sort().join(''))
    orders.forEach((str) => {
        const map = {}
        for (let i = 0; i < str.length; i++) {
            const s = str[i]
            dfs(str, i, s, maxCourseCnt, map)
        }
        Object.keys(map).forEach((k) => {
            cnt[k] = cnt[k]+1 || 1
        })
    })
    // console.log({cnt})
    const filteredCnt = Object.entries(cnt).filter(([k, v]) => {
        return course.includes(k.length) && v >= 2
    })
    // console.log({filteredCnt})
    const ans = []
    course.forEach((c) => {
        const filtered = filteredCnt.filter(([k, v]) => k.length === c)
        const maxCnt = Math.max(...filtered.map(([, v]) => v))
        const keys = filtered.filter(([, v]) => v === maxCnt).map(([k]) => k)
        ans.push(...keys)
    })
    return [...ans].sort()
}

const dfs = (str, idx, result, maxCourseCnt, map) => {
    // console.log({str, idx, result})
    if (result.length > 1) {
        map[result] = 1
    }
    if (result.length >= maxCourseCnt) {
        return
    }
    for (let i = idx+1; i < str.length; i++) {
        const s = str[i]
        dfs(str, i, result+s, maxCourseCnt, map)
        dfs(str, i, result, maxCourseCnt, map)
    }
}

/*
코스요리 메뉴 최소 2가지 이상의 단품메뉴로 구성
최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합

배열 돌면서 조합을 다 저장해놓으면? 카운트 증가시켜서.
시간 괜찮나? 20 * 10 * 10 정도같은데 괜찮을 듯

문제 이해가 잘 안 감..
질문하기 게시판 보고 알았음. 단품메뉴 조합 개수가 같은 거 중에선 가장 많이 주문받은 것만 코스요리로 제공하는 거였음.
*/