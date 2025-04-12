-- 코드를 입력하세요
select BOOK_ID, substring(PUBLISHED_DATE, 1, 10) as PUBLISHED_DATE
from BOOK
where PUBLISHED_DATE like '2021%'
    and CATEGORY = '인문'
order by PUBLISHED_DATE