function solution(bandage, health, attacks) {
  const [t, x, y] = bandage;
  let h = health;

  for (let i = 0; i < attacks.length; i++) {
    // console.log(i, h)
    const [attackTime, damage] = attacks[i];
    h -= damage;
    if (h <= 0) {
      return -1;
    }
    if (i === attacks.length - 1) {
      break;
    }
    const [nextAttackTime] = attacks[i + 1];
    const gap = nextAttackTime - attackTime - 1;
    const q = Math.floor(gap / t);
    h += gap * x;
    if (gap >= t) {
      h += y * q;
    }
    if (h > health) {
      h = health;
    }
    // console.log(i, gap, h)
  }
  return h <= 0 ? -1 : h;
}

/*
[예 1]
1)
9 - 2 - 1 = 6
6 + 5 (30 - 10 + 11 -> 31인데 최대 체력은 30)

2)
10 - 9 - 1 = 0
0 (30 - 15 -> 15)

3)
11 - 10 - 1 = 0
0 (15 - 5 -> 10)

4)
(10 - 5 -> 5)

[예 2]
1)
5 - 1 - 1 = 3
3*2 + 2 (20 - 15 + 8 -> 13)

2)
8 - 5 - 1 = 2
2*2 (13 - 16 -> 회복하기 전에 체력이 음수거나 0이면 죽음)

주의: 기술이 끝나면 그 즉시 붕대 감기를 다시 사용
*/
