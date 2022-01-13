class BiRollingHash {
  constructor(L, M1 = 1e5 + 7, M2 = 1e5 + 19) {
    this.h1 = new RollingHash(L, M1);
    this.h2 = new RollingHash(L, M2);
  }
  digest(val) {
    this.h1.digest(val);
    this.h2.digest(val);
  }
  degest(val) {
    this.h1.degest(val);
    this.h2.degest(val);
  }
  getKey() {
    const k1 = this.h1.getKey();
    const k2 = this.h2.getKey();
    return `${k1},${k2}`;
  }
}
class RollingHash {
  constructor(L, M = 1e5 + 7) {
    this.MOD = 1e9 + 7;
    this.MODn = BigInt(1e9 + 7);
    this.key = 0;
    this.M = M;
    this.W = Number(this.power(BigInt(M), L));
  }
  digest(val) {
    this.key *= this.M;
    this.key += val;
    this.key %= this.MOD;
  }
  degest(val) {
    this.key -= val * this.W;
    this.key %= this.MOD;
    if (this.key < 0)
      this.key += this.MOD;
  }
  getKey() {
    return this.key;
  }
  power(m, p) {
    if (p === 1)
      return m;
    if (p === 0)
      return 1n;
    if (p % 2)
      return m * this.power(m, p - 1) % this.MODn;
    const half = this.power(m, p / 2);
    return half * half % this.MODn;
  }
}
export {
  BiRollingHash,
  RollingHash
};
