function solution(cacheSize, cities) {
  const hitTime = 1;
  const missTime = 5;
  const len = cities.length;
  if (cacheSize === 0) return missTime * len;

  const cache = [];
  let answer = 0;
  for (let i = 0; i < len; i++) {
    // console.log(cache)
    const c = cities[i].toLowerCase();
    const idx = cache.indexOf(c);

    if (idx === -1) {
      if (cache.length === cacheSize) cache.shift();
      answer += missTime;
    } else {
      cache.splice(idx, 1);
      answer += hitTime;
    }
    cache.push(c);
  }
  return answer;
}

/*
cacheSize 0이면 5*도시개수 리턴
캐시 배열에서 최근 도시를 뒤에 넣고, 뺄 때는 젤 앞에 거 빼기
- 캐시 배열 안에 해당 도시가 있으면 그 도시 빼고 젤 뒤에 넣기
- 해당 도시가 없는 경우, 캐시가 꽉 찼으면 젤 앞에 거 빼고 뒤에 넣고 아니면 안 빼고 그냥 넣으면 됨

대소문자 구분하지 않음
- 도시 이름을 upperCase or lowerCase로 통일

# 예1
cache: Seoul, NewYork, LA
다 miss

# 예2
cache: Jeju, Pangyo, Seoul
hit: 6
miss: 3

# 예3
다 miss
*/
