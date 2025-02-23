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

// src/bit.ts
var BIT = class {
  constructor(N2) {
    this.N = N2;
    this.sums = Array(N2 + 1).fill(0);
    this.nums = Array(N2 + 1).fill(0);
  }
  increment(n, diff) {
    this.nums[n] += diff;
    while (n <= this.N) {
      this.sums[n] += diff;
      n += n & -n;
    }
  }
  update(n, val) {
    this.increment(n, val - this.nums[n]);
  }
  sum(n) {
    let sum = 0;
    while (n > 0) {
      sum += this.sums[n];
      n -= n & -n;
    }
    return sum;
  }
};

// src/functional.ts
function create2DArray(N2, M, n) {
  return [...Array(N2)].map(() => Array(M).fill(n));
}
function create3DArray(N2, M, L, n) {
  return [...Array(N2)].map(() => create2DArray(M, L, n));
}
function memorized(fn, getKey = (...args) => args.join(",")) {
  const memo = new Map();
  return function(...args) {
    const key = getKey(...args);
    if (!memo.has(key)) {
      memo.set(key, fn(...args));
    }
    return memo.get(key);
  };
}
function* adjacent2D(arr, i, j) {
  for (const [di, dj] of [[-1, 0], [1, 0], [0, 1], [0, -1]]) {
    const ni = i + di;
    const nj = j + dj;
    if (valid2D(arr, ni, nj))
      yield [ni, nj];
  }
}
function valid2D(arr, i, j) {
  return i >= 0 && j >= 0 && i < arr.length && j < arr[i].length;
}

