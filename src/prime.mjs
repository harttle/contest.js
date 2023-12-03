// src/prime.ts
function eulersSieve(n) {
  const primes = [];
  const isPrime2 = Array(n + 1).fill(true);
  for (let cand = 2; cand <= n; cand++) {
    if (isPrime2[cand])
      primes.push(cand);
    for (const prime2 of primes) {
      if (prime2 * cand > n)
        break;
      isPrime2[prime2 * cand] = false;
      if (cand % prime2 === 0)
        break;
    }
  }
  return primes;
}
function eratosthenesSieve(n) {
  const isPrime2 = Array(n + 1).fill(true);
  for (let p = 2; p * p <= n; p++) {
    if (isPrime2[p]) {
      for (let j = p * p; j <= n; j += p) {
        isPrime2[j] = false;
      }
    }
  }
  const primes = [];
  for (let i = 2; i <= n; i++)
    if (isPrime2[i])
      primes.push(i);
  return primes;
}
function prime(nth) {
  let f = 20;
  if (nth > 5e7)
    f = 50;
  if (nth > 1e22)
    f = 100;
  return primesLeq(f * nth)[nth - 1];
}
function primesLeq(n) {
  return n < 1e3 ? eratosthenesSieve(n) : eulersSieve(n);
}
function isPrime(n) {
  if (n < 2)
    return false;
  const primes = primesLeq(Math.floor(Math.sqrt(n)));
  for (const p of primes)
    if (n % p === 0)
      return false;
  return true;
}
function primeFactors(n) {
  const factors = new Map();
  const sqrt = Math.sqrt(n);
  for (let f = 2; f <= sqrt; f++) {
    let count = 0;
    while (n % f === 0) {
      n /= f;
      count++;
    }
    if (count)
      factors.set(f, count);
  }
  if (n > 1)
    factors.set(n, 1);
  return factors;
}
export {
  eratosthenesSieve,
  eulersSieve,
  isPrime,
  prime,
  primeFactors,
  primesLeq
};
