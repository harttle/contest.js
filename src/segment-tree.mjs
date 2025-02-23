// src/segment-tree.ts
var SegmentTree = class {
  constructor(N, aggregate = (a, b) => a + b, initial = 0) {
    this.N = N;
    this.tree = Array(N * 4).fill(initial);
    this.aggregate = aggregate;
    this.initial = initial;
  }
  update(idx, val, node = 1, start = 0, end = this.N - 1) {
    if (start === end)
      this.tree[node] = val;
    else {
      const mid = Math.floor((start + end) / 2);
      if (idx <= mid)
        this.update(idx, val, node * 2, start, mid);
      else
        this.update(idx, val, node * 2 + 1, mid + 1, end);
      this.tree[node] = this.aggregate(this.tree[node * 2], this.tree[node * 2 + 1]);
    }
  }
  query(l, r, node = 1, start = 0, end = this.N - 1) {
    if (l <= start && end <= r)
      return this.tree[node];
    if (r < start || end < l)
      return this.initial;
    const mi = Math.floor((start + end) / 2);
    const lval = this.query(l, r, node * 2, start, mi);
    const rval = this.query(l, r, node * 2 + 1, mi + 1, end);
    return this.aggregate(lval, rval);
  }
  prefix(r) {
    return this.query(0, r);
  }
  findPrefix(pred, node = 1, start = 0, end = this.N - 1) {
    if (start === end)
      return pred(this.tree[node]) ? end : -1;
    const mi = Math.floor((start + end) / 2);
    if (pred(this.tree[node * 2]))
      return this.findPrefix(pred, node * 2, start, mi);
    return this.findPrefix((val) => pred(this.aggregate(val, this.tree[node * 2])), node * 2 + 1, mi + 1, end);
  }
  higher(target) {
    return this.findPrefix((value) => value > target);
  }
  ceil(target) {
    return this.findPrefix((value) => value >= target);
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
  SegmentTree
};
