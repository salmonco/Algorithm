function solution(arrayA, arrayB) {
  const getGCD = (a, b) => {
    return b ? getGCD(b, a % b) : a;
  };

  let gcdA = arrayA[0];
  for (let i = 1; i < arrayA.length; i++) {
    gcdA = getGCD(gcdA, arrayA[i]);
  }

  let gcdB = arrayB[0];
  for (let i = 1; i < arrayB.length; i++) {
    gcdB = getGCD(gcdB, arrayB[i]);
  }

  const aA = arrayB.some((v) => v % gcdA === 0) ? 0 : gcdA;
  const aB = arrayA.some((v) => v % gcdB === 0) ? 0 : gcdB;
  return Math.max(aA, aB);
}

/*
방법 1
- 카드들에 적힌 모든 숫자를 나눌 수 있는 a의 범위 : 그 카드들 중 최솟값부터 2까지
- 큰 값부터 봐서 조건에 해당하면 바로 리턴
every, some 반복문을 변수 대신 인라인으로 넣어야 시간초과가 안 남. why?

방법 2
- 최대공약수만 구해서 비교하기 (어차피 최대공약수로 안 나누어떨어지면 그 약수들로도 안 나누어떨어짐)
*/
