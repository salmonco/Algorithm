const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))

const ans = []
let line = 0
while (true) {
    const [K, ...candidates] = input[line++]
    if (K === 0) break

    const lottos = []
    for (let i = 0; i < K-5; i++) {
        for (let j = i+1; j < K-4; j++) {
            for (let k = j+1; k < K-3; k++) {
                for (let l = k+1; l < K-2; l++) {
                    for (let m = l+1; m < K-1; m++) {
                        for (let n = m+1; n < K; n++) {
                            lottos.push(`${candidates[i]} ${candidates[j]} ${candidates[k]} ${candidates[l]} ${candidates[m]} ${candidates[n]}`)
                        }
                    }
                }
            }
        }
    }
    ans.push(lottos.join('\n'))
}
console.log(ans.join('\n\n'))

/*
17:40
6개의 수 고르기
dfs? 6중 for문?
*/