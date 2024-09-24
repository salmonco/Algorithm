const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const N = input[0];
const numbers = input.slice(1);

const getSum = (arr) => {
  return arr.reduce((p, c) => p + c, 0);
};

const getAverage = (arr) => {
  const ave = Math.round(getSum(arr) / arr.length);
  return ave === 0 ? 0 : ave;
};

const getMid = (arr) => {
  const sortedArr = [...arr].sort((a, b) => a - b);
  const len = arr.length;
  if (len % 2 === 0) {
    return Math.round((sortedArr[len / 2 - 1] + sortedArr[len / 2]) / 2);
  } else {
    return sortedArr[(len - 1) / 2];
  }
};

const getFrequent = (arr) => {
  const hash = {};
  arr.forEach((v) => (hash[v] = hash[v] + 1 || 1));
  const maxCnt = Math.max(...Object.values(hash));
  const freqArr = Object.entries(hash)
    .filter(([k, v]) => v === maxCnt)
    .map(([k, v]) => +k);
  if (freqArr.length === 1) {
    return freqArr[0];
  } else {
    return freqArr.sort((a, b) => a - b)[1];
  }
};

const getRange = (arr) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return Math.abs(max - min);
};

const average = getAverage(numbers);
const mid = getMid(numbers);
const frequent = getFrequent(numbers);
const range = getRange(numbers);
console.log(average);
console.log(mid);
console.log(frequent);
console.log(range);

/*
산술평균 : N개의 수들의 합을 N으로 나눈 값
중앙값 : N개의 수들을 증가하는 순서로 나열했을 경우 그 중앙에 위치하는 값
최빈값 : N개의 수들 중 가장 많이 나타나는 값
범위 : N개의 수들 중 최댓값과 최솟값의 차이
N개의 수가 주어졌을 때, 네 가지 기본 통계값을 구하는 프로그램을 작성하시오.

N(1 ≤ N ≤ 500,000)
(0 + 0 + (-1)) / 3 = -0.333333... 이고 이를 첫째 자리에서 반올림하면 0이다. -0으로 출력하면 안된다.
*/
