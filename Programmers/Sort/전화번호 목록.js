function solution(phone_book) {
  const sortedArr = phone_book.sort();
  for (let i = 0; i < sortedArr.length - 1; i++) {
    const current = sortedArr[i];
    const next = sortedArr[i + 1];
    if (next.indexOf(current) === 0) {
      return false;
    }
  }
  return true;
}

/*
[시도 1]
문자열 길이 작은 순서대로 정렬
12, 88, 123, 567, 1235
시간복잡도 n(n-1)/2 최대 10^6(10^6 -1) / 2 -> 시간초과

[시도 2]
문자열 사전식 정렬
["1", "2", "3", "10"] -> ["1", "10", "2", "3"]
현재 요소에서 다음 인덱스의 요소만 비교해주면 됨
시간복잡도 n. 최대 10^6
*/
