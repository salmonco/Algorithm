function solution(friends, gifts) {
    const counts = {}
    
    friends.forEach((f) => {
        counts[f] = [0, 0, 0, []] // 준, 받은, 추가, 준 친구
    })
    
    gifts.forEach((g) => {
        const [from, to] = g.split(' ')
        counts[from][0] += 1
        counts[to][1] += 1
        counts[from][3].push(to)
    })
    // console.log(counts)
    for (let i = 0; i < friends.length-1; i++) {
        const f1 = friends[i]
        for (let j = i+1; j < friends.length; j++) {
            const f2 = friends[j]
            const sendCountF1 = counts[f1][3].filter((f) => f === f2).length
            const sendCountF2 = counts[f2][3].filter((f) => f === f1).length
            if (sendCountF1 > sendCountF2) {
                counts[f1][2] += 1
            } else if (sendCountF1 < sendCountF2) {
                counts[f2][2] += 1
            } else {
                // 선물지수 계산
                const gidxF1 = counts[f1][0] - counts[f1][1]
                const gidxF2 = counts[f2][0] - counts[f2][1]
                if (gidxF1 > gidxF2) {
                    counts[f1][2] += 1
                } else if (gidxF1 < gidxF2) {
                    counts[f2][2] += 1
                }
            }
        }
    }
    // console.log(counts)
    let maxCount = 0
    friends.forEach((f) => {
        maxCount = Math.max(maxCount, counts[f][2])
    })
    return maxCount
}

/*
23:33
선물 더 많이 준 사람이 선물 하나 받기
선물 주고받은 적 없거나 선물 준 개수 같은지?
선물지수 누가 더 높은지? 그것마저 똑같다면 선물 주고받지x

시간복잡도 계산해봐야 할 거 같은데, 시간제한이 어케되는거지? 안 나와있음. 뭐지?

name 을 key 로 갖는 객체에 준 선물 개수, 받은 개수 저장해놓고 계산하면 될 듯?
친구 배열 돌면서 개수 비교. 같거나 주고받은 적 없으면 선물지수 계산.
아.. 누가 누구에게 줬는지도 저장해야 하구나.
*/