// src/algorithm.ts
function nextPermutation(arr) {
  let i = arr.length - 1;
  while (i > 0 && arr[i - 1] >= arr[i])
    i--;
  if (i <= 0) {
    reverse(arr);
    return false;
  }
  let j = i;
  while (j + 1 < arr.length && arr[i - 1] < arr[j + 1])
    j++;
  swap(arr, i - 1, j);
  reverse(arr, i);
  return true;
}
function prevPermutation(arr) {
  let i = arr.length - 1;
  while (i > 0 && arr[i - 1] <= arr[i])
    i--;
  if (i <= 0) {
    reverse(arr);
    return false;
  }
  let j = i;
  while (j + 1 < arr.length && arr[i - 1] > arr[j + 1])
    j++;
  swap(arr, i - 1, j);
  reverse(arr, i);
  return true;
}
function reverse(arr, begin = 0, end = arr.length) {
  while (begin < end - 1) {
    swap(arr, begin++, --end);
  }
}
function swap(arr, l, r) {
  const tmp = arr[l];
  arr[l] = arr[r];
  arr[r] = tmp;
}
function shuffle(arr) {
  const N2 = arr.length;
  for (let i = N2 - 1; i > 0; i--) {
    const j = Math.floor((i + 1) * Math.random());
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}
function sort(arr, begin = 0, end = arr.length, cmp = (l, r) => Number(l) - Number(r)) {
  if (end - begin <= 1)
    return arr;
  const pivot = arr[begin + end >> 1];
  const mi = partition(arr, (val) => cmp(val, pivot), begin, end);
  sort(arr, begin, mi, cmp);
  sort(arr, mi, end, cmp);
  return arr;
}
function partition(arr, pred, begin = 0, end = arr.length) {
  let lo = begin - 1;
  let hi = end;
  while (true) {
    do {
      lo++;
    } while (pred(arr[lo]) < 0);
    do {
      hi--;
    } while (pred(arr[hi]) > 0);
    if (lo >= hi)
      return lo;
    swap(arr, lo, hi);
  }
}
function dijkstra(source, G) {
  var _a, _b;
  const dist = new Map();
  const pq = new Heap([[0, source]], (l, r) => l[0] - r[0]);
  while (pq.size()) {
    const [d, u] = pq.pop();
    if (dist.has(u))
      continue;
    else
      dist.set(u, d);
    for (const [v, w] of (_a = G.get(u)) != null ? _a : []) {
      if (d + w < ((_b = dist.get(v)) != null ? _b : Infinity)) {
        if (!dist.has(v) || d + w < dist.get(v)) {
          pq.push([d + w, v]);
        }
      }
    }
  }
  return dist;
}

// src/string.ts
function kmp(s, p) {
  const N2 = s.length;
  const M = p.length;
  const T = [0];
  for (let i = 1, len = 0; i < M; ) {
    if (p[i] === p[len])
      T[i++] = ++len;
    else if (len)
      len = T[len - 1];
    else
      T[i++] = 0;
  }
  for (let i = 0, len = 0; i < N2; ) {
    if (s[i] === p[len]) {
      len++;
      i++;
      if (len === M)
        return i - M;
    } else if (len)
      len = T[len - 1];
    else
      i++;
  }
  return -1;
}
function rabinkarp(s, p) {
  const N2 = s.length;
  const M = p.length;
  const q = 1e9 + 7;
  const D = maxCharCode(s) + 1;
  let h = 1;
  for (let i = 0; i < M - 1; i++)
    h = h * D % q;
  let hash = 0;
  let target = 0;
  for (let i = 0; i < M; i++) {
    hash = (hash * D + code(s, i)) % q;
    target = (target * D + code(p, i)) % q;
  }
  for (let i = M; i <= N2; i++) {
    if (check(i - M))
      return i - M;
    if (i === N2)
      continue;
    hash = ((hash - h * code(s, i - M)) * D + code(s, i)) % q;
    if (hash < 0)
      hash += q;
  }
  return -1;
  function check(begin) {
    if (hash !== target)
      return false;
    for (let i = 0; i < M; i++)
      if (s[begin + i] !== p[i])
        return false;
    return true;
  }
}
function maxCharCode(s) {
  let D = 0;
  for (let i = 0; i < s.length; i++) {
    D = Math.max(D, s.charCodeAt(i));
  }
  return D;
}
function code(s, i) {
  return s.charCodeAt(i);
}

// src/bitset.ts
var BitSet = class {
  constructor(val = 0, N2 = Infinity) {
    this.N = N2;
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
    const RANGE = N2 === Infinity ? -1n : (1n << BigInt(N2)) - 1n;
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
};

// src/rbtree.ts
var RBTreeNode = class {
  constructor(data) {
    this.data = data;
    this.left = this.right = this.parent = null;
    this.color = 0;
    this.count = 1;
  }
  sibling() {
    if (!this.parent)
      return null;
    return this.isOnLeft() ? this.parent.right : this.parent.left;
  }
  isOnLeft() {
    return this === this.parent.left;
  }
  hasRedChild() {
    return Boolean(this.left && this.left.color === 0) || Boolean(this.right && this.right.color === 0);
  }
};
var RBTree = class {
  constructor(compare = (l, r) => l < r ? -1 : l > r ? 1 : 0) {
    this.root = null;
    this.lt = (l, r) => compare(l, r) < 0;
  }
  rotateLeft(pt) {
    const right = pt.right;
    pt.right = right.left;
    if (pt.right)
      pt.right.parent = pt;
    right.parent = pt.parent;
    if (!pt.parent)
      this.root = right;
    else if (pt === pt.parent.left)
      pt.parent.left = right;
    else
      pt.parent.right = right;
    right.left = pt;
    pt.parent = right;
  }
  rotateRight(pt) {
    const left = pt.left;
    pt.left = left.right;
    if (pt.left)
      pt.left.parent = pt;
    left.parent = pt.parent;
    if (!pt.parent)
      this.root = left;
    else if (pt === pt.parent.left)
      pt.parent.left = left;
    else
      pt.parent.right = left;
    left.right = pt;
    pt.parent = left;
  }
  swapColor(p1, p2) {
    const tmp = p1.color;
    p1.color = p2.color;
    p2.color = tmp;
  }
  swapData(p1, p2) {
    const tmp = p1.data;
    p1.data = p2.data;
    p2.data = tmp;
  }
  fixAfterInsert(pt) {
    var _a;
    let parent = null;
    let grandParent = null;
    while (pt !== this.root && pt.color !== 1 && ((_a = pt.parent) == null ? void 0 : _a.color) === 0) {
      parent = pt.parent;
      grandParent = pt.parent.parent;
      if (parent === (grandParent == null ? void 0 : grandParent.left)) {
        const uncle = grandParent.right;
        if (uncle && uncle.color === 0) {
          grandParent.color = 0;
          parent.color = 1;
          uncle.color = 1;
          pt = grandParent;
        } else {
          if (pt === parent.right) {
            this.rotateLeft(parent);
            pt = parent;
            parent = pt.parent;
          }
          this.rotateRight(grandParent);
          this.swapColor(parent, grandParent);
          pt = parent;
        }
      } else {
        const uncle = grandParent.left;
        if (uncle != null && uncle.color === 0) {
          grandParent.color = 0;
          parent.color = 1;
          uncle.color = 1;
          pt = grandParent;
        } else {
          if (pt === parent.left) {
            this.rotateRight(parent);
            pt = parent;
            parent = pt.parent;
          }
          this.rotateLeft(grandParent);
          this.swapColor(parent, grandParent);
          pt = parent;
        }
      }
    }
    this.root.color = 1;
  }
  delete(val) {
    const node = this.find(val);
    if (!node)
      return false;
    node.count--;
    if (!node.count)
      this.deleteNode(node);
    return true;
  }
  deleteAll(val) {
    const node = this.find(val);
    if (!node)
      return false;
    this.deleteNode(node);
    return true;
  }
  deleteNode(v) {
    const u = BSTreplace(v);
    const uvBlack = (u === null || u.color === 1) && v.color === 1;
    const parent = v.parent;
    if (!u) {
      if (v === this.root)
        this.root = null;
      else {
        if (uvBlack) {
          this.fixDoubleBlack(v);
        } else {
          if (v.sibling()) {
            v.sibling().color = 0;
          }
        }
        if (v.isOnLeft())
          parent.left = null;
        else
          parent.right = null;
      }
      return;
    }
    if (!v.left || !v.right) {
      if (v === this.root) {
        v.data = u.data;
        v.left = v.right = null;
      } else {
        if (v.isOnLeft())
          parent.left = u;
        else
          parent.right = u;
        u.parent = parent;
        if (uvBlack)
          this.fixDoubleBlack(u);
        else
          u.color = 1;
      }
      return;
    }
    this.swapData(u, v);
    this.deleteNode(u);
    function BSTreplace(x) {
      var _a;
      if (x.left && x.right)
        return successor(x.right);
      if (!x.left && !x.right)
        return null;
      return (_a = x.left) != null ? _a : x.right;
    }
    function successor(x) {
      let temp = x;
      while (temp.left)
        temp = temp.left;
      return temp;
    }
  }
  fixDoubleBlack(x) {
    if (x === this.root)
      return;
    const sibling = x.sibling();
    const parent = x.parent;
    if (!sibling) {
      this.fixDoubleBlack(parent);
    } else {
      if (sibling.color === 0) {
        parent.color = 0;
        sibling.color = 1;
        if (sibling.isOnLeft())
          this.rotateRight(parent);
        else
          this.rotateLeft(parent);
        this.fixDoubleBlack(x);
      } else {
        if (sibling.hasRedChild()) {
          if (sibling.left && sibling.left.color === 0) {
            if (sibling.isOnLeft()) {
              sibling.left.color = sibling.color;
              sibling.color = parent.color;
              this.rotateRight(parent);
            } else {
              sibling.left.color = parent.color;
              this.rotateRight(sibling);
              this.rotateLeft(parent);
            }
          } else {
            if (sibling.isOnLeft()) {
              sibling.right.color = parent.color;
              this.rotateLeft(sibling);
              this.rotateRight(parent);
            } else {
              sibling.right.color = sibling.color;
              sibling.color = parent.color;
              this.rotateLeft(parent);
            }
          }
          parent.color = 1;
        } else {
          sibling.color = 0;
          if (parent.color === 1)
            this.fixDoubleBlack(parent);
          else
            parent.color = 1;
        }
      }
    }
  }
  insert(data) {
    let parent = this.root;
    while (parent) {
      if (this.lt(data, parent.data)) {
        if (!parent.left)
          break;
        else
          parent = parent.left;
      } else if (this.lt(parent.data, data)) {
        if (!parent.right)
          break;
        else
          parent = parent.right;
      } else
        break;
    }
    const node = new RBTreeNode(data);
    if (!parent)
      this.root = node;
    else if (this.lt(node.data, parent.data))
      parent.left = node;
    else if (this.lt(parent.data, node.data))
      parent.right = node;
    else {
      parent.count++;
      return false;
    }
    node.parent = parent;
    this.fixAfterInsert(node);
    return true;
  }
  search(predicate, direction) {
    let p = this.root;
    let result = null;
    while (p) {
      if (predicate(p.data)) {
        result = p;
        p = p[direction];
      } else {
        p = p[direction === "left" ? "right" : "left"];
      }
    }
    return result == null ? void 0 : result.data;
  }
  find(data) {
    let p = this.root;
    while (p) {
      if (this.lt(data, p.data)) {
        p = p.left;
      } else if (this.lt(p.data, data)) {
        p = p.right;
      } else
        break;
    }
    return p != null ? p : null;
  }
  count(data) {
    const node = this.find(data);
    return node ? node.count : 0;
  }
  *inOrder(root = this.root) {
    if (!root)
      return;
    for (const v of this.inOrder(root.left))
      yield v;
    yield root.data;
    for (const v of this.inOrder(root.right))
      yield v;
  }
  *reverseInOrder(root = this.root) {
    if (!root)
      return;
    for (const v of this.reverseInOrder(root.right))
      yield v;
    yield root.data;
    for (const v of this.reverseInOrder(root.left))
      yield v;
  }
};

// src/treeset.ts
var TreeSet = class {
  constructor(collection = [], compare = (l, r) => l < r ? -1 : l > r ? 1 : 0) {
    if (typeof collection === "function") {
      compare = collection;
      collection = [];
    }
    this._size = 0;
    this.compare = compare;
    this.tree = new RBTree(compare);
    for (const val of collection)
      this.add(val);
  }
  size() {
    return this._size;
  }
  has(val) {
    return !!this.tree.find(val);
  }
  add(val) {
    const successful = this.tree.insert(val);
    this._size += successful ? 1 : 0;
    return successful;
  }
  delete(val) {
    const deleted = this.tree.deleteAll(val);
    this._size -= deleted ? 1 : 0;
    return deleted;
  }
  ceil(target) {
    return this.tree.search((val) => this.compare(val, target) >= 0, "left");
  }
  floor(target) {
    return this.tree.search((val) => this.compare(val, target) <= 0, "right");
  }
  higher(target) {
    return this.tree.search((val) => this.compare(val, target) > 0, "left");
  }
  lower(target) {
    return this.tree.search((val) => this.compare(val, target) < 0, "right");
  }
  first() {
    return this.tree.inOrder().next().value;
  }
  last() {
    return this.tree.reverseInOrder().next().value;
  }
  shift() {
    const first = this.first();
    if (first === void 0)
      return void 0;
    this.delete(first);
    return first;
  }
  pop() {
    const last = this.last();
    if (last === void 0)
      return void 0;
    this.delete(last);
    return last;
  }
  *[Symbol.iterator]() {
    for (const val of this.values())
      yield val;
  }
  *keys() {
    for (const val of this.values())
      yield val;
  }
  *values() {
    for (const val of this.tree.inOrder())
      yield val;
    return void 0;
  }
  *rvalues() {
    for (const val of this.tree.reverseInOrder())
      yield val;
    return void 0;
  }
};
var TreeMultiSet = class {
  constructor(collection = [], compare = (l, r) => l < r ? -1 : l > r ? 1 : 0) {
    if (typeof collection === "function") {
      compare = collection;
      collection = [];
    }
    this._size = 0;
    this.compare = compare;
    this.tree = new RBTree(compare);
    for (const val of collection)
      this.add(val);
  }
  size() {
    return this._size;
  }
  has(val) {
    return !!this.tree.find(val);
  }
  add(val) {
    const successful = this.tree.insert(val);
    this._size++;
    return successful;
  }
  delete(val) {
    const successful = this.tree.delete(val);
    if (!successful)
      return false;
    this._size--;
    return true;
  }
  deleteAll(val) {
    let successful = false;
    while (this.tree.delete(val)) {
      this._size--;
      successful = true;
    }
    return successful;
  }
  count(val) {
    const node = this.tree.find(val);
    return node ? node.count : 0;
  }
  ceil(target) {
    return this.tree.search((val) => this.compare(val, target) >= 0, "left");
  }
  floor(target) {
    return this.tree.search((val) => this.compare(val, target) <= 0, "right");
  }
  higher(target) {
    return this.tree.search((val) => this.compare(val, target) > 0, "left");
  }
  lower(target) {
    return this.tree.search((val) => this.compare(val, target) < 0, "right");
  }
  first() {
    return this.tree.inOrder().next().value;
  }
  last() {
    return this.tree.reverseInOrder().next().value;
  }
  shift() {
    const first = this.first();
    if (first === void 0)
      return void 0;
    this.delete(first);
    return first;
  }
  pop() {
    const last = this.last();
    if (last === void 0)
      return void 0;
    this.delete(last);
    return last;
  }
  *[Symbol.iterator]() {
    yield* this.values();
  }
  *keys() {
    for (const val of this.values())
      yield val;
  }
  *values() {
    for (const val of this.tree.inOrder()) {
      let count = this.count(val);
      while (count--)
        yield val;
    }
    return void 0;
  }
  *rvalues() {
    for (const val of this.tree.reverseInOrder()) {
      let count = this.count(val);
      while (count--)
        yield val;
    }
    return void 0;
  }
};

// src/dsu.ts
var DSU = class {
  constructor(N2) {
    this.parent = Array(N2).fill(0).map((x, i) => i);
    this.rank = Array(N2).fill(0);
  }
  find(x) {
    if (this.parent[x] === x)
      return x;
    return this.parent[x] = this.find(this.parent[x]);
  }
  union(x, y) {
    x = this.find(x);
    y = this.find(y);
    if (x === y)
      return;
    if (this.rank[x] < this.rank[y]) {
      this.parent[x] = y;
    } else if (this.rank[x] > this.rank[y]) {
      this.parent[y] = x;
    } else {
      this.parent[x] = y;
      this.rank[y]++;
    }
  }
};

// src/deque.ts
var CircularDeque = class {
  constructor(N2) {
    this.prev = this.next = null;
    this.begin = this.end = 0;
    this.empty = true;
    this.data = Array(N2);
  }
  isFull() {
    return this.end === this.begin && !this.empty;
  }
  isEmpty() {
    return this.empty;
  }
  push(val) {
    if (this.isFull())
      return false;
    this.empty = false;
    this.data[this.end] = val;
    this.end = (this.end + 1) % this.data.length;
    return true;
  }
  front() {
    return this.isEmpty() ? void 0 : this.data[this.begin];
  }
  back() {
    return this.isEmpty() ? void 0 : this.data[this.end - 1];
  }
  pop() {
    if (this.isEmpty())
      return void 0;
    const value = this.data[this.end - 1];
    this.end = (this.end - 1) % this.data.length;
    if (this.end < 0)
      this.end += this.data.length;
    if (this.end === this.begin)
      this.empty = true;
    return value;
  }
  unshift(val) {
    if (this.isFull())
      return false;
    this.empty = false;
    this.begin = (this.begin - 1) % this.data.length;
    if (this.begin < 0)
      this.begin += this.data.length;
    this.data[this.begin] = val;
    return true;
  }
  shift() {
    if (this.isEmpty())
      return void 0;
    const value = this.data[this.begin];
    this.begin = (this.begin + 1) % this.data.length;
    if (this.end === this.begin)
      this.empty = true;
    return value;
  }
  *values() {
    if (this.isEmpty())
      return void 0;
    let i = this.begin;
    do {
      yield this.data[i];
      i = (i + 1) % this.data.length;
    } while (i !== this.end);
  }
};
var Deque = class {
  constructor(collection = []) {
    this.head = new CircularDeque(128);
    this.tail = new CircularDeque(128);
    this.tail.empty = this.head.empty = false;
    this.tail.prev = this.head;
    this.head.next = this.tail;
    this._size = 0;
    for (const item of collection)
      this.push(item);
  }
  size() {
    return this._size;
  }
  push(val) {
    let last = this.tail.prev;
    if (last.isFull()) {
      const inserted = new CircularDeque(128);
      this.tail.prev = inserted;
      inserted.next = this.tail;
      last.next = inserted;
      inserted.prev = last;
      last = inserted;
    }
    last.push(val);
    this._size++;
  }
  back() {
    if (this._size === 0)
      return;
    return this.tail.prev.back();
  }
  pop() {
    if (this.head.next === this.tail)
      return void 0;
    const last = this.tail.prev;
    const value = last.pop();
    if (last.isEmpty()) {
      this.tail.prev = last.prev;
      last.prev.next = this.tail;
    }
    this._size--;
    return value;
  }
  unshift(val) {
    let first = this.head.next;
    if (first.isFull()) {
      const inserted = new CircularDeque(128);
      this.head.next = inserted;
      inserted.prev = this.head;
      inserted.next = first;
      first.prev = inserted;
      first = inserted;
    }
    first.unshift(val);
    this._size++;
  }
  shift() {
    if (this.head.next === this.tail)
      return void 0;
    const first = this.head.next;
    const value = first.shift();
    if (first.isEmpty()) {
      this.head.next = first.next;
      first.next.prev = this.head;
    }
    this._size--;
    return value;
  }
  front() {
    if (this._size === 0)
      return void 0;
    return this.head.next.front();
  }
  *values() {
    let node = this.head.next;
    while (node !== this.tail) {
      for (const value of node.values())
        yield value;
      node = node.next;
    }
  }
};

// src/prime.ts
function eulersSieve(n) {
  const primes = [];
  const isPrime2 = Array(n + 1).fill(true);
  for (let cand = 2; cand <= n; cand++) {
    if (isPrime2[cand])
      primes.push(cand);
    for (const prime2 of primes) {
      if (prime2 * cand > n)
        break;
      isPrime2[prime2 * cand] = false;
      if (cand % prime2 === 0)
        break;
    }
  }
  return primes;
}
function eratosthenesSieve(n) {
  const isPrime2 = Array(n + 1).fill(true);
  for (let p = 2; p * p <= n; p++) {
    if (isPrime2[p]) {
      for (let j = p * p; j <= n; j += p) {
        isPrime2[j] = false;
      }
    }
  }
  const primes = [];
  for (let i = 2; i <= n; i++)
    if (isPrime2[i])
      primes.push(i);
  return primes;
}
function prime(nth) {
  let f = 20;
  if (nth > 5e7)
    f = 50;
  if (nth > 1e22)
    f = 100;
  return primesLeq(f * nth)[nth - 1];
}
function primesLeq(n) {
  return n < 1e3 ? eratosthenesSieve(n) : eulersSieve(n);
}
function isPrime(n) {
  if (n < 2)
    return false;
  const primes = primesLeq(Math.floor(Math.sqrt(n)));
  for (const p of primes)
    if (n % p === 0)
      return false;
  return true;
}
function primeFactors(n) {
  const factors = new Map();
  const sqrt = Math.sqrt(n);
  for (let f = 2; f <= sqrt; f++) {
    let count = 0;
    while (n % f === 0) {
      n /= f;
      count++;
    }
    if (count)
      factors.set(f, count);
  }
  if (n > 1)
    factors.set(n, 1);
  return factors;
}

// src/euclidean.ts
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
function gcdExtended(a, b) {
  if (b === 0)
    return [a, 1, 0];
  const [gcd2, x, y] = gcdExtended(b, a % b);
  return [gcd2, y, x - Math.floor(a / b) * y];
}
function modInverse(a, M) {
  const [gcd2, x] = gcdExtended(a, M);
  if (gcd2 !== 1)
    throw new Error("inverse not exist");
  return (x % M + M) % M;
}

// src/binomial.ts
var N = 1e5;
var MOD = 1e9 + 7;
var MODn = BigInt(MOD);
var fact = getFactorials();
var factInvs = getFactorialInvs();
function getFactorials() {
  const fact2 = [1n];
  for (let i = 1; i <= N; i++)
    fact2.push(fact2[i - 1] * BigInt(i) % MODn);
  return fact2.map((x) => Number(x));
}
function getFactorialInvs() {
  const arr = Array(N + 1);
  arr[N] = power(fact[N], MOD - 2);
  for (let i = N - 1; i >= 0; i--) {
    arr[i] = prod(arr[i + 1], i + 1);
  }
  return arr;
}
function power(x, p) {
  if (!p)
    return 1;
  if (p % 2)
    return prod(power(x, p - 1), x);
  const h = power(x, p / 2);
  return prod(h, h) % MOD;
}
function pascalsTriangle(N2) {
  const C = [[1n]];
  for (let n = 1; n <= N2; ++n) {
    C.push(Array(n + 1));
    C[n][0] = C[n][n] = 1n;
    for (let k = 1; k < n; ++k) {
      C[n][k] = (C[n - 1][k - 1] + C[n - 1][k]) % MODn;
    }
  }
  for (let n = 0; n <= N2; n++)
    for (let k = 0; k <= n; k++)
      C[n][k] = Number(C[n][k]);
  return C;
}
function combination(n, k) {
  return prod(fact[n], factInvs[k], factInvs[n - k]);
}
function arrangement(n, k) {
  return prod(fact[n], factInvs[n - k]);
}
function prod(...args) {
  let p = 1n;
  for (const arg of args) {
    p = p * BigInt(arg) % MODn;
  }
  return Number(p);
}

// src/segment-tree.ts
var SegmentTree = class {
  constructor(N2, aggregate = (a, b) => a + b, initial = 0) {
    this.N = N2;
    this.tree = Array(N2 * 4).fill(initial);
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

// src/queue.ts
var ListNode = class {
  constructor(val = void 0, next = null) {
    this.value = val;
    this.next = next;
  }
};
var Queue = class {
  constructor(collection = []) {
    this.lead = new ListNode();
    this.tail = this.lead;
    this._size = 0;
    for (const item of collection)
      this.push(item);
  }
  size() {
    return this._size;
  }
  push(value) {
    this.tail = this.tail.next = new ListNode(value);
    this._size++;
  }
  back() {
    return this.tail.value;
  }
  shift() {
    if (!this._size)
      return void 0;
    const first = this.lead.next;
    this.lead.next = first.next;
    this._size--;
    if (this._size === 0)
      this.tail = this.lead;
    return first.value;
  }
  front() {
    if (!this._size)
      return void 0;
    return this.lead.next.value;
  }
  *values() {
    let node = this.lead.next;
    while (node) {
      yield node.value;
      node = node.next;
    }
  }
};

// src/rolling-hash.ts
var BiRollingHash = class {
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
    return k1 + (1e9 + 7) * k2;
  }
};
var RollingHash = class {
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
};

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
  constructor(M = 1e5 + 7, MOD2 = 1e9 + 7) {
    this.key = 0;
    this.M = M;
    this.MOD = MOD2;
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

// src/treap.ts
var TreapNode = class {
  constructor(value) {
    this.value = value;
    this.count = 1;
    this.size = 1;
    this.priority = Math.random();
    this.left = null;
    this.right = null;
  }
  static getSize(node) {
    var _a;
    return (_a = node == null ? void 0 : node.size) != null ? _a : 0;
  }
  static getFac(node) {
    var _a;
    return (_a = node == null ? void 0 : node.priority) != null ? _a : 0;
  }
  pushUp() {
    let tmp = this.count;
    tmp += TreapNode.getSize(this.left);
    tmp += TreapNode.getSize(this.right);
    this.size = tmp;
  }
  rotateRight() {
    var _a, _b;
    let node = this;
    const left = node.left;
    node.left = (_a = left == null ? void 0 : left.right) != null ? _a : null;
    left && (left.right = node);
    left && (node = left);
    (_b = node.right) == null ? void 0 : _b.pushUp();
    node.pushUp();
    return node;
  }
  rotateLeft() {
    var _a, _b;
    let node = this;
    const right = node.right;
    node.right = (_a = right == null ? void 0 : right.left) != null ? _a : null;
    right && (right.left = node);
    right && (node = right);
    (_b = node.left) == null ? void 0 : _b.pushUp();
    node.pushUp();
    return node;
  }
};
var TreapMultiSet = class {
  constructor(compareFn = (a, b) => a - b, leftBound = -Infinity, rightBound = Infinity) {
    this.root = new TreapNode(rightBound);
    this.root.priority = Infinity;
    this.root.left = new TreapNode(leftBound);
    this.root.left.priority = -Infinity;
    this.root.pushUp();
    this.leftBound = leftBound;
    this.rightBound = rightBound;
    this.compareFn = compareFn;
  }
  get size() {
    return this.root.size - 2;
  }
  get height() {
    const getHeight = (node) => {
      if (node == null)
        return 0;
      return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    };
    return getHeight(this.root);
  }
  has(value) {
    const compare = this.compareFn;
    const dfs = (node, value2) => {
      if (node == null)
        return false;
      if (compare(node.value, value2) === 0)
        return true;
      if (compare(node.value, value2) < 0)
        return dfs(node.right, value2);
      return dfs(node.left, value2);
    };
    return dfs(this.root, value);
  }
  add(...values) {
    const compare = this.compareFn;
    const dfs = (node, value, parent, direction) => {
      if (node == null)
        return;
      if (compare(node.value, value) === 0) {
        node.count++;
        node.pushUp();
      } else if (compare(node.value, value) > 0) {
        if (node.left) {
          dfs(node.left, value, node, "left");
        } else {
          node.left = new TreapNode(value);
          node.pushUp();
        }
        if (TreapNode.getFac(node.left) > node.priority) {
          parent[direction] = node.rotateRight();
        }
      } else if (compare(node.value, value) < 0) {
        if (node.right) {
          dfs(node.right, value, node, "right");
        } else {
          node.right = new TreapNode(value);
          node.pushUp();
        }
        if (TreapNode.getFac(node.right) > node.priority) {
          parent[direction] = node.rotateLeft();
        }
      }
      parent.pushUp();
    };
    values.forEach((value) => dfs(this.root.left, value, this.root, "left"));
    return this;
  }
  delete(value) {
    const compare = this.compareFn;
    const dfs = (node, value2, parent, direction) => {
      var _a, _b, _c, _d;
      if (node == null)
        return;
      if (compare(node.value, value2) === 0) {
        if (node.count > 1) {
          node.count--;
          node == null ? void 0 : node.pushUp();
        } else if (node.left == null && node.right == null) {
          parent[direction] = null;
        } else {
          if (node.right == null || TreapNode.getFac(node.left) > TreapNode.getFac(node.right)) {
            parent[direction] = node.rotateRight();
            dfs((_b = (_a = parent[direction]) == null ? void 0 : _a.right) != null ? _b : null, value2, parent[direction], "right");
          } else {
            parent[direction] = node.rotateLeft();
            dfs((_d = (_c = parent[direction]) == null ? void 0 : _c.left) != null ? _d : null, value2, parent[direction], "left");
          }
        }
      } else if (compare(node.value, value2) > 0) {
        dfs(node.left, value2, node, "left");
      } else if (compare(node.value, value2) < 0) {
        dfs(node.right, value2, node, "right");
      }
      parent == null ? void 0 : parent.pushUp();
    };
    dfs(this.root.left, value, this.root, "left");
  }
  bisectLeft(value) {
    const compare = this.compareFn;
    const dfs = (node, value2) => {
      if (node == null)
        return 0;
      if (compare(node.value, value2) === 0) {
        return TreapNode.getSize(node.left);
      } else if (compare(node.value, value2) > 0) {
        return dfs(node.left, value2);
      } else if (compare(node.value, value2) < 0) {
        return dfs(node.right, value2) + TreapNode.getSize(node.left) + node.count;
      }
      return 0;
    };
    return dfs(this.root, value) - 1;
  }
  bisectRight(value) {
    const compare = this.compareFn;
    const dfs = (node, value2) => {
      if (node == null)
        return 0;
      if (compare(node.value, value2) === 0) {
        return TreapNode.getSize(node.left) + node.count;
      } else if (compare(node.value, value2) > 0) {
        return dfs(node.left, value2);
      } else if (compare(node.value, value2) < 0) {
        return dfs(node.right, value2) + TreapNode.getSize(node.left) + node.count;
      }
      return 0;
    };
    return dfs(this.root, value) - 1;
  }
  indexOf(value) {
    const compare = this.compareFn;
    let isExist = false;
    const dfs = (node, value2) => {
      if (node == null)
        return 0;
      if (compare(node.value, value2) === 0) {
        isExist = true;
        return TreapNode.getSize(node.left);
      } else if (compare(node.value, value2) > 0) {
        return dfs(node.left, value2);
      } else if (compare(node.value, value2) < 0) {
        return dfs(node.right, value2) + TreapNode.getSize(node.left) + node.count;
      }
      return 0;
    };
    const res = dfs(this.root, value) - 1;
    return isExist ? res : -1;
  }
  lastIndexOf(value) {
    const compare = this.compareFn;
    let isExist = false;
    const dfs = (node, value2) => {
      if (node == null)
        return 0;
      if (compare(node.value, value2) === 0) {
        isExist = true;
        return TreapNode.getSize(node.left) + node.count - 1;
      } else if (compare(node.value, value2) > 0) {
        return dfs(node.left, value2);
      } else if (compare(node.value, value2) < 0) {
        return dfs(node.right, value2) + TreapNode.getSize(node.left) + node.count;
      }
      return 0;
    };
    const res = dfs(this.root, value) - 1;
    return isExist ? res : -1;
  }
  at(index) {
    if (index < 0)
      index += this.size;
    if (index < 0 || index >= this.size)
      return void 0;
    const dfs = (node, rank) => {
      if (node == null)
        return void 0;
      if (TreapNode.getSize(node.left) >= rank) {
        return dfs(node.left, rank);
      } else if (TreapNode.getSize(node.left) + node.count >= rank) {
        return node.value;
      } else {
        return dfs(node.right, rank - TreapNode.getSize(node.left) - node.count);
      }
    };
    const res = dfs(this.root, index + 2);
    return [this.leftBound, this.rightBound].includes(res) ? void 0 : res;
  }
  lower(value) {
    const compare = this.compareFn;
    const dfs = (node, value2) => {
      if (node == null)
        return void 0;
      if (compare(node.value, value2) >= 0)
        return dfs(node.left, value2);
      const tmp = dfs(node.right, value2);
      if (tmp == null || compare(node.value, tmp) > 0) {
        return node.value;
      } else {
        return tmp;
      }
    };
    const res = dfs(this.root, value);
    return res === this.leftBound ? void 0 : res;
  }
  higher(value) {
    const compare = this.compareFn;
    const dfs = (node, value2) => {
      if (node == null)
        return void 0;
      if (compare(node.value, value2) <= 0)
        return dfs(node.right, value2);
      const tmp = dfs(node.left, value2);
      if (tmp == null || compare(node.value, tmp) < 0) {
        return node.value;
      } else {
        return tmp;
      }
    };
    const res = dfs(this.root, value);
    return res === this.rightBound ? void 0 : res;
  }
  floor(value) {
    const compare = this.compareFn;
    const dfs = (node, value2) => {
      if (node == null)
        return void 0;
      if (compare(node.value, value2) === 0)
        return node.value;
      if (compare(node.value, value2) >= 0)
        return dfs(node.left, value2);
      const tmp = dfs(node.right, value2);
      if (tmp == null || compare(node.value, tmp) > 0) {
        return node.value;
      } else {
        return tmp;
      }
    };
    const res = dfs(this.root, value);
    return res === this.leftBound ? void 0 : res;
  }
  ceil(value) {
    const compare = this.compareFn;
    const dfs = (node, value2) => {
      if (node == null)
        return void 0;
      if (compare(node.value, value2) === 0)
        return node.value;
      if (compare(node.value, value2) <= 0)
        return dfs(node.right, value2);
      const tmp = dfs(node.left, value2);
      if (tmp == null || compare(node.value, tmp) < 0) {
        return node.value;
      } else {
        return tmp;
      }
    };
    const res = dfs(this.root, value);
    return res === this.rightBound ? void 0 : res;
  }
  first() {
    const iter = this.inOrder();
    iter.next();
    const res = iter.next().value;
    return res === this.rightBound ? void 0 : res;
  }
  last() {
    const iter = this.reverseInOrder();
    iter.next();
    const res = iter.next().value;
    return res === this.leftBound ? void 0 : res;
  }
  shift() {
    const first = this.first();
    if (first === void 0)
      return void 0;
    this.delete(first);
    return first;
  }
  pop(index) {
    if (index == null) {
      const last = this.last();
      if (last === void 0)
        return void 0;
      this.delete(last);
      return last;
    }
    const toDelete = this.at(index);
    if (toDelete == null)
      return;
    this.delete(toDelete);
    return toDelete;
  }
  count(value) {
    const compare = this.compareFn;
    const dfs = (node, value2) => {
      if (node == null)
        return 0;
      if (compare(node.value, value2) === 0)
        return node.count;
      if (compare(node.value, value2) < 0)
        return dfs(node.right, value2);
      return dfs(node.left, value2);
    };
    return dfs(this.root, value);
  }
  *[Symbol.iterator]() {
    yield* this.values();
  }
  *keys() {
    yield* this.values();
  }
  *values() {
    const iter = this.inOrder();
    iter.next();
    const steps = this.size;
    for (let _ = 0; _ < steps; _++) {
      yield iter.next().value;
    }
  }
  *rvalues() {
    const iter = this.reverseInOrder();
    iter.next();
    const steps = this.size;
    for (let _ = 0; _ < steps; _++) {
      yield iter.next().value;
    }
  }
  *entries() {
    const iter = this.inOrder();
    iter.next();
    const steps = this.size;
    for (let i = 0; i < steps; i++) {
      yield [i, iter.next().value];
    }
  }
  *inOrder(root = this.root) {
    if (root == null)
      return;
    yield* this.inOrder(root.left);
    const count = root.count;
    for (let _ = 0; _ < count; _++) {
      yield root.value;
    }
    yield* this.inOrder(root.right);
  }
  *reverseInOrder(root = this.root) {
    if (root == null)
      return;
    yield* this.reverseInOrder(root.right);
    const count = root.count;
    for (let _ = 0; _ < count; _++) {
      yield root.value;
    }
    yield* this.reverseInOrder(root.left);
  }
};

// src/tree.ts
function createTree(N2, edges) {
  const nodes = Array(N2).fill(0).map((_x, index) => ({ index, children: new Set(), depth: 0, parent: void 0 }));
  const G = Array(N2).fill(0).map((_x) => new Set());
  for (const [u, v] of edges) {
    G[u].add(v);
    G[v].add(u);
  }
  const root = nodes[0];
  const added = new Set([root]);
  for (const node of added) {
    for (const j of G[node.index]) {
      if (!added.has(nodes[j])) {
        node.children.add(nodes[j]);
        nodes[j].parent = node;
        nodes[j].depth = node.depth + 1;
        added.add(nodes[j]);
      }
    }
  }
  return nodes;
}
function createWeightedTree(N2, edges) {
  const nodes = Array(N2).fill(0).map((_x, index) => ({ index, children: new Map(), depth: 0, parent: void 0 }));
  const G = Array(N2).fill(0).map((_x) => new Map());
  for (const [u, v, w = 1] of edges) {
    G[u].set(v, w);
    G[v].set(u, w);
  }
  const root = nodes[0];
  const added = new Set([root]);
  for (const node of added) {
    for (const [j, w] of G[node.index]) {
      if (!added.has(nodes[j])) {
        node.children.set(nodes[j], w);
        nodes[j].parent = node;
        nodes[j].depth = node.depth + 1;
        added.add(nodes[j]);
      }
    }
  }
  return nodes;
}
var LCA = class {
  constructor(nodes) {
    this.depths = nodes.map((x) => x.depth);
    this.N = nodes.length;
    this.B = Math.floor(Math.log2(this.N));
    this.ancestors = Array(this.N).fill(0).map((_x) => Array(this.B + 1).fill(-1));
    for (const node of nodes)
      this.ancestors[node.index][0] = node.parent ? node.parent.index : -1;
    for (let b = 1; b <= this.B; b++) {
      for (let i = 0; i < this.N; i++) {
        if (this.ancestors[i][b - 1] !== -1) {
          this.ancestors[i][b] = this.ancestors[this.ancestors[i][b - 1]][b - 1];
        }
      }
    }
  }
  getLCA(u, v) {
    if (this.depths[u] < this.depths[v])
      return this.getLCA(v, u);
    for (let b = this.B; b >= 0; b--) {
      if (this.ancestors[u][b] !== -1 && this.depths[this.ancestors[u][b]] >= this.depths[v]) {
        u = this.ancestors[u][b];
      }
    }
    if (u === v)
      return u;
    for (let b = this.B; b >= 0; b--) {
      if (this.ancestors[u][b] !== this.ancestors[v][b]) {
        u = this.ancestors[u][b];
        v = this.ancestors[v][b];
      }
    }
    return this.ancestors[u][0];
  }
};
export {
  BIT,
  BiRollingHash,
  BiStringHash,
  BitSet,
  CircularDeque,
  DSU,
  Deque,
  Heap,
  LCA,
  ListNode,
  MOD,
  PriorityQueue,
  Queue,
  RBTree,
  RBTreeNode,
  RemovableDoubleHeap,
  RemovableHeap,
  RollingHash,
  SegmentTree,
  StringHash,
  TreapMultiSet,
  TreeMultiSet,
  TreeSet,
  adjacent2D,
  arrangement,
  code,
  combination,
  create2DArray,
  create3DArray,
  createTree,
  createWeightedTree,
  dijkstra,
  eratosthenesSieve,
  eulersSieve,
  fact,
  factInvs,
  gcd,
  gcdExtended,
  getFactorials,
  isPrime,
  kmp,
  maxCharCode,
  memorized,
  modInverse,
  nextPermutation,
  partition,
  pascalsTriangle,
  power,
  prevPermutation,
  prime,
  primeFactors,
  primesLeq,
  prod,
  rabinkarp,
  reverse,
  shuffle,
  sort,
  swap,
  valid2D
};
