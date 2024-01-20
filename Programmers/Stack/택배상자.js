function solution(order) {
  const len = order.length;
  const stack = Array.from({ length: len }, (_, i) => len - i);
  const secondStack = [];
  let i = 0;

  while (stack.length || secondStack.length) {
    // console.log(stack, secondStack, i)
    if (!stack.length) {
      if (secondStack.at(-1) !== order[i]) break;
      else {
        secondStack.pop();
        i++;
      }
    } else {
      if (stack.at(-1) !== order[i]) {
        if (secondStack.at(-1) !== order[i]) {
          if (stack.length === 1) break;
          else secondStack.push(stack.pop());
        } else {
          secondStack.pop();
          i++;
        }
      } else {
        stack.pop();
        i++;
      }
    }
  }
  return i;
}

/*
# 예1
54321
54 321 [4]
5 321 [4,3]
5 21

# 예2
54321
5 4321 [5]
4321 [5,4,3,2,1]

stack 혹은 보조 stack의 길이가 1 이상일 때까지 반복
- stack의 길이가 1 이상인 경우
    - stack의 끝 요소가 order에 맞지 않는 경우
        - 보조 stack의 끝 요소도 order에 맞지 않는 경우
            - stack의 길이가 1이면 리턴, 아니면 보조 stack에 옮기기
        - 보조 stack의 끝 요소가 order에 맞는 경우
            - 보조 stack pop
    - stack의 끝 요소가 order에 맞는 경우
        - stack pop
- stack의 길이가 0인 경우
    - 보조 stack의 끝 요소가 order에 맞지 않으면 리턴, 아니면 보조 stack pop
*/
