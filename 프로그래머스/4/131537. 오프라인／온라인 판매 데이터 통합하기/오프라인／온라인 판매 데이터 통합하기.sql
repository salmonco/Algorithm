-- 코드를 입력하세요
# select substring(SALES_DATE, 1, 10) as SALES_DATE, PRODUCT_ID, USER_ID, sum(SALES_AMOUNT) as SALES_AMOUNT
# from ONLINE_SALE
# where SALES_DATE like '2022-03%'
# group by SALES_DATE, PRODUCT_ID, USER_ID

# select substring(SALES_DATE, 1, 10) as SALES_DATE, PRODUCT_ID, NULL as USER_ID, sum(SALES_AMOUNT) as SALES_AMOUNT
# from OFFLINE_SALE
# where SALES_DATE like '2022-03%'
# group by SALES_DATE, PRODUCT_ID

select SALES_DATE, PRODUCT_ID, USER_ID, SALES_AMOUNT
from
    (
        select substring(SALES_DATE, 1, 10) as SALES_DATE, PRODUCT_ID, USER_ID, sum(SALES_AMOUNT) as SALES_AMOUNT
        from ONLINE_SALE
        where SALES_DATE like '2022-03%'
        group by SALES_DATE, PRODUCT_ID, USER_ID
    
    union all
    
        select substring(SALES_DATE, 1, 10) as SALES_DATE, PRODUCT_ID, NULL as USER_ID, sum(SALES_AMOUNT) as SALES_AMOUNT
        from OFFLINE_SALE
        where SALES_DATE like '2022-03%'
        group by SALES_DATE, PRODUCT_ID
    ) t
order by SALES_DATE, PRODUCT_ID, USER_ID