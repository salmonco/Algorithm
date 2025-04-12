-- 코드를 입력하세요
# select FLAVOR, count(1) as cnt
# from FIRST_HALF
# group by FLAVOR
# having cnt > 3000

select f.FLAVOR
from FIRST_HALF f, ICECREAM_INFO i,
    (select FLAVOR, sum(TOTAL_ORDER) as cnt
    from FIRST_HALF
    group by FLAVOR
    having cnt > 3000) n
where f.FLAVOR = i.FLAVOR and f.FLAVOR = n.FLAVOR
    and i.INGREDIENT_TYPE like 'fruit_based'
order by n.cnt desc