class BiStringHash {
  private readonly h1: StringHash
  private readonly h2: StringHash
  private len = 0
  constructor (M1: number = 1e5 + 7, M2: number = 1e5 + 19) {
    this.h1 = new StringHash(M1, 1e8 + 7)
    this.h2 = new StringHash(M2, 1e7 + 13)
  }

  digest (val: number): void {
    this.h1.digest(val)
    this.h2.digest(val)
    this.len++
  }

  getKey (): number {
    const k1 = this.h1.getKey()
    const k2 = this.h2.getKey()
    return k1 + (1e8 + 7) * k2
  }

  getKeyWithLength (): string {
    const k1 = this.h1.getKey()
    const k2 = this.h2.getKey()
    return `${k1},${k2},${this.len}`
  }
}

class StringHash {
  private readonly MOD: number
  private readonly M: number
  private key = 0
  constructor (M = 1e5 + 7, MOD: number = 1e9 + 7) {
    this.M = M
    this.MOD = MOD
  }

  digest (val: number): void {
    this.key *= this.M
    this.key += val
    this.key %= this.MOD
  }

  getKey (): number {
    return this.key
  }
}

export { BiStringHash, StringHash }
