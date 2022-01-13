const factorialSeq = [1]

function factorial (N: number): number {
  const seq = factorialSeq
  for (let n = seq.length; n <= N; n++) seq.push(seq[seq.length - 1] * n)
  return seq[N]
}

function factorialSequence (N: number): number[] {
  const req = [1]
  for (let n = 1; n <= N; n++) req.push(req[req.length - 1] * n)
  return req
}

const modularFactorialSeq: {
  [key: string]: Array<bigint>
} = {}

function modularFactorial (N: number | bigint, M: number | bigint): number {
  N = BigInt(N)
  M = BigInt(M)
  const seq = modularFactorialSeq[M.toString()] = modularFactorialSeq[M.toString()] || [1n]
  for (let n = BigInt(seq.length); n <= N; n++) seq.push(seq[seq.length - 1] * n % M)
  return Number(seq[Number(N)])
}

function modularFactorialSequence (N: number | bigint, M: number | bigint): number[] {
  N = BigInt(N)
  M = BigInt(M)
  const seq = [1n]
  for (let n = 1n; n <= N; n++) seq.push(seq[seq.length - 1] * n % M)
  return seq.map(x => Number(x))
}

function gcdExtended (a: number, b: number): number[] {
  if (b === 0) return [a, 1, 0]
  const [gcd, x1, y1] = gcdExtended(b, a % b)
  return [gcd, y1, x1 - Math.floor(a / b) * y1]
}

function modularInverse (a: number, M: number): number {
  const [gcd, x] = gcdExtended(a, M)
  if (gcd !== 1) throw new Error('inverse not exist')
  return ((x % M) + M) % M
}

// Support for number & bigint at the same time
// https://stackoverflow.com/a/65281351/8242705
function pascalsTriangle (N: number): number[][]
function pascalsTriangle (N: bigint): Array<Array<bigint>>
function pascalsTriangle (N: number | bigint): number[][]|Array<Array<bigint>> {
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

function modularPascalsTriangle (N: number, MOD: number): number[][] {
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

function binomialCoefficient (n: number, k: number): number {
  let res = 1
  k = Math.min(k, n - k)
  for (let i = 1; i <= k; ++i) { res = res * (n - k + i) / i }
  return Math.round(res)
}

function moduleBinomialCoefficient (n: number, k: number, P: number): number {
  const deno = modularMultiply(modularFactorial(k, P), modularFactorial(n - k, P), P)
  return modularMultiply(modularFactorial(n, P), modularInverse(deno, P), P)
}

function modularMultiply (a: number, b: number, M: number): number {
  return Number(BigInt(a) * BigInt(b) % BigInt(M))
}

export {
  factorial, factorialSequence, modularFactorial, modularFactorialSequence,
  pascalsTriangle, modularPascalsTriangle, binomialCoefficient, moduleBinomialCoefficient, modularMultiply
}
