import { prime, isPrime, primesLeq, primeFactors } from './prime.mjs'

console.log('The 4th prime:', prime(4))
console.log('isPrime(2777):', isPrime(2777))
console.log('Primes <= 25:', primesLeq(25))
console.log('Prime factors of 56:', ...primeFactors(56))
