function solution(expression) {
  const calculate = (expr, a, b) => {
    if (expr === "*") return a * b;
    if (expr === "+") return a + b;
    if (expr === "-") return a - b;
  };

  const search = (expr, arr) => {
    let newArr = arr;
    while (true) {
      const temp = [];
      const index = newArr.indexOf(expr);
      if (index === -1) break;

      for (let i = 0; i < newArr.length; i++) {
        const c = newArr[i];
        if (i < index - 1 || i > index + 1) {
          temp.push(c);
        } else if (i === index - 1) {
          const cal = calculate(expr, newArr[index - 1], newArr[index + 1]);
          temp.push(cal);
        }
      }
      newArr = temp;
    }
    return newArr;
  };

  const candi = [
    ["*", "+", "-"],
    ["*", "-", "+"],
    ["+", "*", "-"],
    ["+", "-", "*"],
    ["-", "*", "+"],
    ["-", "+", "*"],
  ];
  const exprArr = [];
  let str = "";
  for (let i = 0; i < expression.length; i++) {
    const c = expression[i];
    if (c === "*" || (c === "+") | (c === "-")) {
      exprArr.push(+str);
      exprArr.push(c);
      str = "";
      continue;
    }
    str += c;
  }
  exprArr.push(+str);
  let answer = 0;
  // console.log(exprArr)
  for (let i = 0; i < candi.length; i++) {
    const exprs = candi[i];
    let arr = exprArr;
    exprs.forEach((v) => {
      arr = search(v, arr);
    });
    // console.log(exprs, arr)
    answer = Math.max(answer, Math.abs(arr[0]));
  }
  return answer;
}

/*
우선순위의 6가지 경우의 수 다 해보기

# 예2
* > + > -
[50, *, 6, -, 3, *, 2]

search *
index 1 -> [300, -, 3, *, 2]
index 3 -> [300, -, 6]

search +
index -1 -> 없음

search -
index 1 -> [294] -> 길이가 1이라 끝남

- > * > +
[50, *, 6, -, 3, *, 2]

search -
index 3 -> [50, *, 3, *, 2]

search *
index 1 -> [150, *, 2]
index 1 -> [300] -> 길이가 1이라 끝남

그중 절댓값이 젤 큰 거 리턴
*/
