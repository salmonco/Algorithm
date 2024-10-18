const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n").map((v) => v.split(' ').map(Number))
const [N] = input[0]
const seq = input[1]
const MAX = 1_000_000
const card = Array.from({ length: MAX+1 }, () => false)
const score = Array.from({ length: MAX+1 }, () => 0)
seq.forEach((v) => card[v] = true)
for (const v of seq) {
    for (let j = v*2; j <= MAX; j += v) {
        if (card[j]) {
            score[v]++
            score[j]--
        }
    }
}
const ans = []
seq.forEach((v) => ans.push(score[v]))
console.log(ans.join(' '))

/*
10:25

3 -> 2+1
4 -> 3+2+1
n -> (n-1)+(n-2)+...+1 -> (n-1)n/2 -> O(n^2)
10^5^2 = 10^10 -> 시간초과 예상

O(nlogn)이나 O(n)만에 구하는 방법이 있나?

스캔하면서 각 수의 약수를 찾아서 배열에 있는지 확인? 만약 1000000의 약수를 찾는다면 스캔할 때 10^5랑 약수찾는 데 시간초과날 듯

젤 작은 수면 점수를 잃는 경우는 없음

다른사람풀이: 에라토스테네스의 체
N명의 player에 대해 카드 번호를 입력받고 i번째 플레이어가 가진 카드가 있다고 표시해주자.
그 다음에는 N명의 player가 가진 카드의 배수에 해당하는 카드가 있는지 확인해주면 된다.
https://kyr-db.tistory.com/391

배수 스캔하는 for문의 시간복잡도가 점차 줄어드는 구조라 정확하겐 모르겠지만 MAX보다는 적게 드는 듯
*/
