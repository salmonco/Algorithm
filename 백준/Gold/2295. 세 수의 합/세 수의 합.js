const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map(Number)
const N = input[0]
const arr = input.slice(1).sort((a, b) => a - b) // 정렬

const binarySearch = (arr, target) => {
    let left = 0
    let right = arr.length-1
    while (left <= right) {
        const mid = Math.floor((left+right)/2)
        if (arr[mid] === target) {
            return true
        }
        if (arr[mid] < target) {
            left = mid+1
        } else {
            right = mid-1
        }
    }
    return false
}

const xyArr = []
for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        const xy = arr[i] + arr[j]
        xyArr.push(xy)
    }
}
xyArr.sort((a, b) => a - b) // 정렬

for (let i = N-1; i >= 0; i--) {
    for (let j = N-1; j >= 0; j--) {
        const kz = arr[i] - arr[j]
        if (binarySearch(xyArr, kz)) {
            console.log(arr[i])
            return
        }
    }
}

/*
10^3

2 3 5 10 18

이분탐색 문제라는데 어떻게 접근하지?
세 개의 숫자의 합으로 만들 수 있는 수 중에 집합 안에 있으면서 젤 큰 수를 찾는 건데.

이전 문제랑 비슷한 접근으로 만들 수 최대 18이고 반띵해서 9부터 시작해서 세 수 더해서 9 되는 카운트 세는 걸 생각해봤는데 왼쪽 오른쪽 움직이는 기준이 없음

다른 사람 풀이 보니
x + y + z = k
완탐으로 하면 3중 for문이라 시간초과고
x + y = k - z 로 이분탐색 돌리면 된다고 함
어떻게? x+y 배열 구하고 k-z 배열 구해서 그 둘이 같은 수를 갖는 게 있는지 탐색하는데 이때 이분탐색
*/