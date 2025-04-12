-- 코드를 입력하세요
select DR_NAME, DR_ID, MCDP_CD, substring(HIRE_YMD, 1, 10) as HIRE_YMD
from DOCTOR
where MCDP_CD = 'CS' or MCDP_CD = 'GS'
order by HIRE_YMD desc, DR_NAME asc