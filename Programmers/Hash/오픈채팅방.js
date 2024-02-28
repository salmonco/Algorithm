function solution(record) {
  const userInfo = {};
  const messageInfo = [];
  for (let i = 0; i < record.length; i++) {
    const [action, id, nickname] = record[i].split(" ");
    if (action === "Enter") {
      userInfo[id] = nickname;
      messageInfo.push([action, id]);
    }
    if (action === "Leave") {
      messageInfo.push([action, id]);
    }
    if (action === "Change") {
      userInfo[id] = nickname;
    }
  }
  return messageInfo.map(
    ([action, id]) =>
      `${userInfo[id]}님이 ${
        action === "Enter" ? "들어왔습니다." : "나갔습니다."
      }`
  );
}

/*
# 예1
userInfo - Enter, Change에 대한 것만 기록
{
uid1234: 'Prodo',
uid4567: 'Ryan',
}

messageInfo - Enter, Leave에 대한 것만 기록
[
['Enter', 'uid1234'],
['Enter', 'uid4567'],
['Leave', 'uid1234'],
['Enter', 'uid1234'],
]
유저 아이디에 매핑되는 닉네임 출력
*/
