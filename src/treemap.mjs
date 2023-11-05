import { RBTree } from "./rbtree";
class TreeMap {
  constructor(collection = [], compare = (l, r) => l < r ? -1 : l > r ? 1 : 0) {
    this.map = new Map();
    if (typeof collection === "function") {
      compare = collection;
      collection = [];
    }
    this._size = 0;
    this.compare = compare;
    this.tree = new RBTree(compare);
    for (const [key, val] of collection)
      this.set(key, val);
  }
  size() {
    return this._size;
  }
  has(key) {
    return !!this.tree.find(key);
  }
  set(key, val) {
    const successful = this.tree.insert(key);
    this._size += successful ? 1 : 0;
    this.map.set(key, val);
    return successful;
  }
  delete(key) {
    const deleted = this.tree.deleteAll(key);
    this._size -= deleted ? 1 : 0;
    return deleted;
  }
  ceil(target) {
    return this.toKeyValue(this.tree.search((key) => this.compare(key, target) >= 0, "left"));
  }
  floor(target) {
    return this.toKeyValue(this.tree.search((key) => this.compare(key, target) <= 0, "right"));
  }
  higher(target) {
    return this.toKeyValue(this.tree.search((key) => this.compare(key, target) > 0, "left"));
  }
  lower(target) {
    return this.toKeyValue(this.tree.search((key) => this.compare(key, target) < 0, "right"));
  }
  first() {
    return this.toKeyValue(this.tree.inOrder().next().value);
  }
  last() {
    return this.toKeyValue(this.tree.reverseInOrder().next().value);
  }
  shift() {
    const first = this.first();
    if (first === void 0)
      return void 0;
    this.delete(first[0]);
    return first;
  }
  pop() {
    const last = this.last();
    if (last === void 0)
      return void 0;
    this.delete(last[0]);
    return last;
  }
  toKeyValue(key) {
    return key != null ? [key, this.map.get(key)] : void 0;
  }
  *[Symbol.iterator]() {
    for (const key of this.keys())
      yield this.toKeyValue(key);
  }
  *keys() {
    for (const key of this.tree.inOrder())
      yield key;
  }
  *values() {
    for (const key of this.keys())
      yield this.map.get(key);
    return void 0;
  }
  *rkeys() {
    for (const key of this.tree.reverseInOrder())
      yield key;
    return void 0;
  }
  *rvalues() {
    for (const key of this.rkeys())
      yield this.map.get(key);
    return void 0;
  }
}
export {
  TreeMap
};
