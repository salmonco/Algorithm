function solution(weights) {
  const obj = {};
  weights.forEach((v) => (obj[v] = obj[v] + 1 || 1));

  let answer = 0;
  const candi = [2 / 3, 3 / 2, 2, 1 / 2, 3 / 4, 4 / 3];
  weights.forEach((v) => {
    if (obj[v] > 1) answer += obj[v] - 1;
    candi.forEach((c) => {
      if (obj[v * c]) answer += obj[v * c];
    });

    obj[v]--;
  });
  return answer;
}

/*
브루트포스 -> n^2
weight 개수 저장해놓고, 반복문 한 번 돌면서 비교하고 해당되는 개수 저장 -> n

2,3,4
2:3
2:4
3:4
*/
