function solution(book_time) {
  const getTime = (str) => {
    const [hour, minute] = str.split(":");
    return 60 * +hour + +minute;
  };
  const arr = [];
  let cnt = 0;

  book_time = book_time.map(([s, f]) => [getTime(s), getTime(f)]);
  book_time.sort((a, b) => a[0] - b[0]);

  book_time.forEach((bookT) => {
    const [s, f] = bookT;
    const avail = arr.find((v) => v[1] + 10 <= s);
    const idx = arr.indexOf(avail);

    if (idx === -1) cnt++;
    else arr.splice(idx, 1);
    arr.push([s, f]);
  });
  return cnt;
}

/*
- 시작시각 오름차순 정렬
- 배열에 넣으려는 것의 시작시각이 배열에 있는 것의 종료시각보다 +10분 이상인 게 있으면 그거 빼고 넣기
- 아니면 cnt 증가하고 배열에 넣기

# 예1
[["14:10", "19:20"], ["14:20", "15:20"], ["15:00", "17:00"], ["16:40", "18:20"], ["18:20", "21:20"]]

["14:10", "19:20"] 1
["14:10", "19:20"], ["14:20", "15:20"] 2
["14:10", "19:20"], ["14:20", "15:20"], ["15:00", "17:00"] 3
["14:10", "19:20"], ["15:00", "17:00"], ["16:40", "18:20"] 3
["14:10", "19:20"], ["16:40", "18:20"], ["18:20", "21:20"] 3

다른 방법: 겹치는 예약의 최대 개수 구하기
*/
