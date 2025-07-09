function solution(video_len, pos, op_start, op_end, commands) {
    const vl = video_len.split(':').map(Number)
    const po = pos.split(':').map(Number)
    const os = op_start.split(':').map(Number)
    const oe = op_end.split(':').map(Number)
    
    let curSec = convertToSec(po)
    const videoEndSec = convertToSec(vl)
    const startSec = convertToSec(os)
    const endSec = convertToSec(oe)
    
    if (isOpeningSection(curSec, startSec, endSec)) {
        curSec = endSec
    }
    
    commands.forEach((c) => {
        // console.log({curSec, c})
        if (c === 'next') {
            curSec = getNextSec(curSec, videoEndSec)
        }
        
        if (c === 'prev') {
            curSec = getPrevSec(curSec)
        }
        
        if (isOpeningSection(curSec, startSec, endSec)) {
            curSec = endSec
        }
    })
    
    const mm = String(Math.floor(curSec/60)).padStart(2, '0')
    const ss = String(curSec%60).padStart(2, '0')
    
    return `${mm}:${ss}`
}

const convertToSec = (t) => {
    const [ts, te] = t
    return ts*60+te
}

const isOpeningSection = (curSec, startSec, endSec) => {
    return curSec >= startSec && curSec <= endSec
}

const isExceedVideoLen = (curSec, videoEndSec) => {
    return curSec > videoEndSec
}

const isUnderVideoLen = (curSec) => {
    return curSec < 0
}

const getNextSec = (curSec, videoEndSec) => {
    if (isExceedVideoLen(curSec + 10, videoEndSec)) {
        return videoEndSec
    }
    return curSec + 10
}

const getPrevSec = (curSec) => {
    if (isUnderVideoLen(curSec - 10)) {
        return 0
    }
    return curSec - 10
}

/*
23:40

현재 위치 -> 오프닝 구간인지 먼저 확인. 명령어 확인. 숫자 증감, 비디오 길이 확인
분, 초를 숫자로 관리해야 할 듯. 60초 넘어가면 분 1 증가하고 a - 60
마이너스면 분 1 감소하고 60 - a

다른사람풀이보니, 분을 다 초로 바꿨음. 그러니 계산하기 편해짐.
*/