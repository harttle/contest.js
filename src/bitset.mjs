class BitSet {
  constructor(val = 0, N = Infinity) {
    this.N = N;
    this.val = 0n;
    if (typeof val === "number" || typeof val === "bigint") {
      this.val = BigInt(val);
    } else if (typeof val === "string") {
      for (let i = val.length - 1, bit = 1n; i >= 0; i--, bit <<= 1n) {
        if (val[i] !== "0")
          this.val |= bit;
      }
    } else if (val instanceof Array) {
      for (let i = 0, bit = 1n; i < val.length; i++, bit <<= 1n) {
        if (val[i] !== 0)
          this.val |= bit;
      }
    }
    const RANGE = N === Infinity ? -1n : (1n << BigInt(N)) - 1n;
    this.val &= RANGE;
  }
  capacity() {
    return this.N;
  }
  count() {
    let count = 0;
    for (let bit = 1n; bit <= this.val; bit <<= 1n)
      if ((bit & this.val) !== 0n)
        count++;
    return count;
  }
  set(i, val) {
    if (val !== 0)
      this.val |= 1n << BigInt(i);
    else
      this.val &= ~(1n << BigInt(i));
  }
  get(i) {
    return (this.val & 1n << BigInt(i)) !== 0n ? 1 : 0;
  }
  toString() {
    if (this.N <= 0)
      return "";
    if (this.val === 0n)
      return "0";
    let ans = "";
    let last = null;
    for (let val = this.val; val !== 0n && val !== last; last = val, val >>= 1n) {
      ans = String(val & 1n) + ans;
    }
    return this.N === Infinity ? ans : ans.padStart(this.N, "0");
  }
  shift(len) {
    return new BitSet(this.val << BigInt(len), this.N);
  }
  unshift(len) {
    return new BitSet(this.val >> BigInt(len), this.N);
  }
  and(rhs) {
    if (!(rhs instanceof BitSet))
      rhs = new BitSet(rhs);
    return new BitSet(this.val & rhs.val, Math.max(this.N, rhs.N));
  }
  negate() {
    return new BitSet(~this.val, this.N);
  }
  or(rhs) {
    if (!(rhs instanceof BitSet))
      rhs = new BitSet(rhs);
    return new BitSet(this.val | rhs.val, Math.max(this.N, rhs.N));
  }
  xor(rhs) {
    if (!(rhs instanceof BitSet))
      rhs = new BitSet(rhs);
    return new BitSet(this.val ^ rhs.val, Math.max(this.N, rhs.N));
  }
}
export {
  BitSet
};
