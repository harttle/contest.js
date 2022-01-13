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
var _size, _size2;
import { RBTree } from "./rbtree";
class TreeSet {
  constructor(collection = [], compare = (l, r) => l < r) {
    __privateAdd(this, _size, void 0);
    __privateSet(this, _size, 0);
    this.tree = new RBTree(compare);
    this.compare = compare;
    for (const val of collection)
      this.add(val);
  }
  size() {
    return __privateGet(this, _size);
  }
  has(val) {
    return !!this.tree.find(val);
  }
  add(val) {
    const added = this.tree.insert(val);
    __privateSet(this, _size, __privateGet(this, _size) + (added ? 1 : 0));
    return added;
  }
  delete(val) {
    const deleted = this.tree.deleteByValue(val);
    __privateSet(this, _size, __privateGet(this, _size) - (deleted ? 1 : 0));
    return deleted;
  }
  ceiling(val) {
    let p = this.tree.root;
    let higher = null;
    while (p) {
      if (!this.compare(p.data, val)) {
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
      if (!this.compare(val, p.data)) {
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
      if (this.compare(val, p.data)) {
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
      if (this.compare(p.data, val)) {
        lower = p;
        p = p.right;
      } else {
        p = p.left;
      }
    }
    return lower == null ? void 0 : lower.data;
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
_size = new WeakMap();
class TreeMultiSet {
  constructor(collection = [], compare = (l, r) => l < r) {
    __privateAdd(this, _size2, void 0);
    __privateSet(this, _size2, 0);
    this.tree = new RBTree(compare);
    this.counts = new Map();
    this.compare = compare;
    for (const val of collection)
      this.add(val);
  }
  size() {
    return __privateGet(this, _size2);
  }
  has(val) {
    return !!this.tree.find(val);
  }
  add(val) {
    this.tree.insert(val);
    this.increase(val);
    __privateWrapper(this, _size2)._++;
  }
  delete(val) {
    this.decrease(val);
    if (this.count(val) === 0) {
      this.tree.deleteByValue(val);
    }
    __privateWrapper(this, _size2)._--;
  }
  count(val) {
    var _a;
    return (_a = this.counts.get(val)) != null ? _a : 0;
  }
  ceiling(val) {
    let p = this.tree.root;
    let higher = null;
    while (p) {
      if (!this.compare(p.data, val)) {
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
      if (!this.compare(val, p.data)) {
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
      if (this.compare(val, p.data)) {
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
      if (this.compare(p.data, val)) {
        lower = p;
        p = p.right;
      } else {
        p = p.left;
      }
    }
    return lower == null ? void 0 : lower.data;
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
_size2 = new WeakMap();
export {
  TreeMultiSet,
  TreeSet
};
