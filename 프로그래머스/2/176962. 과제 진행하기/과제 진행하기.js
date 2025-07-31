function solution(plans) {
    const stack = []
    const ans = []
    const parsedPlans = plans.map((arr) => {
        const [name, t, m] = arr
        const time = getMin(t)
        const min = Number(m)
        return { name, time, min }
    })
    const sortedPlans = parsedPlans.sort((a, b) => a.time - b.time)
    const temp = [...sortedPlans]
    
    for (let i = 0; i < temp.length; i++) {
        const v = temp[i]
        const { name, time, min, isFinish } = v
        // console.log({ name, time, min, isFinish, stack, temp, ans, i, tl: temp.length-1 })
        if (i === temp.length-1) {
            // 마지막 계획은 바로 ans 에 push
            ans.push(v.name)
            // stack 의 rear 부터 ans 에 push
            while (stack.length > 0) {
                ans.push(stack.pop().name)
            }
            continue
        }
        
        const dur = temp[i+1].time - time
        
        if (isFinish) {
            let tempDur = dur
            while (tempDur > 0) {
                if (stack.length === 0) {
                    break
                }
                const { name, min } = stack.pop()
                if (min > tempDur) {
                    stack.push({ name, min: min-tempDur })
                    break
                }
                ans.push(name)
                tempDur -= min
            }
            continue
        }
        
        // 1. 현재 계획의 종료시간 >= 다음 계획의 시작시간
        if (time + min > temp[i+1].time) {
            stack.push({ name, min: min-dur })
            continue
        }
        
        ans.push(name)
        
        // 2. 현재 계획의 종료시간 < 다음 계획의 시작시간
        // -> 종료상태 true, time 세팅해서 plans 에 push
        if (time + min < temp[i+1].time) {
            temp.splice(i+1, 0, { time: time + min, isFinish: true })
        }
    }
    
    return ans
}

const getMin = (str) => {
    const [h, m] = str.split(':').map(Number)
    return h*60 + m
}

/*
music 30, computer 90 스택
-> science 13:30
music 30, computer 60
-> history 14:30

과제 다 시작했으면 남은 스택에서 차곡차곡 pop
시간을 분으로 바꾸기

계획 종료 시간에 깨서, 대기중인 계획 있는지 봐야 함

1. 현재 계획의 종료시간 >= 다음 계획의 시작시간

2. 현재 계획의 종료시간 < 다음 계획의 시작시간
-> 종료상태 true, time 세팅해서 plans 에 push

종료상태 true면 대기중인 계획 pop

{ name, time, min }
(music, 12:20, 40) (computer, 12:30, 100) (science, 12:40, 50) (history, 14:00, 30)
[ (music, 30) ]
(computer, 12:30, 100) (science, 12:40, 50) (history, 14:00, 30)
[ (music, 30), (computer, 90) ]
(science, 12:40, 50) (history, 14:00, 30) -> science
[ (music, 30), (computer, 90) ]
(13:30) (history, 14:00, 30)
[ (music, 30), (computer, 60) ]
(history, 14:00, 30) -> history

("aaa", "12:00", "30") ("bbb", "12:10", "30") ("ccc", "14:00", "30")
[ (aaa, 20) ]
("bbb", "12:10", "30") ("ccc", "14:00", "30") -> bbb
[ (aaa, 20) ]
(12:40) ("ccc", "14:00", "30")
[  ] -> aaa
(13:00) ("ccc", "14:00", "30")
[  ]
("ccc", "14:00", "30") -> ccc

질문하기 게시판에서 엣지케이스를 찾음
제 경우는 잔여시간이 남아있는 과제를 한번에 여러 개 처리하는 경우를 처리하니 정답이 됐습니다.

잔여시간이 5분, 10분이 남은 과제가 있다고 할 때
현재 과제를 끝내는 시간과 다음 과제를 시작하는 시간 사이의 여유가 15분 이상 있다면 잔여과제 2개를 처리할 수 있는 경우를 고려하니 풀리네요
*/