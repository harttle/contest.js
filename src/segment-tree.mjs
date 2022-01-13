class BinarySegmentTree {
  constructor(height) {
    this.data = Array(2 ** (height + 1)).fill(0);
    this.height = height;
  }
  add(key, val = 1) {
    let root = 1;
    this.data[root] += val;
    for (let i = this.height - 1; i >= 0; i--) {
      const bit = 1 << i;
      const kBit = bit & key;
      root = kBit ? this.right(root) : this.left(root);
      this.data[root] += val;
    }
  }
  leq(key) {
    let sum = 0;
    let root = 1;
    for (let i = this.height - 1; i >= 0; i--) {
      const bit = 1 << i;
      const kBit = key & bit;
      if (kBit) {
        sum += this.data[this.left(root)];
        root = this.right(root);
      } else {
        root = this.left(root);
      }
    }
    sum += this.data[root];
    return sum;
  }
  left(i) {
    return i * 2;
  }
  right(i) {
    return i * 2 + 1;
  }
}
export {
  BinarySegmentTree
};
