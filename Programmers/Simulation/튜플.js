function solution(s) {
  const sArr = JSON.parse(s.replace(/{/g, "[").replace(/}/g, "]"));
  sArr.sort((a, b) => a.length - b.length);

  const answer = [];
  sArr.forEach((arr) => {
    arr.forEach((v) => {
      if (answer.includes(v)) return;
      answer.push(v);
    });
  });
  return answer;
}

/*
집합을 파싱해서 배열로 만들기
-> 전역 replace, JSON.parse
* js array는 object 타입을 가진다

배열 요소 중 배열 길이 작은 것부터 정답배열에 넣기
하나씩 보면서 정답배열에 포함 안 되는 요소 넣기

다른사람풀이: 배열 돌면서 모든 요소를 넣고 Set으로 중복제거하면 정답이 얻어짐
*/
