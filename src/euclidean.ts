export function gcd<T extends bigint | number> (a: T, b: T): T {
  return b === 0 ? a : gcd(b, a % b as T)
}

export function gcdExtended (a: number, b: number): number[] {
  if (b === 0) return [a, 1, 0]
  const [gcd, x1, y1] = gcdExtended(b, a % b)
  return [gcd, y1, x1 - Math.floor(a / b) * y1]
}

export function modInverse (a: number, M: number): number {
  const [gcd, x] = gcdExtended(a, M)
  if (gcd !== 1) throw new Error('inverse not exist')
  return ((x % M) + M) % M
}
