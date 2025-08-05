function solution(r1, r2) {
    let cnt = 0
    cnt += r2 - r1 + 1
    
    for (let i = 1; i < r2; i++) {
        const maxY = Math.floor((r2**2 - i**2)**(1/2))
        const minY = Math.ceil((r1**2 - i**2)**(1/2))
        if (i < r1) {
            cnt += maxY - minY + 1
            continue
        }
        cnt += maxY
    }
    return cnt*4
}

// const isInCircle = (r1, r2, x, y) => {
//     const dist = x**2 + y**2
//     return dist <= r2**2 && dist >= r1**2
// }

/*
10^6

범위: 큰 네모 - 작은 네모
범위 제한해서, 가능한 점 경우의 수 구하고, 반지름 거리 비교해서 카운트?
시간 괜찮나?
원은 대칭이라서. 반쪽만 봐도 되지 않을까?
-> 시간초과

시간 어케 줄이지?
4분의 1만 봐도 되지 않을까?
-> 그래도 시간초과

수학적으로 접근해보면..
특정 x 좌표에서 반지름 이용해서 가능한 y 좌표 구하기.
*/