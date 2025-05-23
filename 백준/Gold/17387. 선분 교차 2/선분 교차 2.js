const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n").map((v) => v.split(' ').map(Number))
const [x1, y1, x2, y2] = input[0]
const [x3, y3, x4, y4] = input[1]

const ccw = (x1, y1, x2, y2, x3, y3) => {
    const cross = (x1*y2 + x2*y3 + x3*y1) - (x2*y1 + x3*y2 + x1*y3)
    if (cross > 0) {
        return 1
    }
    if (cross === 0) {
        return 0
    }
    return -1
}

const flagA = ccw(x1, y1, x2, y2, x3, y3) * ccw(x1, y1, x2, y2, x4, y4)
const flagB = ccw(x3, y3, x4, y4, x1, y1) * ccw(x3, y3, x4, y4, x2, y2)
// console.log({flagA, flagB})
if (flagA === 0 && flagB === 0) {
    if (Math.min(x1, x2) <= Math.max(x3, x4) && Math.max(x1, x2) >= Math.min(x3, x4)
       && Math.min(y1, y2) <= Math.max(y3, y4) && Math.max(y1, y2) >= Math.min(y3, y4)) {
        console.log(1)
    } else {
        console.log(0)
    }
    return
}

if (flagA <= 0 && flagB <= 0) {
    console.log(1)
} else {
    console.log(0)
}

/*
23:30

0.25초. 10^6

두 선분이 교차하는지 아닌지. 교차하면 1, 아니면 0
평행한지 아닌지를 보면 될 듯. 아닌데. 직선이 아니니깐.. 길이가 있으니깐..
수학적인 접근을 해야 함. 쳐낼 수 있는 건 쳐내고.
- 두 점이 같은 위치에 있는 경우 -> 교차
- 한 점이 한 선분의 직선의 방정식 위에 있고 범위 내에 있는 경우 -> 교차 -> 계산하기 어렵겠다..
- 평행인 경우 (기울기 같은 경우) -> 교차X
- 한 선분의 직선의 방정식과 다른 한 선분의 직선의 방정식에서 정수인 해를 찾을 수 있는 경우 -> 교차

다른사람풀이 보니, ccw를 이용했다고 함
전에 들어본 적 있는데 뭐였더라.. 신발끈?
CCW는 Counter Clockwise의 약자로써, 평면 위에 놓여진 세 점의 방향관계를 구할 수 있는 알고리즘이다.
(+) 반시계, (0) 일직선, (-) 시계

ccw의 곱이 둘 다 0 일때, 선분이 포개어져 있는 경우 교차하는 것으로 판단. 이 케이스 주의
참고한 풀이: https://wondev.tistory.com/222

규칙을 찾아보자면 그렇대.. 피그마에 케이스 그려보니깐 뭔가 규칙이 있긴 함
근데 어떻게 해서 그 규칙에 접근했는지는 모름
*/