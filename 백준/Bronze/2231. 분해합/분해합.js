const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map(Number)
const N = input[0]
const len = String(N).length
const lastDepthCoefficient = 2
let ans = '0'
let recurStop = false

const recur = (depth, target, acc) => {
    if (recurStop) return
    // console.log({depth, target, acc})
    const coefficient = 10**(depth-1) + 1
    const maxRange = Math.floor(target/coefficient)
    const range = Math.min(maxRange, 9)

    if (depth === 1) {
        const last = target/lastDepthCoefficient
        if (last > 9 || !Number.isInteger(last)) return
        ans = acc+last
        return
    }
    
    if (depth === 2) {
        for (let i = range; i >= 0; i--) {
            const last = (target-coefficient*i)/lastDepthCoefficient
            // console.log({i, last})
            if (last > 9) break
            if (!Number.isInteger(last)) continue
            ans = acc+i+last
            recurStop = true
            return
        }
        return
    }
    for (let i = 0; i <= range; i++) {
        const newTarget = target - coefficient*i
        const newAcc = i === 0 ? acc : acc+i
        recur(depth-1, newTarget, newAcc)
    }
}

recur(len, N, '')
console.log(ans)

/*
9:50

2초. 10^6
가장 작은 생성자 구하기
생성자가 될 수 있는 경우의 수를 어떻게 구하지?

245->256
198->216
분배합을 구하는 건 쉬운데, 거꾸로 생성자를 구하려면?

abc->216
생성자는 216보다 작을 테니깐. 세 자리수 이하로 설정.
100a+10b+c+ a+b+c = 216
101a+11b+2c = 216
a,b,c 다 대입을 해보는 수밖에 없나?

-> a의 범위: 0~2
a가 0인 경우, 11b+2c = 216
    -> b의 범위: 0~19, 근데 한 자리수여야 하니 0~9
    b가 9인 경우, c=117/2 -> 한 자리수도 아닐 뿐더러 정수가 아니므로 탈락
    이후에 나오는 것도 한 자리수가 아닐 거므로 stop
a가 1인 경우, 11b+2c = 115
    -> b의 범위: 0~11, 근데 한 자리수여야 하니 0~9
    b가 9인 경우, c=16/2=8
    b가 8인 경우, c=27/2 -> 한 자리수도 아닐 뿐더러 정수가 아니므로 탈락
    이후에 나오는 것도 한 자리수가 아닐 거므로 stop

이거의 시간복잡도를 어떻게 따지지?
최대 6자리수. 한 자리수당 가능한 경우의 수 0부터 9까지로 10개. 따라서 10^6

이걸 코드로 어떻게 구현하지?
자릿수만큼 for문을 돌려야 하나?
런타임에 for문을 중첩해서 n개만큼 돌릴 수 있는 방법. for문 돌릴 수만큼 중첩 배열을 만들어놓고 돌리기? 아님 cnt 저장해놓고 cnt 깎아가면서 남은 개수만큼 for문 돌리기. 또 그걸 코드로 어케 구현하지? 재귀..?

-> 런타임 에러 (StackSizeExceeded)
N이 1이면 무한 재귀에 빠짐. N이 1인 경우 예외처리 해주기

a->5
2a = 5

다른사람 풀이 보니 그냥 브루트포스로 하면 됐었음.
브루트포스로 해도 10^6 * 문자열 각 자리수 스캔해서 더할 때 6만큼 걸려서 괜찮은 듯
처음부터 브루트포스 생각하고 시간복잡도 고려한 이후에 시간초과 예상되면 다른 방법을 생각해봄이 나은 듯

*/