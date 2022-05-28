class SegmentTree {
  constructor(N, aggregate = (a, b) => a + b, initial = 0) {
    this.N = N;
    this.values = Array(N).fill(initial);
    this.tree = Array(N * 4).fill(initial);
    this.aggregate = aggregate;
  }
  update(i, value) {
    this.values[i] = value;
    this._update(0, this.N - 1, 1, i);
  }
  prefix(i) {
    return this._prefix(0, this.N - 1, 1, i);
  }
  higher(target) {
    return this._prefixSearch(0, this.N - 1, 1, target, (value, target2) => value > target2);
  }
  ceil(target) {
    return this._prefixSearch(0, this.N - 1, 1, target, (value, target2) => value >= target2);
  }
  lower(target) {
    return this.ceil(target) - 1;
  }
  floor(target) {
    return this.higher(target) - 1;
  }
  valueAt(i) {
    return this.values[i];
  }
  _update(l, r, ti, i) {
    const m = l + r >> 1;
    if (l === r) {
      this.tree[ti] = this.values[i];
      return;
    }
    if (i <= m)
      this._update(l, m, ti * 2, i);
    else
      this._update(m + 1, r, ti * 2 + 1, i);
    this.tree[ti] = this.aggregate(this.tree[ti * 2], this.tree[ti * 2 + 1]);
  }
  _prefix(l, r, ti, i) {
    if (l === r) {
      return this.tree[ti];
    }
    const m = l + r >> 1;
    if (i <= m)
      return this._prefix(l, m, ti * 2, i);
    return this.aggregate(this.tree[ti * 2], this._prefix(m + 1, r, ti * 2 + 1, i));
  }
  _prefixSearch(l, r, ti, target, predicate) {
    if (l === r) {
      return predicate(this.tree[ti], target) ? l : Infinity;
    }
    const m = l + r >> 1;
    if (predicate(this.tree[ti * 2], target))
      return this._prefixSearch(l, m, ti * 2, target, predicate);
    return this._prefixSearch(m + 1, r, ti * 2 + 1, target - this.tree[ti * 2], predicate);
  }
}
export {
  SegmentTree
};
