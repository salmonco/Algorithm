function solution(s) {
  const len = s.length;
  let div = 1;
  let answer = len;

  while (div <= len / 2) {
    let temp = "";
    let cnt = 0;
    let result = "";
    for (let i = 0; i < len; i += div) {
      const c = s.substring(i, i + div);
      if (i === 0) {
        temp = c;
        cnt++;
        continue;
      }
      if (temp !== c) {
        result += `${cnt > 1 ? cnt : ""}${temp}`;
        temp = c;
        cnt = 1;
      } else {
        cnt++;
      }
    }
    result += `${cnt > 1 ? cnt : ""}${temp}`;
    // console.log(result)
    if (answer > result.length) {
      answer = result.length;
    }
    div++;
  }
  return answer;
}

/*
브루트포스
1부터 s 길이의 절반까지
*/
