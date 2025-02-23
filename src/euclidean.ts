export function gcd<T extends bigint | number> (a: T, b: T): T {
  return b === 0 ? a : gcd(b, a % b as T)
}

export function gcdExtended (a: number, b: number): number[] {
  if (b === 0) return [a, 1, 0]
  const [gcd, x, y] = gcdExtended(b, a % b)
  // x b + y (a - a/b * b)
  return [gcd, y, x - Math.floor(a / b) * y]
}

export function modInverse (a: number, M: number): number {
  const [gcd, x] = gcdExtended(a, M)
  if (gcd !== 1) throw new Error('inverse not exist')
  // xa + yM = 1 => ax = 1 (mod M)
  return ((x % M) + M) % M
}
