// src/segment-tree.ts
var SegmentTreeNode = class {
  constructor(lo, hi, arr, initial, aggregate = (a, b) => a + b) {
    this.lo = lo;
    this.hi = hi;
    this.initial = initial;
    this.aggregate = aggregate;
    this.aggregate = aggregate;
    if (lo === hi) {
      this.value = arr[lo];
    } else {
      const m = lo + hi >> 1;
      this.l = new SegmentTreeNode(lo, m, arr, initial, aggregate);
      this.r = new SegmentTreeNode(m + 1, hi, arr, initial, aggregate);
      this.value = this.aggregate(this.l.value, this.r.value);
    }
  }
  update(i, value) {
    if (i < this.lo || i > this.hi)
      return;
    if (this.lo === this.hi)
      this.value = value;
    else {
      this.l.update(i, value);
      this.r.update(i, value);
      this.value = this.aggregate(this.l.value, this.r.value);
    }
  }
  prefix(i) {
    if (this.lo === this.hi)
      return this.value;
    const m = this.lo + this.hi >> 1;
    if (i <= m)
      return this.l.prefix(i);
    return this.aggregate(this.l.value, this.r.prefix(i));
  }
  query(i, j) {
    if (i > j)
      return this.initial;
    if (i <= this.lo && j >= this.hi)
      return this.value;
    const m = this.lo + this.hi >> 1;
    const l1 = Math.max(this.lo, i);
    const r1 = Math.min(m, j);
    const l2 = Math.max(m, i);
    const r2 = Math.min(this.hi, j);
    let ans = this.initial;
    if (l1 <= r1)
      ans = this.aggregate(ans, this.l.query(l1, r1));
    if (l2 <= r2)
      ans = this.aggregate(ans, this.r.query(l2, r2));
    return ans;
  }
  findPrefix(pred) {
    if (this.lo === this.hi)
      return pred(this.value) ? this.lo : -1;
    if (pred(this.l.value))
      return this.l.findPrefix(pred);
    return this.r.findPrefix((value) => pred(this.aggregate(value, this.l.value)));
  }
};
var SegmentTree = class {
  constructor(N, aggregate = (a, b) => a + b, initial = 0) {
    this.tree = new SegmentTreeNode(0, N - 1, Array(N).fill(initial), initial, aggregate);
  }
  update(i, value) {
    this.tree.update(i, value);
  }
  prefix(i) {
    return this.tree.prefix(i);
  }
  query(l, r) {
    return this.tree.query(l, r);
  }
  higher(target) {
    return this.tree.findPrefix((value) => value > target);
  }
  ceil(target) {
    return this.tree.findPrefix((value) => value >= target);
  }
  lower(target) {
    const i = this.ceil(target);
    return i < 0 ? i : i - 1;
  }
  floor(target) {
    const i = this.higher(target);
    return i < 0 ? i : i - 1;
  }
};
export {
  SegmentTree,
  SegmentTreeNode
};
