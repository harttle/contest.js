const N = 1e5
const MOD = 1e9 + 7
const MODn = BigInt(MOD)
const fact = getFactorials()
const factInvs = getFactorialInvs()

function getFactorials (): number[] {
  const fact = [1n]
  for (let i = 1; i <= N; i++) fact.push(fact[i - 1] * BigInt(i) % MODn)
  return fact.map(x => Number(x))
}

function getFactorialInvs (): number[] {
  const arr = Array(N + 1)
  arr[N] = power(fact[N], MOD - 2)

  for (let i = N - 1; i >= 0; i--) {
    arr[i] = prod(arr[i + 1], i + 1)
  }
  return arr
}

function power (x: number, p: number): number {
  if (!p) return 1
  if (p % 2) return prod(power(x, p - 1), x)
  const h = power(x, p / 2)
  return prod(h, h) % MOD
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
  return prod(fact[n], factInvs[k], factInvs[n - k])
}

function arrangement (n: number, k: number): number {
  return prod(fact[n], factInvs[n - k])
}

function prod (...args: number[]): number {
  let p = 1n
  for (const arg of args) {
    p = p * BigInt(arg) % MODn
  }
  return Number(p)
}

export {
  MOD, fact, factInvs, getFactorials, power,
  pascalsTriangle, combination, arrangement, prod
}
