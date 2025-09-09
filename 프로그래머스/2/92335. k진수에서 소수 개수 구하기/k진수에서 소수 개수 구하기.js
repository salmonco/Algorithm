function solution(n, k) {
    const str = convertToStr(n, k)
    const primeArr = getPrimeArr(str)
    // console.log({str, primeArr})
    return primeArr.length
}

const convertToStr = (n, k) => {
    return n.toString(k)
}

const getPrimeArr = (str) => {
    const arr = str.split('0').filter((v) => v !== '').map(Number)
    return arr.filter((n) => isPrime(n))
}

const isPrime = (n) => {
    if (n === 1) {
        return false
    }
    for (let i = 2; i <= n**(1/2); i++) {
        if (n % i === 0) {
            return false
        }
    }
    return true
}

/*
string으로 다뤄도 되나?

0 제외하고 소수 찾기

211, 2, 1, 1, 11
*/