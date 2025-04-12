-- 코드를 입력하세요
select NAME
from ANIMAL_INS
where DATETIME = (
    select min(DATETIME)
    from ANIMAL_INS
)