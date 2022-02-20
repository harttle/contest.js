class RBTreeNode {
  constructor(data) {
    this.data = data;
    this.left = this.right = this.parent = null;
    this.color = 0;
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
}
class RBTree {
  constructor(compare = (l, r) => l < r) {
    this.root = null;
    this.compare = compare;
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
  deleteByValue(val) {
    const node = this.search(val);
    if ((node == null ? void 0 : node.data) !== val)
      return false;
    this.deleteNode(node);
    return true;
  }
  search(val) {
    let p = this.root;
    while (p) {
      if (this.compare(val, p.data)) {
        if (!p.left)
          break;
        else
          p = p.left;
      } else if (this.compare(p.data, val)) {
        if (!p.right)
          break;
        else
          p = p.right;
      } else
        break;
    }
    return p;
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
    const node = new RBTreeNode(data);
    const parent = this.search(data);
    if (!parent)
      this.root = node;
    else if (this.compare(node.data, parent.data))
      parent.left = node;
    else if (this.compare(parent.data, node.data))
      parent.right = node;
    else
      return false;
    node.parent = parent;
    this.fixAfterInsert(node);
    return true;
  }
  find(data) {
    const node = this.search(data);
    return node && node.data === data ? node : null;
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
}
export {
  RBTree,
  RBTreeNode
};