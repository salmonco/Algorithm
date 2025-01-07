const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))
const [N, M, B] = input[0]
const map = input.slice(1).flat().sort((a, b) => b - a)
const minHeight = Math.min(...map)
const maxHeight = Math.max(...map)
const candidates = Array.from({ length: maxHeight-minHeight+1 }, (_, i) => minHeight+i)
candidates.sort((a, b) => b - a)
let ans = Infinity
let height = 0
let inventory = B

for (const h of candidates) {
    let sum = 0
    let available = true
    inventory = B
    for (const v of map) {
        // console.log({h, v, sum, inventory})
        if (h === v) {
            continue
        }
        const diff = Math.abs(h-v)
        if (h < v) {
            // 블럭 제거해야 함
            sum += diff*2
            inventory += diff
            continue
        }
        // 블럭 추가해야 함
        if (inventory < diff) {
            available = false
            break
        }
        sum += diff
        inventory -= diff
    }
    // console.log({available, sum, ans, height, h})
    if (!available) {
        continue
    }
    if (sum >= ans) {
        break
    }
    ans = sum
    height = h
}
console.log(ans, height)

/*
9:30

땅의 높이를 동일하게 만들기
제거하면 2초, 추가하면 1초 걸림
최소 시간, 시간이 같다면 땅의 높이가 가장 높은 것

0 0 0 1
2 2 3 0
0 1 4 3

0 -> 16*2 = 32
1 -> 5 + 9*2 = 23
2 -> 12 + 4*2 = 20
3 -> 15+4+2+1*2 = 23
4 -> 20+6+4+2 = 32
제거하는 것보다 추가하는 쪽이 항상 시간이 짧은 것도 아님. 그리디로 생각하기 어려운 듯
땅의 높이를 얼마로 설정해야 최소 시간이 되는지. 땅 높이 대입해 보면서 일일이 따져봐야 하나?
땅 높이로 가능한 경우의 수는 0부터 256까지로, 257가지, 약 10^2
땅을 스캔하는 데 500*500=250000, 약 10^5
10^5 * 10^2 = 10^7 애매하다. 걍 해볼까? 아님 시간단축할 요소가 있나?

후보 높이를 내림차순 정렬해서, 답보다 커지면 스톱해도 될 듯? 제거하면서 시간 계속 불어나니.
남은 인벤토리가 없으면 블럭 추가하지 못함. 제거할 때 인벤토리에 블럭 넣어야 함.
-> 실패. 왜지?
3 4 21 -> 23 3
3 4 20 -> 32 0 원하는 답이 아님

블럭 제거/추가하는 개수만큼 인벤토리 수량 관리해야 함.
땅의 높이 달라질 때마다 인벤토리 초기화해줘야 함.
-> 실패. 왜지?

블럭 제거하는 작업을 먼저 해서 인벤토리를 확보한 상태에서 블럭 추가해줘야 하나?
map 순서는 상관 없어 보임. 땅 높이 높은 순으로 정렬. flat해도 상관 없을 듯.
-> 실패. 왜지? 반례가 뭘까...
1 3 68
0 0 1
-> 2 1 이어야 하는데 2 0이 나옴.
sum > ans에서 등호를 넣어줘야 함.

3 4 11
29 51 54 44
22 44 32 62
25 38 16 2
-> 250 35 이어야 하는데 268 32이 나옴.
후보 높이에는 현재 땅의 높이들만 해당하는 게 아님. 주어진 초기 땅의 높이와 다른 높이가 될 수도 있음.
가능한 최소 시간 범위가 초기 땅의 높이에서 가장 작은 것부터 가장 큰 거 사이의 연속된 값 모두인 듯. 그보다 작거나 크면 오히려 시간만 늘어나므로.

*/