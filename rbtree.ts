export class RBTreeNode<T=number> {
  data: T
  left: RBTreeNode<T> | null
  right: RBTreeNode<T>| null
  parent: RBTreeNode<T>| null
  color: number
  constructor (data: T) {
    this.data = data
    this.left = this.right = this.parent = null
    this.color = 0
  }

  sibling (): RBTreeNode<T> | null {
    if (!this.parent) return null // sibling null if no parent
    return this.isOnLeft() ? this.parent.right : this.parent.left
  }

  isOnLeft (): boolean { return this === this.parent!.left }
  hasRedChild (): boolean {
    return Boolean(this.left && this.left.color === 0) || Boolean(this.right && this.right.color === 0)
  }
}

export class RBTree<T> {
  root: RBTreeNode<T> | null
  compare: (l: T, r: T) => boolean
  constructor (compare = (l: T, r: T) => l < r) {
    this.root = null
    this.compare = compare
  }

  rotateLeft (pt: RBTreeNode<T>): void {
    const pt_right = pt.right!
    pt.right = pt_right.left

    if (pt.right) pt.right.parent = pt
    pt_right.parent = pt.parent

    if (!pt.parent) this.root = pt_right
    else if (pt === pt.parent.left) pt.parent.left = pt_right
    else pt.parent.right = pt_right

    pt_right.left = pt
    pt.parent = pt_right
  }

  rotateRight (pt: RBTreeNode<T>): void {
    const pt_left = pt.left!
    pt.left = pt_left.right

    if (pt.left) pt.left.parent = pt
    pt_left.parent = pt.parent

    if (!pt.parent) this.root = pt_left
    else if (pt === pt.parent.left) pt.parent.left = pt_left
    else pt.parent.right = pt_left

    pt_left.right = pt
    pt.parent = pt_left
  }

  swapColor (p1: RBTreeNode<T>, p2: RBTreeNode<T>): void {
    const tmp = p1.color
    p1.color = p2.color
    p2.color = tmp
  }

  swapData (p1: RBTreeNode<T>, p2: RBTreeNode<T>): void {
    const tmp = p1.data
    p1.data = p2.data
    p2.data = tmp
  }

  fixAfterInsert (pt: RBTreeNode<T>): void {
    let parent_pt = null
    let grand_parent_pt = null

    while (pt !== this.root && pt.color !== 1 && pt.parent?.color === 0) {
      parent_pt = pt.parent
      grand_parent_pt = pt.parent.parent

      /*  Case : A
                Parent of pt is left child of Grand-parent of pt */
      if (parent_pt === grand_parent_pt?.left) {
        const uncle_pt = grand_parent_pt.right

        /* Case : 1
                   The uncle of pt is also red
                   Only Recoloring required */
        if (uncle_pt && uncle_pt.color === 0) {
          grand_parent_pt.color = 0
          parent_pt.color = 1
          uncle_pt.color = 1
          pt = grand_parent_pt
        } else {
          /* Case : 2
                       pt is right child of its parent
                       Left-rotation required */
          if (pt === parent_pt.right) {
            this.rotateLeft(parent_pt)
            pt = parent_pt
            parent_pt = pt.parent
          }

          /* Case : 3
                       pt is left child of its parent
                       Right-rotation required */
          this.rotateRight(grand_parent_pt)
          this.swapColor(parent_pt!, grand_parent_pt)
          pt = parent_pt!
        }
      }

      /* Case : B
               Parent of pt is right child of Grand-parent of pt */
      else {
        const uncle_pt = grand_parent_pt!.left

        /*  Case : 1
                    The uncle of pt is also red
                    Only Recoloring required */
        if ((uncle_pt != null) && (uncle_pt.color === 0)) {
          grand_parent_pt!.color = 0
          parent_pt.color = 1
          uncle_pt.color = 1
          pt = grand_parent_pt!
        } else {
          /* Case : 2
                       pt is left child of its parent
                       Right-rotation required */
          if (pt === parent_pt.left) {
            this.rotateRight(parent_pt)
            pt = parent_pt
            parent_pt = pt.parent
          }

          /* Case : 3
                       pt is right child of its parent
                       Left-rotation required */
          this.rotateLeft(grand_parent_pt!)
          this.swapColor(parent_pt!, grand_parent_pt!)
          pt = parent_pt!
        }
      }
    }
    this.root!.color = 1
  }

  deleteByValue (val: T): boolean {
    const node = this.search(val)
    if (node?.data !== val) return false
    this.deleteNode(node)
    return true
  }

