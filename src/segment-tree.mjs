// src/segment-tree.ts
var SegmentTree = class {
  constructor(N, aggregate = (a, b) => a + b, initial = 0) {
    this.N = N;
    this.initial = initial;
    this.values = Array(N).fill(initial);
    this.tree = Array(N * 4).fill(initial);
    this.aggregate = aggregate;
  }
  update(i, value) {
    this.values[i] = value;
    this._update(0, this.N - 1, 1, i);
  }
  prefix(i) {
    return this._query(0, this.N - 1, 1, 0, i);
  }
  query(l, r) {
    return this._query(0, this.N - 1, 1, l, r);
  }
  higher(target) {
    return this._queryIndex(0, this.N - 1, 1, target, (value, target2) => value > target2);
  }
  ceil(target) {
    return this._queryIndex(0, this.N - 1, 1, target, (value, target2) => value >= target2);
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
  _queryIndex(l, r, ti, target, predicate) {
    if (l === r) {
      return predicate(this.tree[ti], target) ? l : Infinity;
    }
    const m = l + r >> 1;
    if (predicate(this.tree[ti * 2], target))
      return this._queryIndex(l, m, ti * 2, target, predicate);
    return this._queryIndex(m + 1, r, ti * 2 + 1, target - this.tree[ti * 2], predicate);
  }
  _query(l, r, ti, li, ri) {
    if (l === r || l === li && r === ri) {
      return this.tree[ti];
    }
    const m = l + r >> 1;
    const r1 = [li, Math.min(m, ri)];
    const r2 = [Math.max(m + 1, li), ri];
    let ans = this.initial;
    if (r1[0] <= r1[1]) {
      ans = this.aggregate(ans, this._query(l, m, ti * 2, r1[0], r1[1]));
    }
    if (r2[0] <= r2[1]) {
      ans = this.aggregate(ans, this._query(m + 1, r, ti * 2 + 1, r2[0], r2[1]));
    }
    return ans;
  }
};
export {
  SegmentTree
};
