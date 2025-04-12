-- 코드를 입력하세요
# select FLAVOR, sum(TOTAL_ORDER) as cnt
# from FIRST_HALF
# group by FLAVOR

select h.FLAVOR
from FIRST_HALF h,
    (select FLAVOR, sum(TOTAL_ORDER) as cnt
    from FIRST_HALF
    group by FLAVOR) n
where h.FLAVOR = n.FLAVOR
order by n.cnt desc, h.SHIPMENT_ID