function solution(players, m, k) {
    let totalAddedServerCnt = 0
    let serverCntMapArr = []
    
    players.forEach((userCnt) => {
        const currentServerCnt = getCurrentServerCnt(serverCntMapArr)
        const neededServerCnt = getNeededServerCnt(userCnt, m)
        if (currentServerCnt < neededServerCnt) {
            const addedServerCnt = neededServerCnt-currentServerCnt
            serverCntMapArr.push({ serverCnt: addedServerCnt, remainTime: k })
            totalAddedServerCnt += addedServerCnt
        }
        // update serverCntMapArr
        serverCntMapArr = serverCntMapArr.map(({ serverCnt, remainTime }) => ({ serverCnt, remainTime: remainTime-1 })).filter(({ remainTime }) => remainTime > 0)
    })
    
    return totalAddedServerCnt
}

const getNeededServerCnt = (userCnt, m) => {
    return Math.floor(userCnt / m)
}

const getCurrentServerCnt = (serverCntMapArr) => {
    return serverCntMapArr.reduce((acc, cur) => {
        const { serverCnt } = cur
        return acc + serverCnt
    }, 0)
}

/*
현재 증설된 서버의 수 카운팅

players 돌면서
증설된 서버의 수, 남은 카운트 저장
현재 증설된 서버의 수 계산 가능
현재 증설된 서버의 수보다 필요한 서버의 수가 더 많다면, 차이만큼 증설
*/