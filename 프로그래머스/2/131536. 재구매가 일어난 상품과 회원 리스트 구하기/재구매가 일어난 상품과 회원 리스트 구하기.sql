-- 코드를 입력하세요
select n.USER_ID, n.PRODUCT_ID
from
    (select o.USER_ID, o.PRODUCT_ID, COUNT(1) as cnt
    from ONLINE_SALE o
    group by o.USER_ID, o.PRODUCT_ID) n
where n.cnt > 1
order by n.USER_ID ASC, n.PRODUCT_ID DESC