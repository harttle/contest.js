import { modInverse } from './euclidean'

const MOD = 1e9 + 7
const MODn = BigInt(MOD)
const _Ann = [1n]

function factorial (N: number): number {
  const Nn = BigInt(N)
  for (let n = BigInt(_Ann.length); n <= Nn; n++) _Ann.push(_Ann[_Ann.length - 1] * n % MODn)
  return Number(_Ann[Number(N)])
}

function factorialSeq (N: number): number[] {
  factorial(N)
  return _Ann.slice(0, N + 1).map(x => Number(x))
}

function pascalsTriangle (N: number): number[][] {
  const C: any[][] = [[1n]]

  for (let n = 1; n <= N; ++n) {
    C.push(Array(n + 1))
    C[n][0] = C[n][n] = 1n
    for (let k = 1; k < n; ++k) {
      C[n][k] = ((C[n - 1][k - 1] as bigint) + (C[n - 1][k] as bigint)) % MODn
    }
  }
  for (let n = 0; n <= N; n++) for (let k = 0; k <= n; k++) C[n][k] = Number(C[n][k])
  return C
}

function combination (n: number, k: number): number {
  const deno = modMultiply(factorial(k), factorial(n - k))
  return modMultiply(factorial(n), modInverse(deno, MOD))
}

function arrangement (n: number, k: number): number {
  const deno = factorial(n - k)
  return modMultiply(factorial(n), modInverse(deno, MOD))
}

function modMultiply (a: number, b: number): number {
  return Number(BigInt(a) * BigInt(b) % MODn)
}

export {
  factorial, factorialSeq,
  pascalsTriangle, combination, arrangement, modMultiply
}
