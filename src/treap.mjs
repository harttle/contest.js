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
export {
  TreapMultiSet
};
