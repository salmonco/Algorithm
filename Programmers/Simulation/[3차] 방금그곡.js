function solution(m, musicinfos) {
  const parseMusic = (str) => {
    const arr = str.split("");
    const music = [];
    for (let i = 0; i < arr.length; i++) {
      const c = arr[i];
      if (c === "#") music[music.length - 1] = music[music.length - 1] + "#";
      else music.push(c);
    }
    return music;
  };

  const parseTime = (str) => {
    const [hour, min] = str.split(":").map(Number);
    return hour * 60 + min;
  };

  const candidates = [];
  for (let i = 0; i < musicinfos.length; i++) {
    const [sT, fT, title, music] = musicinfos[i].split(",");
    const time = parseTime(fT) - parseTime(sT);
    const musicArr = parseMusic(music);
    const musicLen = musicArr.length;
    const quo = Math.floor(time / musicLen);
    const remain = time % musicLen;
    let playMusic = [];
    for (let j = 0; j < quo; j++) {
      playMusic = playMusic.concat(musicArr);
    }
    playMusic = playMusic.concat(musicArr.slice(0, remain));

    const mArr = parseMusic(m);
    const mLen = mArr.length;
    for (let j = 0; j < playMusic.length - mLen + 1; j++) {
      let str = "";
      for (let k = 0; k < mLen; k++) {
        str += playMusic[j + k];
      }
      if (str === m) candidates.push([time, title]);
    }
  }
  candidates.sort((a, b) => b[0] - a[0]);
  return candidates.length ? candidates[0][1] : "(None)";
}

/*
str에 includes(m)으로 찾기엔 #을 고려해야 함
-> parseMusic

다른사람풀이: 두 단어로 이루어진 C# 같은 거를 C로 치환
*/
