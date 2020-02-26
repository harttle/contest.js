// O(n)
// each non-prime = smallest prime factor * another number
// SPF: smallest prime factor
function eulersSieve (n) {
    let primes = []
    let isPrime = Array(n + 1).fill(true)
    for (let cand = 2; cand <= n; cand++) {
        if (isPrime[cand]) primes.push(cand)
        // prime is the smallest factor
        for (let prime of primes) {
            // overflow
            if (prime * cand > n) break
            isPrime[prime * cand] = false
            // prime is no longer the SPF of the above multiple
            if (cand % prime === 0) break
        }
    }
    return primes
}
// O(nloglogn)
function eratosthenesSieve (n) {
    let isPrime = Array(n + 1).fill(true)
    for (let p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            for (let j = p * p; j <= n; j += p) {
                isPrime[j] = false
            }
        }
    }
    let primes = []
    for (let i = 2; i <= n; i++) if (isPrime[i]) primes.push(i)
    return primes
}

function prime(nth) {
    let f = 20
    if (nth > 5e7) f = 50
    if (nth > 1e22) f = 100
    return primesLeq(f * nth)[nth - 1]
}

function primesLeq(n) {
    return n < 1000 ? eratosthenesSieve(n) : eulersSieve(n)
}

// O(n^0.5)
function isPrime(n) {
    if (n < 2) return false
    const primes = primesLeq(Math.floor(Math.sqrt(n)))
    for (let p of primes) if (n % p === 0) return false
    return true
}

function primeFactors(n) {
    let factors = new Map()
    let sqrt = Math.sqrt(n)
    for (let f = 2; f <= sqrt; f++) {
        let count = 0
        while (n % f === 0) {
            n /= f
            count++
        }
        if (count) factors.set(f, count)
    }
    if (n > 1) factors.set(n, 1)
    return factors
}

module.exports = { prime, primesLeq, isPrime, primeFactors }