  // searches for given value
  // if found returns the node (used for delete)
  // else returns the last node while traversing (used in insert)
  search (val: T): RBTreeNode<T> | null {
    let p = this.root
    while (p) {
      if (this.compare(val, p.data)) {
        if (!p.left) break
        else p = p.left
      } else if (this.compare(p.data, val)) {
        if (!p.right) break
        else p = p.right
      } else break
    }
    return p
  }

  deleteNode (v: RBTreeNode<T>): void {
    const u = BSTreplace(v)

    // True when u and v are both black
    const uvBlack = (u === null || u.color === 1) && v.color === 1
    const parent = v.parent!

    if (!u) {
      // u is null therefore v is leaf
      if (v === this.root) this.root = null // v is root, making root null
      else {
        if (uvBlack) {
          // u and v both black
          // v is leaf, fix double black at v
          this.fixDoubleBlack(v)
        } else {
          // u or v is red
          if (v.sibling())
          // sibling is not null, make it red"
          { v.sibling()!.color = 0 }
        }
        // delete v from the tree
        if (v.isOnLeft()) parent.left = null
        else parent.right = null
      }
      return
    }

    if (!v.left || !v.right) {
      // v has 1 child
      if (v === this.root) {
        // v is root, assign the value of u to v, and delete u
        v.data = u.data
        v.left = v.right = null
      } else {
        // Detach v from tree and move u up
        if (v.isOnLeft()) parent.left = u
        else parent.right = u
        u.parent = parent
        if (uvBlack) this.fixDoubleBlack(u) // u and v both black, fix double black at u
        else u.color = 1 // u or v red, color u black
      }
      return
    }

    // v has 2 children, swap data with successor and recurse
    this.swapData(u, v)
    this.deleteNode(u)

    // find node that replaces a deleted node in BST
    function BSTreplace (x: RBTreeNode<T>): RBTreeNode<T> | null {
      // when node have 2 children
      if (x.left && x.right) return successor(x.right)
      // when leaf
      if (!x.left && !x.right) return null
      // when single child
      return x.left ?? x.right
    }
    // find node that do not have a left child
    // in the subtree of the given node
    function successor (x: RBTreeNode<T>): RBTreeNode<T> {
      let temp = x
      while (temp.left) temp = temp.left
      return temp
    }
  }

  fixDoubleBlack (x: RBTreeNode<T>): void {
    if (x === this.root) return // Reached root

    const sibling = x.sibling(); const parent = x.parent!
    if (!sibling) {
      // No sibiling, double black pushed up
      this.fixDoubleBlack(parent)
    } else {
      if (sibling.color === 0) {
        // Sibling red
        parent.color = 0
        sibling.color = 1
        if (sibling.isOnLeft()) this.rotateRight(parent) // left case
        else this.rotateLeft(parent) // right case
        this.fixDoubleBlack(x)
      } else {
        // Sibling black
        if (sibling.hasRedChild()) {
          // at least 1 red children
          if (sibling.left && sibling.left.color === 0) {
            if (sibling.isOnLeft()) {
              // left left
              sibling.left.color = sibling.color
              sibling.color = parent.color
              this.rotateRight(parent)
            } else {
              // right left
              sibling.left.color = parent.color
              this.rotateRight(sibling)
              this.rotateLeft(parent)
            }
          } else {
            if (sibling.isOnLeft()) {
              // left right
              sibling.right!.color = parent.color
              this.rotateLeft(sibling)
              this.rotateRight(parent)
            } else {
              // right right
              sibling.right!.color = sibling.color
              sibling.color = parent.color
              this.rotateLeft(parent)
            }
          }
          parent.color = 1
        } else {
          // 2 black children
          sibling.color = 0
          if (parent.color === 1) this.fixDoubleBlack(parent)
          else parent.color = 1
        }
      }
    }
  }

  insert (data: T): boolean {
    const node = new RBTreeNode(data)
    const parent = this.search(data)
    if (!parent) this.root = node
    else if (this.compare(node.data, parent.data)) parent.left = node
    else if (this.compare(parent.data, node.data)) parent.right = node
    else return false
    node.parent = parent
    this.fixAfterInsert(node)
    return true
  }

  find (data: T): RBTreeNode<T> | null {
    const node = this.search(data)
    return node && node.data === data ? node : null
  }

  * inOrder (root: RBTreeNode<T> = this.root!): Generator<T, void, void> {
    if (!root) return
    for (const v of this.inOrder(root.left!)) yield v
    yield root.data
    for (const v of this.inOrder(root.right!)) yield v
  }
}
