function solution(prices) {
  const len = prices.length;
  const stack = [];
  const times = Array.from({ length: len }, () => 0);

  for (let i = 0; i < len; i++) {
    const currentPrice = prices[i];
    stack.forEach(({ idx }) => times[idx]++);

    while (stack.length > 0 && stack.at(-1).price > currentPrice) {
      stack.pop();
    }
    stack.push({ price: currentPrice, idx: i });
  }

  return times;
}

/*
브루트포스로 하면 시간복잡도 10^10 -> 시간초과

스택 이용, 한 이터레이션 시마다 스택에 남아있는 것들에게 +1초
stack 돌면서 가격 떨어진 것들은 pop. 그리고 현재 가격 push
i=0, p=1
stack (1,0)
times [0,0,0,0,0]

i=1, p=2
stack (1,0) (2,1)
times [1,0,0,0,0]

i=2, p=3
stack (1,0) (2,1) (3,2)
times [2,1,0,0,0]

i=3, p=2
stack (1,0) (2,1) (2,3)
times [3,2,1,0,0]

i=4, p=3
stack (1,0) (2,1) (2,3) (3,4)
times [4,3,1,1,0]
*/
