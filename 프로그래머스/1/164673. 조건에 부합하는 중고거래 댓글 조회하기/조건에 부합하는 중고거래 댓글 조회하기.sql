-- 코드를 입력하세요
select b.TITLE, b.BOARD_ID, r.REPLY_ID, r.WRITER_ID, r.CONTENTS, substring(r.CREATED_DATE, 1, 10) as CREATED_DATE
from USED_GOODS_BOARD b, USED_GOODS_REPLY r
where b.BOARD_ID = r.BOARD_ID
    and b.CREATED_DATE like '2022-10%'
    # and r.CREATED_DATE like '2022-10%'
order by r.CREATED_DATE asc, b.TITLE asc