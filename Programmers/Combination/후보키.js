function solution(relation) {
  const rowLen = relation.length;
  const colLen = relation[0].length;
  const candiKey = [];
  const combi = [[]];
  for (let i = 0; i < colLen; i++) {
    combi.forEach((v) => {
      combi.push([...v, i]);
    });
  }
  combi.sort((a, b) => a.length - b.length);
  for (let i = 1; i < combi.length; i++) {
    const cols = combi[i];
    if (candiKey.some((ck) => ck.every((v) => cols.includes(v)))) continue;
    const tuples = relation.map((v) =>
      cols.reduce((p, col) => `${p},${v[col]}`, "")
    );
    if ([...new Set(tuples)].length === rowLen) {
      candiKey.push(cols);
    }
    // console.log(cols, tuples, candiKey, [...new Set(tuples)])
  }
  return candiKey.length;
}

/*
모든 키 인덱스 조합 생성. 작은 개수의 키 조합부터 후보키 되는지 확인
후보키 조합을 모두 포함하는 키 조합은 건너뛰기

인덱스 0부터 시작해서 있다/없다
[]
[0] []
[0,1] [0] [1] []
[0,1,2] [0,1] [0,2] [0] [1,2] [1] [2] []
*/
