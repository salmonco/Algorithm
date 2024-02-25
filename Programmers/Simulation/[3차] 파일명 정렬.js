function solution(files) {
  const arr = [];
  for (let i = 0; i < files.length; i++) {
    const v = files[i];
    const idx = v.search(/[0-9]/);
    const head = v.slice(0, idx);
    const rest = v.slice(idx);
    // console.log('rest', rest)
    const idx2 = rest.search(/[^0-9]/);
    let number = idx2 === -1 ? rest : rest.slice(0, idx2);
    let tail = idx2 === -1 ? "" : rest.slice(idx2);
    // console.log('------', number, tail)
    if (number.length > 5) {
      number = number.slice(0, 5);
      tail = number.slice(5) + tail;
    }
    // console.log(head, number, tail)
    arr.push([v, head.toUpperCase(), +number, tail]);
  }

  arr.sort((a, b) => (a[1] === b[1] ? a[2] - b[2] : a[1].localeCompare(b[1])));
  // console.log(arr)
  return arr.map((v) => v[0]);
}

/*
sort 문자열 비교 시 특수문자 때문에 NaN
-> a.localeCompare(b)

유의할 사항: 파일명이 숫자로 끝날 경우, number 부분을 제대로 찾지 못했음
search() 인덱스 못 찾으면 -1 반환

다른사람풀이: 정규식, match
*/
