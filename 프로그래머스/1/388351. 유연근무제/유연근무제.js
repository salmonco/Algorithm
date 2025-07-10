function solution(schedules, timelogs, startday) {
    const schedulesSec = schedules.map((s) => {
        return convertToSec(s)
    })
    const timelogsSec = timelogs.map((arr) => {
        return arr.map((t) => {
            return convertToSec(t)
        })
    })
    let notGiftCnt = 0
    // console.log({timelogsSec})
    schedulesSec.forEach((s, i) => {
        for (let j = 0; j < 7; j++) {
            const t = timelogsSec[i][j]
            if (getWeekend(startday).some((w) => w === j)) {
                // 주말이면 스킵
                continue
            }
            if (t > s + 10) {
                notGiftCnt += 1
                // console.log({s,i,t,notGiftCnt})
                break
            }
        }
    })
    return schedules.length - notGiftCnt
}

const convertToSec = (s) => {
    const hour = Math.floor(s / 100)
    const min = s % 100
    return hour*60 + min
}

const getWeekend = (startday) => {
    const sunday = 7 - startday
    if (sunday === 0) {
        return [6, 0]
    }
    return [sunday, sunday-1]
}

/*
00:44

시간복잡도가...
걍 시뮬 돌리면 될 것 같은데..
엣지케이스가.. 있나?

시를 분으로 바꾸기

주말 인덱스 구하기
1 -> 5,6
2 -> 4,5
3 -> 3,4
4 -> 2,3
5 -> 1,2
6 -> 0,1
7 -> 6,0

7 - 시작일
마이너스 1
0이면 6
*/