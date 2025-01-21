const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))
const [N] = input[0]
const people = input.slice(1).map((arr, idx) => ([idx, arr]))

const sortedPeople = people.sort((a, b) => b[1][0] - a[1][0])
// console.log(sortedPeople)
const ans = []
for (let i = 0; i < N; i++) {
    const idx = sortedPeople[i][0]
    const [w, h] = sortedPeople[i][1]
    let cnt = 1
    for (let j = 0; j < i; j++) {
        const [prevW, prevH] = sortedPeople[j][1]
        if (prevW > w && prevH > h) cnt++
    }
    ans.push([idx, cnt])
}
console.log(ans.sort((a, b) => a[0] - b[0]).map((v) => v[1]).join(' '))

/*
11:37

1초. 
덩치가 크다->몸무게,키 둘 다 커야 함

88 60 58 55 46
186 175 183 185 155

몸무게 정렬하고, 스캔하면서 키 스캔. N이 최대 50이라 시간 괜찮을 듯

-> 실패. 왜지.
몸무게가 같은 경우. 덩치가 크다고 할 수 없음
65 188
65 183

*/