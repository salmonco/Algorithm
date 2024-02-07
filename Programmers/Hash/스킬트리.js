function solution(skill, skill_trees) {
  let answer = 0;
  const obj = {};
  Array.from(skill).forEach((v, i) => {
    obj[v] = i + 1;
  });

  for (const st of skill_trees) {
    let order = 1;
    // console.log('----', answer)
    for (let j = 0; j < st.length; j++) {
      const s = st[j];
      // console.log(s,order)
      if (!obj[s]) {
        if (j === st.length - 1) answer++;
        continue;
      }
      if (obj[s] !== order) break;
      if (j === st.length - 1) answer++;
      order++;
    }
  }
  return answer;
}

/*
skill 순서를 hash로 저장해놓고
현재 순서 갖고 있다가
skill_trees 각 요소 돌면서 매칭되는 애 있으면 현재 순서랑 같은지 비교

다른 풀이
: 정규식으로 skill에 해당하는 문자만 남겨놓고 replace
skill.indexOf(replace한 문자열)이 0이면 스킬 순서에 맞는 거라고 판단
*/
