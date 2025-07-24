const TOOL_CNT = 3
const CONTINUE_CNT = 5

const INDEX = {
    diamond: 0,
    iron: 1,
    stone: 2
}

const COST = [
    [1, 1, 1],
    [5, 1, 1],
    [25, 5, 1]
]

function solution(picks, minerals) {
    const [diamondToolCnt, ironToolCnt, stoneToolCnt] = picks
    const queue = [[diamondToolCnt, ironToolCnt, stoneToolCnt, 0, 0]] // minerals index, tired
    let head = 0
    let minTired = Infinity
    
    while (queue.length > head) {
        const [dtc, itc, stc, midx, tired] = queue[head++]
        // console.log({dtc, itc, stc, midx, tired, minTired})
        if (midx === minerals.length || isEmptyTool(dtc, itc, stc)) {
            minTired = Math.min(minTired, tired)
            continue
        }
        
        // use diamond tool
        if (dtc > 0) {
            let newTired = tired
            let newMidx = midx
            for (let i = 0; i < CONTINUE_CNT; i++) {
                if (newMidx >= minerals.length) {
                    break
                }
                newTired += COST[0][INDEX[minerals[newMidx]]]
                newMidx += 1
            }
            if (newTired < minTired) {
                queue.push([dtc-1, itc, stc, newMidx, newTired])
            }
        }
        
        // use iron tool
        if (itc > 0) {
            let newTired = tired
            let newMidx = midx
            for (let i = 0; i < CONTINUE_CNT; i++) {
                if (newMidx >= minerals.length) {
                    break
                }
                newTired += COST[1][INDEX[minerals[newMidx]]]
                newMidx += 1
            }
            if (newTired < minTired) {
                queue.push([dtc, itc-1, stc, newMidx, newTired])
            }
        }
        
        // use stone tool
        if (stc > 0) {
            let newTired = tired
            let newMidx = midx
            for (let i = 0; i < CONTINUE_CNT; i++) {
                if (newMidx >= minerals.length) {
                    break
                }
                newTired += COST[2][INDEX[minerals[newMidx]]]
                newMidx += 1
            }
            if (newTired < minTired) {
                queue.push([dtc, itc, stc-1, newMidx, newTired])
            }
        }
    }
    return minTired
}

const isEmptyTool = (dtc, itc, stc) => {
    return dtc === 0 && itc === 0 && stc === 0
}

/*
최소한의 피로도로 광물 캐기
각 곡괭이 하나에 광물 최대 5개만 캘 수 있음

어떻게 매칭을 하느냐인데
최소비용..그래프..
조합..
일단 그리디는 안 되고. 가능한 경우의 수 다 해봐야 알 것 같음.

*/