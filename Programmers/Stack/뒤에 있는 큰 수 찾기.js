function solution(numbers) {
  const length = numbers.length;
  const answer = Array.from({ length }, () => -1);
  const stack = [];

  for (let i = length - 1; i >= 0; i--) {
    while (stack.length !== 0 && numbers[i] >= stack.at(-1)) stack.pop();
    if (stack.length !== 0) answer[i] = stack.at(-1);
    stack.push(numbers[i]);
  }
  return answer;
}

/*
브루트포스 -> 10^6 * 10^6 -> 시간초과

배열의 뒤에서부터 생각.
- 뒤에 요소 stack에 저장해놓고 numbers의 다음 요소랑 stack의 끝 요소랑 비교
- numbers 요소가 더 크거나 같으면 stack pop
- stack의 길이가 1 이상이면 젤 끝 요소로 뒷 큰 수를 업데이트
- numbers 요소를 stack에 push

뒷 큰 수를 구하려고 하는 numbers의 현재 요소에서 바로 다음 요소를 A라고 하자.
A가 현재 요소보다 크지 않다면, A와 같거나 작은 수는 고려할 필요가 없음. 즉, A와, A의 뒷 큰 수, 그리고 그 뒷 큰 수의 뒷 큰 수...만이 고려 대상이 됨.
-> 스택을 이용함으로써, 뒤부터 시작하여 현재 요소보다 같거나 작은 수를 pop하여 제거할 수 있고, 이에 뒷 큰 수들만을 남겨놓게 됨.

# 예1
numbers [2,3,3,5], stack [], answer [-1,-1,-1,-1]
numbers [2,3,3,5], stack [5], answer [-1,-1,-1,-1]
numbers [2,3,3,5], stack [5,3], answer [-1,-1,5,-1]
numbers [2,3,3,5], stack [5,3], answer [-1,5,5,-1]
numbers [2,3,3,5], stack [5,3,2], answer [3,5,5,-1]
*/
