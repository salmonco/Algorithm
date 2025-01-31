const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number)
const N = input[0]
const MAX = 4_000_000

const isPrime = (n) => {
    if (n === 2 || n === 3) return true
    for (let i = 2; i <= Math.floor(n**(1/2)); i++) {
        if (n % i === 0) return false
    }
    return true
}

const primes = []
for (let i = 2; i <= MAX; i++) {
    if (isPrime(i)) primes.push(i)
}
// console.log(primes[primes.length-1])
// if (primes[primes.length-1] < N) {
//     console.log(0)
//     return
// }

let left = 0
// let right = 0
let right = 1
let sum = primes[left]
let cnt = 0
// while (left < primes.length && right < primes.length) {
//     // console.log({left, right, sum, cnt})
//     if (sum < N) {
//         if (right === primes.length-1) break
//         sum += primes[++right]
//         continue
//     }
//     if (sum === N) cnt++
//     if (primes[left] >= N) break
//     sum -= primes[left++]
// }
while (left < primes.length && right < primes.length) {
    if (sum <= N) {
        if (sum === N) cnt++;
        sum += primes[right++];
    } else {
        sum -= primes[left++];
    }
}
if (primes[primes.length - 1] === N) cnt++;
console.log(cnt)

/*
13:15

뭔가 중복이 생길 거 같은 느낌이 dp인데..
2초. 10^6
2 -> 1
3 -> 1
4 -> 2,2 -> 0
5 -> 2,3 -> 2
6 -> 2,4 / 3,3 -> 0
7 -> 2,5 / 3,4 -> 2
8 -> 
소수가 아닌 수의 합은 굳이 따질 필요 없을 듯
연속된 소수만을 보는 게 낫나?

2
2+3=5
2+3+5=10
2+3+5+7=17
...
3
3+5=8
3+5+7=15
3+5+7+11=26
...
5
5+7=12
이걸 다 하면... n(n+1)/2
10^6^2. 2초라 괜찮을 듯..?
연속인 소수라 dp 쓰기에도 애매한데..
근데 이럴거면 브루트포스 먼저 생각나고 시간초과될 거 같은 다른방법 생각해봄이 나았을텐데
이전에도 그랬었는데 나 왜 그랬지? 단순하게 어떻게 풀지를 생각하다보면 기본기에 벗어난 생각이 깊어지는 부작용이 있다..

일단 소수인 수를 찾아내야 함.
소수배열 구하고 이중포문 돌리기
-> 실패.

4_000_000 넣어보니 암것도 출력 안 됨. BigInt 써야 할 듯.
3999972부터 출력 안 됨.
그냥 sum >= N일 때가 없는 경우가 있어서 출력 안 된 거 같은데.
그런 경우 없으면 걍 0 출력해주기.
-> 실패

다른사람풀이보니 연속된 소수니깐 윈도우 사이즈 조절해가며 투포인터로 하는 방법이 있었음.
2 3 5 7 11 13 17 19 23 27
left,right 0,0 에서 right++해가다가
sum >= N이면 더이상 right++할 필요없음. left++
primes[left] >= N이면 더이상 left++할 필요없음. stop
-> 실패. 왜지.
right이 배열의 범위를 초과하는 경우가 있다네.
-> 실패. 다른 원인인가. 뭔가 로직이 헷갈린다

설마 소수 구하는 부분이 틀린 건가.... 에라토스테네스의 체를 쓰는 게 시간절약한대
근데 차피 구해진 소수는 같을 거 아냐.
-> 에라토스테네스의 체로 해도 실패.
그럼 이후 로직의 문제라는 게 명확해졌고.. 근데 뭐가 문제인지 이해가 안 감.



*/