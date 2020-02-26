const {prime, isPrime, primesLeq, primeFactors} = require('../prime')

describe('primes', () => {
    describe('prime()', () => {
        it('should get the 1st prime', () => {
            expect(prime(1)).toEqual(2)
        })
        it('should get the 2nd prime', () => {
            expect(prime(2)).toEqual(3)
        })
        it('should get the 3rd prime', () => {
            expect(prime(3)).toEqual(5)
        })
        it('should get the 4th prime', () => {
            expect(prime(4)).toEqual(7)
        })
        it('should get the 5th prime', () => {
            expect(prime(5)).toEqual(11)
        })
    })
    describe('primesLeq()', () => {
        it('should get primes leq 1', () => {
            expect(primesLeq(1)).toEqual([])
        })
        it('should get primes leq 2', () => {
            expect(primesLeq(2)).toEqual([2])
        })
        it('should get primes leq 3', () => {
            expect(primesLeq(3)).toEqual([2, 3])
        })
        it('should get primes leq 5', () => {
            expect(primesLeq(5)).toEqual([2, 3, 5])
        })
        it('should get primes leq 25', () => {
            expect(primesLeq(25)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23])
        })
    })
    describe('isPrime()', () => {
        it('should return false for 1', () => {
            expect(isPrime(1)).toEqual(false)
        })
        it('should return true for 2', () => {
            expect(isPrime(2)).toEqual(true)
        })
        it('should return true for 3', () => {
            expect(isPrime(3)).toEqual(true)
        })
        it('should return false for 6', () => {
            expect(isPrime(6)).toEqual(false)
        })
        it('should return false for 12', () => {
            expect(isPrime(12)).toEqual(false)
        })
        it('should return true for 23', () => {
            expect(isPrime(23)).toEqual(true)
        })
    })
    describe('primeFactors()', () => {
        it('should factor 1', () => {
            expect([...primeFactors(1)]).toEqual([])
        })
        it('should factor 2', () => {
            expect([...primeFactors(2)]).toEqual([[2, 1]])
        })
        it('should factor 6', () => {
            expect([...primeFactors(6)]).toEqual([[2, 1], [3, 1]])
        })
        it('should factor 24', () => {
            expect([...primeFactors(24)]).toEqual([[2, 3], [3, 1]])
        })
    })
})
