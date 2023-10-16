const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const [N, M] = input[0].map(Number);
const arr = [];
let youtubers = [];

for (let i = 0; i < N; i++) {
  arr[i] = input[1 + i];
  youtubers.push(arr[i][0]);
}
arr.sort((a, b) => +a[1] - +b[1]);
youtubers = [...new Set(youtubers)];

const weekNum = Math.floor((M - 1) / 7) + 1;
const counts = {};
const times = {};

const getTime = (start, fin) => {
  const [sH, sM] = start.split(":");
  const [fH, fM] = fin.split(":");
  const hour = +fH - +sH;
  const min = +fM - +sM;

  return hour * 60 + min;
};

youtubers.forEach((v) => {
  counts[v] = Array.from({ length: weekNum }, () => 0);
  times[v] = Array.from({ length: weekNum }, () => 0);
});

for (let i = 0; i < N; i++) {
  const [name, day, start, fin] = arr[i];
  const t = getTime(start, fin);
  const week = Math.floor((+day - 1) / 7);
  // console.log(counts, times, week)
  counts[name][week] = counts[name][week] + 1;
  times[name][week] = times[name][week] + t;
}
// console.log(counts, times)
const excepts = [];

for (let i = 0; i < weekNum; i++) {
  youtubers.forEach((v) => {
    if (
      !counts[v][i] ||
      counts[v][i] < 5 ||
      !times[v][i] ||
      times[v][i] < 60 * 60
    ) {
      excepts.push(v);
    }
  });
}

const newExcepts = [...new Set(excepts)];
const answer = [];

if (youtubers.length === newExcepts.length) {
  console.log(-1);
} else {
  youtubers.forEach((v) => {
    if (!newExcepts.includes(v)) {
      answer.push(v);
    }
  });
  answer.sort((a, b) => (a < b ? -1 : 1));
  answer.forEach((v) => console.log(v));
}

/*
진짜 버츄얼 유튜버: 매주 5회, 매주 총 60시간 이상 라이브 방송

7, 14, 21, ...
새로 집계

어떻게 데이터를 저장할 것인지 고민
counts[name] = [0, 0, 0]
*/
