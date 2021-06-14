class BitSet {
  N: number
  val: bigint
  constructor (val: bigint | string | number | number[] = 0, N = Infinity) {
    this.N = N
    this.val = 0n
    if (typeof val === 'number' || typeof val === 'bigint') {
      this.val = BigInt(val)
    } else if (typeof val === 'string') {
      for (let i = val.length - 1, bit = 1n; i >= 0; i--, bit <<= 1n) { if (val[i] !== '0') this.val |= bit }
    } else if (val instanceof Array) {
      for (let i = 0, bit = 1n; i < val.length; i++, bit <<= 1n) { if (val[i] !== 0) this.val |= bit }
    }
    const RANGE = N === Infinity ? -1n : (1n << BigInt(N)) - 1n
    this.val &= RANGE
  }

  capacity (): number {
    return this.N
  }

  count (): number {
    let count = 0
    for (let bit = 1n; bit <= this.val; bit <<= 1n) if ((bit & this.val) !== 0n) count++
    return count
  }

  set (i: number, val: number): void {
    if (val !== 0) this.val |= (1n << BigInt(i))
    else this.val &= ~(1n << BigInt(i))
  }

  get (i: number): number {
    return ((this.val & 1n << BigInt(i)) !== 0n) ? 1 : 0
  }

  toString (): string {
    if (this.N <= 0) return ''
    if (this.val === 0n) return '0'
    let ans = ''
    let last = null
    for (let val = this.val; (val !== 0n) && val !== last; last = val, val >>= 1n) { ans = String(val & 1n) + ans }
    return this.N === Infinity ? ans : ans.padStart(this.N, '0')
  }

  shift (len: number): BitSet {
    return new BitSet(this.val << BigInt(len), this.N)
  }

  unshift (len: number): BitSet {
    return new BitSet(this.val >> BigInt(len), this.N)
  }

  and (rhs: BitSet | number | bigint | string): BitSet {
    if (!(rhs instanceof BitSet)) rhs = new BitSet(rhs)
    return new BitSet(this.val & rhs.val, Math.max(this.N, rhs.N))
  }

  negate (): BitSet {
    return new BitSet(~this.val, this.N)
  }

  or (rhs: BitSet | number | bigint | string): BitSet {
    if (!(rhs instanceof BitSet)) rhs = new BitSet(rhs)
    return new BitSet(this.val | rhs.val, Math.max(this.N, rhs.N))
  }

  xor (rhs: BitSet | number | bigint | string): BitSet {
    if (!(rhs instanceof BitSet)) rhs = new BitSet(rhs)
    return new BitSet(this.val ^ rhs.val, Math.max(this.N, rhs.N))
  }
}

export { BitSet }
