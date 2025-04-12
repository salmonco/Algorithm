-- 코드를 입력하세요
select MEMBER_ID, MEMBER_NAME, GENDER, substring(DATE_OF_BIRTH, 1, 10) as DATE_OF_BIRTH
from MEMBER_PROFILE
where DATE_OF_BIRTH like '%-03-%'
    and GENDER = 'W'
    and TLNO is not null
order by MEMBER_ID