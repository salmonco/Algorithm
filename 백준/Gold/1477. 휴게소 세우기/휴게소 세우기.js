const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))
const [N, M, L] = input[0]
const POS = N === 0 ? [] : input[1] // N이 0일 경우 처리
const pos =  [...POS, 0, L].sort((a, b) => a - b)
// console.log({pos})

const getNeedCnt = (maxDist) => {
    let cnt = 0
    for (let i = 1; i < pos.length; i++) {
        const dist = pos[i]-pos[i-1]
        cnt += Math.floor((dist-1)/maxDist) // dist-1 해야 함. ex) 0, 200 사이에 휴게소 하나만 세워도 OK
    }
    return cnt
}

let left = 1
let right = L-1
let ans = 0
while (left <= right) {
    const mid = Math.floor((left+right)/2)
    const needCnt = getNeedCnt(mid)
    if (needCnt > M) {
        left = mid+1
    } else {
        right = mid-1
        ans = mid
    }
}
console.log(ans)

/*
1~799
82 201 411 555 622 755
갭이 많이 나는 곳에 휴게소 심어야 함

갭 많이 나는 곳 찾기
중간 위치 찾기

701-200=501
+250 or 251

시간복잡도 괜찮나?

고속도로의 양 끝에서부터 휴게소까지의 거리도 포함해야 하나?
고속도로 끝을 0, L로 해야 하나?

1~799
82 201 306 411 555 622 755 -> 1
예제 1 왜 70이지? 72 나오는데...

지피티가 말하길
올바른 정답은 70인데,
당신의 그리디는 순차적으로 나누면서 약간씩 반올림이 어긋나
결국 72라는 약간 큰 최대 구간을 남깁니다.

즉, Math.floor(max.gap / 2) 를 단순히 반복 적용하면,
중간 삽입으로 인한 구간 재조정 효과를 고려하지 않게 되고,
결국 전체적으로 "최대값이 최소"가 되는 최적점에 도달하지 못합니다.

이 문제는 그리디로 풀면 틀림입니다.
정답은 이분 탐색으로 “최대 구간의 길이”를 역으로 찾는 것이에요.

-> 최대 구간을 이분탐색으로 찾기
-> 필요한 휴게소 개수랑 M이랑 비교해나가기

그리디로 안 되는 거란 걸 어떻게 인지할 수 있지? 한 쪽으로 치우칠 수 있다는 엣지케이스를 발견하기 쉽지 않을 거 같은데..
이분탐색 접근을 어떻게 하게 된 거지? 사이에 휴게소를 놓으면 그만큼 maxDist도 반쪽이 되는 상황에서.. 뭔가 mid랑 관련되어 있으니 할 수 있는 접근인가?
*/