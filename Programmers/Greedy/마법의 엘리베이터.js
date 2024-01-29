function solution(storey) {
  const arr = [0, ...[...String(storey)].map(Number)];

  for (let i = arr.length - 1; i > 0; i--) {
    // console.log(arr)
    if (arr[i] < 5 || (arr[i] === 5 && arr[i - 1] < 5)) continue;

    arr[i] = 10 - arr[i];
    arr[i - 1]++;
  }
  return arr.reduce((p, c) => p + c, 0);
}

/*
그리디: 해당 자릿수의 숫자가 5보다 크면 다음 자리의 수에 1 더하고, 원래 자리의 수에 10 뺀 값 저장

반례
# 예3
56
100-56 -> 44-40 -> 4-4 -> 0

# 예1
-10 vs -20 -> 6 vs -4 (2)
4 (4)

# 예2
-2000 vs -3000 -> 554 vs -446 (3)
400 vs 500 -> -46 vs 54 (4)
40 vs 50 -> -6 vs 4 (5)
-4 (4)

최대 8 자릿수라 dfs나 bfs로도 풀이 가능
*/
