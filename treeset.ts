import { RBTree } from './rbtree'

class TreeSet<T = number> {
  #size: number
  tree: RBTree<T>
  compare: (l: T, r: T) => boolean
  constructor (collection: T[] = [], compare = (l: T, r: T) => l < r) {
    this.#size = 0
    this.tree = new RBTree(compare)
    this.compare = compare
    for (const val of collection) this.add(val)
  }

  size (): number {
    return this.#size
  }

  has (val: T): boolean {
    return !!this.tree.find(val)
  }

  add (val: T): boolean {
    const added = this.tree.insert(val)
    this.#size += added ? 1 : 0
    return added
  }

  delete (val: T): boolean {
    const deleted = this.tree.deleteByValue(val)
    this.#size -= deleted ? 1 : 0
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

  * values (): Generator<T, void, void> {
    for (const val of this.tree.inOrder()) yield val
  }
}

class TreeMultiSet<T = number> {
  #size: number
  tree: RBTree<T>
  counts: Map<T, number>
  compare: (l: T, r: T) => boolean
  constructor (collection: T[] = [], compare = (l: T, r: T) => l < r) {
    this.#size = 0
    this.tree = new RBTree(compare)
    this.counts = new Map()
    this.compare = compare
    for (const val of collection) this.add(val)
  }

  size (): number {
    return this.#size
  }

  has (val: T): boolean {
    return !!this.tree.find(val)
  }

  add (val: T): void {
    this.tree.insert(val)
    this.increase(val)
    this.#size++
  }

  delete (val: T): void {
    this.tree.deleteByValue(val)
    this.decrease(val)
    this.#size--
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

  * values (): Generator<T, void, void> {
    for (const val of this.tree.inOrder()) {
      let count = this.count(val)
      while (count--) yield val
    }
  }

  decrease (val: T): void {
    this.counts.set(val, this.count(val) - 1)
  }

  increase (val: T): void {
    this.counts.set(val, this.count(val) + 1)
  }
}

export { TreeSet, TreeMultiSet }
