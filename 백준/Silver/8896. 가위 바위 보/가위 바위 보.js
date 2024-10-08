const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
const T = +input[0]

const getLoseHand = (arr) => {
    if (arr.includes('R') && arr.includes('S')) {
        return 'S'
    } else if (arr.includes('R') && arr.includes('P')) {
        return 'R'
    } else if (arr.includes('S') && arr.includes('P')) {
        return 'P'
    }
    return -1
}

let line = 1
const ans = []
for (let i = 0; i < T; i++) {
    const N = +input[line++]
    const robots = []
    const loseRobots = Array.from({ length: N }, () => false)
    for (let j = 0; j < N; j++) {
        const arr = input[line++].split('')
        robots.push(arr)
    }
    for (let i = 0; i < robots[0].length; i++) {
        const rcp = {}
        for (let j = 0; j < N; j++) {
            if (loseRobots[j]) continue
            const hand = robots[j][i]
            rcp[hand] = true
        }
        // console.log(rcp)
        const rcpLen = Object.keys(rcp).length
        if (rcpLen === 3 || rcpLen === 1) continue
        const loseHand = getLoseHand(Object.keys(rcp))
        // console.log(Object.keys(rcp), loseHand)
        for (let j = 0; j < N; j++) {
            if (loseRobots[j]) continue
            const hand = robots[j][i]
            if (hand === loseHand) {
                loseRobots[j] = true
            }
        }
    }
    // console.log(loseRobots)
    const winnerCnt = loseRobots.filter((v) => v === false).length
    if (winnerCnt !== 1) ans.push(0)
    else ans.push(loseRobots.indexOf(false)+1)
}
console.log(ans.join('\n'))

/*
10:58

가위바위보 이긴 로봇 어떻게 알아내지?
    둘을 비교하는 건 쉬운데. 여러 명을 어떻게 비교?
    둘둘씩 비교해서 패한 로봇 아웃시킬까.
    그 전에 R,S,P 세 개가 다 나오거나, 모두 같은 거를 냈으면 무승부 처리
    그럼 어차피 손모양 두 개만 남을 테니까 그 중에 진 손모양을 파악하고 그걸 낸 얘들을 아웃시키면 되겠다
*/
