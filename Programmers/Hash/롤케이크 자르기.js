function solution(topping) {
  let cnt = 0;
  const el1 = {};
  const el2 = {};
  let cnt1 = 0;
  let cnt2 = 0;

  // 처음에 다 가져가기
  topping.forEach((v) => {
    if (!el1[v]) {
      el1[v] = 1;
      cnt1++;
    } else {
      el1[v]++;
    }
  });

  // 덜어내기
  topping.forEach((v) => {
    if (!el2[v]) {
      el2[v] = 1;
      cnt2++;
    } else {
      el2[v]++;
    }

    el1[v]--;
    if (!el1[v]) {
      cnt1--;
    }

    if (cnt1 === cnt2) cnt++;
  });

  return cnt;
}

/*
부르트포스 -> n^2 -> 시간초과
- 자르기 : n
- 종류 개수 구하고 (비교하기) : n -> 더 줄일 수 있는 방법 찾아야 함

누적합 -> 부르트포스보단 적게 걸리긴 한데, 누적합 배열 만들 때 거의 n^2 -> 시간초과
해시 : 처음에 한 사람이 토핑 다 가진 후 덜어내는 방식 -> n

Hash : (key, value)
- Object
- Map (객체보다 더 많은 기능)
- Set (중복을 허용하지 않음)
*/
