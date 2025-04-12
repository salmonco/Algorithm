-- 코드를 작성해주세요
# GENOTYPE -> 비트연산 and 했을 때 부모가 되어야겠는데.

select d.ID, d.GENOTYPE, p.GENOTYPE as PARENT_GENOTYPE
from ECOLI_DATA d, ECOLI_DATA p
where d.PARENT_ID = p.ID
    and (d.GENOTYPE & p.GENOTYPE) = p.GENOTYPE
order by d.ID