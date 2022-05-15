import { RBTree } from "./rbtree";
class TreeSet {
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
    const added = this.tree.insert(val);
    this._size += added ? 1 : 0;
    return added;
  }
  delete(val) {
    const deleted = this.tree.deleteByValue(val);
    this._size -= deleted ? 1 : 0;
    return deleted;
  }
  ceiling(val) {
    let p = this.tree.root;
    let higher = null;
    while (p) {
      if (this.compare(p.data, val) >= 0) {
        higher = p;
        p = p.left;
      } else {
        p = p.right;
      }
    }
    return higher == null ? void 0 : higher.data;
  }
  floor(val) {
    let p = this.tree.root;
    let lower = null;
    while (p) {
      if (this.compare(val, p.data) >= 0) {
        lower = p;
        p = p.right;
      } else {
        p = p.left;
      }
    }
    return lower == null ? void 0 : lower.data;
  }
  higher(val) {
    let p = this.tree.root;
    let higher = null;
    while (p) {
      if (this.compare(val, p.data) < 0) {
        higher = p;
        p = p.left;
      } else {
        p = p.right;
      }
    }
    return higher == null ? void 0 : higher.data;
  }
  lower(val) {
    let p = this.tree.root;
    let lower = null;
    while (p) {
      if (this.compare(p.data, val) < 0) {
        lower = p;
        p = p.right;
      } else {
        p = p.left;
      }
    }
    return lower == null ? void 0 : lower.data;
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
}
class TreeMultiSet {
  constructor(collection = [], compare = (l, r) => l < r ? -1 : l > r ? 1 : 0) {
    if (typeof collection === "function") {
      compare = collection;
      collection = [];
    }
    this._size = 0;
    this.compare = compare;
    this.tree = new RBTree(compare);
    this.counts = new Map();
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
    const added = this.tree.insert(val);
    this.increase(val);
    this._size++;
    return added;
  }
  delete(val) {
    if (!this.has(val))
      return false;
    this.decrease(val);
    if (this.count(val) === 0) {
      this.tree.deleteByValue(val);
    }
    this._size--;
    return true;
  }
  count(val) {
    var _a;
    return (_a = this.counts.get(val)) != null ? _a : 0;
  }
  ceiling(val) {
    let p = this.tree.root;
    let higher = null;
    while (p) {
      if (this.compare(p.data, val) >= 0) {
        higher = p;
        p = p.left;
      } else {
        p = p.right;
      }
    }
    return higher == null ? void 0 : higher.data;
  }
  floor(val) {
    let p = this.tree.root;
    let lower = null;
    while (p) {
      if (this.compare(val, p.data) >= 0) {
        lower = p;
        p = p.right;
      } else {
        p = p.left;
      }
    }
    return lower == null ? void 0 : lower.data;
  }
  higher(val) {
    let p = this.tree.root;
    let higher = null;
    while (p) {
      if (this.compare(val, p.data) < 0) {
        higher = p;
        p = p.left;
      } else {
        p = p.right;
      }
    }
    return higher == null ? void 0 : higher.data;
  }
  lower(val) {
    let p = this.tree.root;
    let lower = null;
    while (p) {
      if (this.compare(p.data, val) < 0) {
        lower = p;
        p = p.right;
      } else {
        p = p.left;
      }
    }
    return lower == null ? void 0 : lower.data;
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
  decrease(val) {
    this.counts.set(val, this.count(val) - 1);
  }
  increase(val) {
    this.counts.set(val, this.count(val) + 1);
  }
}
export {
  TreeMultiSet,
  TreeSet
};
