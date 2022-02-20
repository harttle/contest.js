import { RBTree } from './rbtree'

class TreeSet<T = number> {
  _size: number
  tree: RBTree<T>
  compare: (l: T, r: T) => boolean
  constructor (collection: T[] = [], compare = (l: T, r: T) => l < r) {
    this._size = 0
    this.tree = new RBTree(compare)
    this.compare = compare
    for (const val of collection) this.add(val)
  }

  size (): number {
    return this._size
  }

  has (val: T): boolean {
    return !!this.tree.find(val)
  }

  add (val: T): boolean {
    const added = this.tree.insert(val)
    this._size += added ? 1 : 0
    return added
  }

  delete (val: T): boolean {
    const deleted = this.tree.deleteByValue(val)
    this._size -= deleted ? 1 : 0
    return deleted
  }

  ceiling (val: T): T | undefined {
    let p = this.tree.root
    let higher = null
    while (p) {
      if (!this.compare(p.data, val)) {
        higher = p
        p = p.left
      } else {
        p = p.right
      }
    }
    return higher?.data
  }

  floor (val: T): T | undefined {
    let p = this.tree.root
    let lower = null
    while (p) {
      if (!this.compare(val, p.data)) {
        lower = p
        p = p.right
      } else {
        p = p.left
      }
    }
    return lower?.data
  }

  higher (val: T): T | undefined {
    let p = this.tree.root
    let higher = null
    while (p) {
      if (this.compare(val, p.data)) {
        higher = p
        p = p.left
      } else {
        p = p.right
      }
    }
    return higher?.data
  }

  lower (val: T): T | undefined {
    let p = this.tree.root
    let lower = null
    while (p) {
      if (this.compare(p.data, val)) {
        lower = p
        p = p.right
      } else {
        p = p.left
      }
    }
    return lower?.data
  }

  * [Symbol.iterator] (): Generator<T, void, void> {
    for (const val of this.values()) yield val
  }

  * keys (): Generator<T, void, void> {
    for (const val of this.values()) yield val
  }

  * values (): Generator<T, undefined, void> {
    for (const val of this.tree.inOrder()) yield val
    return undefined
  }

  /**
   * Return a generator for reverse order traversing the set
   */
  * rvalues (): Generator<T, undefined, void> {
    for (const val of this.tree.reverseInOrder()) yield val
    return undefined
  }
}

class TreeMultiSet<T = number> {
  _size: number
  tree: RBTree<T>
  counts: Map<T, number>
  compare: (l: T, r: T) => boolean
  constructor (collection: T[] = [], compare = (l: T, r: T) => l < r) {
    this._size = 0
    this.tree = new RBTree(compare)
    this.counts = new Map()
    this.compare = compare
    for (const val of collection) this.add(val)
  }

  size (): number {
    return this._size
  }

  has (val: T): boolean {
    return !!this.tree.find(val)
  }

  add (val: T): void {
    this.tree.insert(val)
    this.increase(val)
    this._size++
  }

  delete (val: T): void {
    this.decrease(val)
    if (this.count(val) === 0) {
      this.tree.deleteByValue(val)
    }
    this._size--
  }

  count (val: T): number {
    return this.counts.get(val) ?? 0
  }

  ceiling (val: T): T | undefined {
    let p = this.tree.root
    let higher = null
    while (p) {
      if (!this.compare(p.data, val)) {
        higher = p
        p = p.left
      } else {
        p = p.right
      }
    }
    return higher?.data
  }

  floor (val: T): T | undefined {
    let p = this.tree.root
    let lower = null
    while (p) {
      if (!this.compare(val, p.data)) {
        lower = p
        p = p.right
      } else {
        p = p.left
      }
    }
    return lower?.data
  }

  higher (val: T): T | undefined {
    let p = this.tree.root
    let higher = null
    while (p) {
      if (this.compare(val, p.data)) {
        higher = p
        p = p.left
      } else {
        p = p.right
      }
    }
    return higher?.data
  }

  lower (val: T): T | undefined {
    let p = this.tree.root
    let lower = null
    while (p) {
      if (this.compare(p.data, val)) {
        lower = p
        p = p.right
      } else {
        p = p.left
      }
    }
    return lower?.data
  }

  * keys (): Generator<T, void, void> {
    for (const val of this.values()) yield val
  }

  * values (): Generator<T, undefined, void> {
    for (const val of this.tree.inOrder()) {
      let count = this.count(val)
      while (count--) yield val
    }
    return undefined
  }

  /**
   * Return a generator for reverse order traversing the multi-set
   */
  * rvalues (): Generator<T, undefined, void> {
    for (const val of this.tree.reverseInOrder()) {
      let count = this.count(val)
      while (count--) yield val
    }
    return undefined
  }

  /**
   * Should only be called by `delete` to keep the internal state correct
   */
  private decrease (val: T): void {
    this.counts.set(val, this.count(val) - 1)
  }
  /**
   * Should only be called by `add` to keep the internal state correct
   */

  private increase (val: T): void {
    this.counts.set(val, this.count(val) + 1)
  }
}

export { TreeSet, TreeMultiSet }
