// src/heap.ts
var Heap = class {
  constructor(data = [], compare = (lhs, rhs) => lhs < rhs ? -1 : lhs > rhs ? 1 : 0) {
    if (typeof data === "function") {
      compare = data;
      data = [];
    }
    this.data = [null, ...data];
    this.lt = (i, j) => compare(this.data[i], this.data[j]) < 0;
    for (let i = this.size(); i > 0; i--)
      this.heapify(i);
  }
  size() {
    return this.data.length - 1;
  }
  push(v) {
    this.data.push(v);
    let i = this.size();
    while (i >> 1 !== 0 && this.lt(i, i >> 1))
      this.swap(i, i >>= 1);
  }
  pop() {
    this.swap(1, this.size());
    const top = this.data.pop();
    this.heapify(1);
    return top;
  }
  top() {
    return this.data[1];
  }
  heapify(i) {
    while (true) {
      let min = i;
      const [l, r, n] = [i * 2, i * 2 + 1, this.data.length];
      if (l < n && this.lt(l, min))
        min = l;
      if (r < n && this.lt(r, min))
        min = r;
      if (min !== i) {
        this.swap(i, min);
        i = min;
      } else
        break;
    }
  }
  clear() {
    this.data = [null];
  }
  swap(i, j) {
    const d = this.data;
    [d[i], d[j]] = [d[j], d[i]];
  }
};
var RemovableHeap = class {
  constructor(data = [], cmp) {
    this.heap = new Heap(data, cmp);
    this.counts = new Map();
    this._size = 0;
    for (let i = 1; i < this.heap.data.length; i++) {
      this.count(this.heap.data[i], 1);
    }
  }
  size() {
    return this._size;
  }
  top() {
    this._normalize();
    return this.heap.top();
  }
  pop() {
    this._normalize();
    if (this.heap.size() < 1)
      return void 0;
    const top = this.heap.pop();
    this.count(top, -1);
    return top;
  }
  push(num) {
    this.count(num, 1);
    this.heap.push(num);
  }
  remove(num) {
    if (Number(this.counts.get(num)) > 0) {
      this.count(num, -1);
    }
  }
  has(value) {
    return this.counts.get(value) > 0;
  }
  count(num, diff = 1) {
    var _a;
    const count = (_a = this.counts.get(num)) != null ? _a : 0;
    this.counts.set(num, count + diff);
    this._size += diff;
  }
  _normalize() {
    while (this.heap.size() && !this.counts.get(this.heap.top())) {
      this.heap.pop();
    }
  }
};
var RemovableDoubleHeap = class {
  constructor(data = [], cmp = (lhs, rhs) => lhs < rhs ? -1 : lhs > rhs ? 1 : 0) {
    this.min = new RemovableHeap(data, cmp);
    this.max = new RemovableHeap(data, (lhs, rhs) => -cmp(lhs, rhs));
  }
  popMin() {
    const min = this.min.pop();
    this.max.remove(min);
    return min;
  }
  popMax() {
    const max = this.max.pop();
    this.min.remove(max);
    return max;
  }
  remove(num) {
    this.min.remove(num);
    this.max.remove(num);
  }
  size() {
    return this.min.size();
  }
  push(num) {
    this.min.push(num);
    this.max.push(num);
  }
};
var PriorityQueue = class extends RemovableHeap {
  offer(value) {
    return this.push(value);
  }
  poll() {
    return this.pop();
  }
  peek() {
    return this.top();
  }
};
export {
  Heap,
  PriorityQueue,
  RemovableDoubleHeap,
  RemovableHeap
};
