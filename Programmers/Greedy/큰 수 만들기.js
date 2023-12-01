function solution(number, k) {
  let removeCnt = 0;
  const newArr = [];

  for (let i = 0; i < number.length; i++) {
    const current = number[i];
    // console.log(current, newArr, removeCnt, i)
    while (newArr.length > 0 && newArr.at(-1) < current && removeCnt < k) {
      newArr.pop();
      removeCnt++;
    }
    if (removeCnt === k) {
      newArr.push(number.substring(i));
      break;
    }
    newArr.push(current);
  }
  const str = newArr.join("");
  if (removeCnt < k) {
    const diff = k - removeCnt;
    return str.slice(0, -diff);
  } else {
    return str;
  }
}

/*
[시도 1]
정렬 후 큰 숫자 순서대로 어느 위치에 있는지 보기
총 10개 - 4 = 6
'8' 자릿수(6) 가부족해서 엑스
'7' 자릿수(5) 안부족 '7' '7252841' 길이가 충분하지
'77' 자릿수(4) '252841' (8, 7)자릿수 부족 '5' 안부족 '52841'
'775' 자릿수(3) '2841' (8) 안부족 
'7758' 자릿수(2) '41' 자릿수와 남은 숫자 길이가 같으면 775841
-> 시간초과

[시도 2]
그리디: 작은 숫자가 큰 숫자보다 앞에 나오면 안 됨
앞에서부터 다음 거랑 비교해서 작으면 삭제, 삭제했으면 인덱스 감소
4177252841
477252841
77252841
7752841
775841

만약 내림차순 정렬되었는데 삭제할 게 남았다 하면 젤 끝에 거 삭제
for문 안에 splice -> 시간초과

[시도 3]
스택 이용 (push, pop)
배열에서 삭제하는 대신, 새로운 배열에 넣어가기
새로운 배열의 가장 마지막 요소랑 현재 값을 비교
*/
