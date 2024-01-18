function solution(data, col, row_begin, row_end) {
  data.sort((a, b) =>
    a[col - 1] === b[col - 1] ? b[0] - a[0] : a[col - 1] - b[col - 1]
  );

  let answer = 0;
  for (let i = row_begin; i <= row_end; i++) {
    const remainSum = data[i - 1].reduce((p, c) => p + (c % i), 0);
    answer ^= remainSum;
  }

  return answer;
}
