// src/string-hash.ts
var BiStringHash = class {
  constructor(M1 = 1e5 + 7, M2 = 1e5 + 19) {
    this.len = 0;
    this.h1 = new StringHash(M1, 1e8 + 7);
    this.h2 = new StringHash(M2, 1e7 + 13);
  }
  digest(val) {
    this.h1.digest(val);
    this.h2.digest(val);
    this.len++;
  }
  getKey() {
    const k1 = this.h1.getKey();
    const k2 = this.h2.getKey();
    return k1 + (1e8 + 7) * k2;
  }
  getKeyWithLength() {
    const k1 = this.h1.getKey();
    const k2 = this.h2.getKey();
    return `${k1},${k2},${this.len}`;
  }
};
var StringHash = class {
  constructor(M = 1e5 + 7, MOD = 1e9 + 7) {
    this.key = 0;
    this.M = M;
    this.MOD = MOD;
  }
  digest(val) {
    this.key *= this.M;
    this.key += val;
    this.key %= this.MOD;
  }
  getKey() {
    return this.key;
  }
};
export {
  BiStringHash,
  StringHash
};
