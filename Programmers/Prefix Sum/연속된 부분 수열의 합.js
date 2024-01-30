function solution(sequence, k) {
  const prefixSum = Array.from({ length: sequence.length + 1 }, () => 0);
  sequence.forEach((v, i) => {
    prefixSum[i + 1] = prefixSum[i] + v;
  });

  let answer = [0, 0];
  let [left, right] = [0, 0];
  let maxLen = Infinity;
  while (left <= right) {
    const sum = prefixSum[right] - prefixSum[left];
    if (sum === k) {
      const len = right - 1 - left;
      if (maxLen > len) {
        answer = [left, right - 1];
        maxLen = len;
      }
    }
    if (sum < k) right++;
    else left++;
  }
  return answer;
}

/*
브루트포스 -> n^2

처음시도: 누적합 for문 + indexOf -> n^2 -> 시간초과
- 누적합 배열 돌면서 k보다 크거나 같은 수가 있으면 그 인덱스(to) 저장
- 그 수에서 k를 뺀 값이 0이면 (0, to)
- 그 값이 누적합 배열에 없으면 continue
- to-from이 이전의 to-from보다 크거나 같으면 continue
- 있으면 (그 값의 인덱스+1, to)

누적합 + 투포인터 -> n
- left, right 인덱스 왔다갔다

# 예1
k=7
[1,3,6,10,15]

# 예2
k=5
[1,2,3,5,8,12,17]

# 예3
k=6
[2,4,6,8,10]
*/
