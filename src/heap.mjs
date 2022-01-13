var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => {
  return {
    set _(value) {
      __privateSet(obj, member, value, setter);
    },
    get _() {
      return __privateGet(obj, member, getter);
    }
  };
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _invalidCount, _count, count_fn, _normalize, normalize_fn;
class Heap {
  constructor(data = [], cmp = (lhs, rhs) => lhs < rhs) {
    if (typeof data === "function") {
      cmp = data;
      data = [];
    }
    this.data = [null, ...data];
    this.lt = (i, j) => cmp(this.data[i], this.data[j]);
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
  swap(i, j) {
    const d = this.data;
    [d[i], d[j]] = [d[j], d[i]];
  }
}
class RemovableHeap {
  constructor(data = [], cmp = (lhs, rhs) => lhs < rhs) {
    __privateAdd(this, _count);
    __privateAdd(this, _normalize);
    __privateAdd(this, _invalidCount, void 0);
    this.heap = new Heap(data, cmp);
    this.counts = new Map();
    __privateSet(this, _invalidCount, 0);
  }
  size() {
    return this.heap.size() - __privateGet(this, _invalidCount);
  }
  top() {
    __privateMethod(this, _normalize, normalize_fn).call(this);
    return this.heap.top();
  }
  pop() {
    __privateMethod(this, _normalize, normalize_fn).call(this);
    if (this.heap.size() < 1)
      return void 0;
    const top = this.heap.pop();
    __privateMethod(this, _count, count_fn).call(this, top, -1);
    return top;
  }
  push(num) {
    __privateMethod(this, _count, count_fn).call(this, num, 1);
    this.heap.push(num);
  }
  remove(num) {
    if (Number(this.counts.get(num)) > 0) {
      __privateMethod(this, _count, count_fn).call(this, num, -1);
      __privateWrapper(this, _invalidCount)._++;
    }
  }
}
_invalidCount = new WeakMap();
_count = new WeakSet();
count_fn = function(num, diff) {
  var _a;
  const count = (_a = this.counts.get(num)) != null ? _a : 0;
  this.counts.set(num, count + diff);
};
_normalize = new WeakSet();
normalize_fn = function() {
  while (this.heap.size() && !this.counts.get(this.heap.top())) {
    this.heap.pop();
    __privateWrapper(this, _invalidCount)._--;
  }
};
class RemovableDoubleHeap {
  constructor(data = [], cmp = (lhs, rhs) => lhs < rhs) {
    this.min = new RemovableHeap(data, cmp);
    this.max = new RemovableHeap(data, (lhs, rhs) => !cmp(lhs, rhs));
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
}
export {
  Heap,
  RemovableDoubleHeap,
  RemovableHeap
};
