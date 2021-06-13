import { modularFactorial } from './factorial'
import { modularInverse } from './euclidean'

// Support for number & bigint at the same time
// https://stackoverflow.com/a/65281351/8242705
export function pascalsTriangle (N: number): number[][]
export function pascalsTriangle (N: bigint): Array<Array<bigint>>
export function pascalsTriangle (N: number | bigint): number[][]|Array<Array<bigint>> {
  let base1
  if (typeof N === 'number') {
    base1 = 1
  } else {
    base1 = 1n as unknown as number
  }
  const C = [[base1]]

  for (let n = 1; n <= N; ++n) {
    C.push(Array(n + 1))
    C[n][0] = C[n][n] = base1
    for (let k = 1; k < n; ++k) {
      C[n][k] = C[n - 1][k - 1] + C[n - 1][k]
    }
  }
  return C
}

export function modularPascalsTriangle (N: number, MOD: number): number[][] {
  const C: any[][] = [[1n]]
  const MODn = BigInt(MOD)

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

export function binomialCoefficient (n: number, k: number): number {
  let res = 1
  k = Math.min(k, n - k)
  for (let i = 1; i <= k; ++i) { res = res * (n - k + i) / i }
  return Math.round(res)
}

export function moduleBinomialCoefficient (n: number, k: number, P: number): number {
  const deno = modularMultiply(modularFactorial(k, P), modularFactorial(n - k, P), P)
  return modularMultiply(modularFactorial(n, P), modularInverse(deno, P), P)
}

function modularMultiply (a: number, b: number, M: number): number {
  return Number(BigInt(a) * BigInt(b) % BigInt(M))
}
