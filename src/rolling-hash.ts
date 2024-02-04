class BiRollingHash {
  private readonly h1: RollingHash
  private readonly h2: RollingHash
  constructor (L: number, M1: number = 1e5 + 7, M2: number = 1e5 + 19) {
    this.h1 = new RollingHash(L, M1)
    this.h2 = new RollingHash(L, M2)
  }

  digest (val: number): void {
    this.h1.digest(val)
    this.h2.digest(val)
  }

  degest (val: number): void {
    this.h1.degest(val)
    this.h2.degest(val)
  }

  getKey (): number {
    const k1 = this.h1.getKey()
    const k2 = this.h2.getKey()
    return k1 + (1e9 + 7) * k2
  }
}

class RollingHash {
  private readonly MOD: number = 1e9 + 7
  private readonly MODn: bigint = BigInt(1e9 + 7)
  private readonly M: number
  private readonly W: number
  private key = 0
  constructor (L: number, M = 1e5 + 7) {
    this.M = M
    this.W = Number(this.power(BigInt(M), L))
  }

  digest (val: number): void {
    this.key *= this.M
    this.key += val
    this.key %= this.MOD
  }

  degest (val: number): void {
    this.key -= val * this.W
    this.key %= this.MOD
    if (this.key < 0) this.key += this.MOD
  }

  getKey (): number {
    return this.key
  }

  power (m: bigint, p: number): bigint {
    if (p === 1) return m
    if (p === 0) return 1n
    if (p % 2) return (m * this.power(m, p - 1)) % this.MODn
    const half = this.power(m, p / 2)
    return (half * half) % this.MODn
  }
}

export { BiRollingHash, RollingHash }
