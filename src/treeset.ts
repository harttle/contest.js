import { RBTree } from './rbtree'
import { Compare } from './functional'

class TreeSet<T = number> {
  _size: number
  tree: RBTree<T>
  compare: Compare<T>
  constructor (collection: (T[] | Compare<T>) = [], compare: Compare<T> = (l: T, r: T) => l < r ? -1 : (l > r ? 1 : 0)) {
    if (typeof collection === 'function') {
      compare = collection
      collection = []
    }
    this._size = 0
    this.compare = compare
    this.tree = new RBTree(compare)
    for (const val of collection) this.add(val)
  }

  size (): number {
    return this._size
  }

  has (val: T): boolean {
    return !!this.tree.find(val)
  }

  add (val: T): boolean {
    const successful = this.tree.insert(val)
    this._size += successful ? 1 : 0
    return successful
  }

  delete (val: T): boolean {
    const deleted = this.tree.deleteAll(val)
    this._size -= deleted ? 1 : 0
    return deleted
  }

  ceil (target: T): T | undefined {
    return this.tree.search(val => this.compare(val, target) >= 0, 'left')
  }

  floor (target: T): T | undefined {
    return this.tree.search(val => this.compare(val, target) <= 0, 'right')
  }

  higher (target: T): T | undefined {
    return this.tree.search(val => this.compare(val, target) > 0, 'left')
  }

  lower (target: T): T | undefined {
    return this.tree.search(val => this.compare(val, target) < 0, 'right')
  }

  first (): T | undefined {
    return this.tree.inOrder().next().value
  }

  last (): T | undefined {
    return this.tree.reverseInOrder().next().value
  }

  shift (): T | undefined {
    const first = this.first()
    if (first === undefined) return undefined
    this.delete(first)
    return first
  }

  pop (): T | undefined {
    const last = this.last()
    if (last === undefined) return undefined
    this.delete(last)
    return last
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
  compare: Compare<T>
  constructor (collection: (T[] | Compare<T>) = [], compare: Compare<T> = (l: T, r: T) => l < r ? -1 : (l > r ? 1 : 0)) {
    if (typeof collection === 'function') {
      compare = collection
      collection = []
    }
    this._size = 0
    this.compare = compare
    this.tree = new RBTree(compare)
    for (const val of collection) this.add(val)
  }

  size (): number {
    return this._size
  }

  has (val: T): boolean {
    return !!this.tree.find(val)
  }

  add (val: T): boolean {
    const successful = this.tree.insert(val)
    this._size++
    return successful
  }

  delete (val: T): boolean {
    const successful = this.tree.delete(val)
    if (!successful) return false
    this._size--
    return true
  }

  deleteAll (val: T): boolean {
    let successful = false
    while (this.tree.delete(val)) {
      this._size--
      successful = true
    }
    return successful
  }

  count (val: T): number {
    const node = this.tree.find(val)
    return node ? node.count : 0
  }

  ceil (target: T): T | undefined {
    return this.tree.search(val => this.compare(val, target) >= 0, 'left')
  }

  floor (target: T): T | undefined {
    return this.tree.search(val => this.compare(val, target) <= 0, 'right')
  }

  higher (target: T): T | undefined {
    return this.tree.search(val => this.compare(val, target) > 0, 'left')
  }

  lower (target: T): T | undefined {
    return this.tree.search(val => this.compare(val, target) < 0, 'right')
  }

  first (): T | undefined {
    return this.tree.inOrder().next().value
  }

  last (): T | undefined {
    return this.tree.reverseInOrder().next().value
  }

  shift (): T | undefined {
    const first = this.first()
    if (first === undefined) return undefined
    this.delete(first)
    return first
  }

  pop (): T | undefined {
    const last = this.last()
    if (last === undefined) return undefined
    this.delete(last)
    return last
  }

  * [Symbol.iterator] (): Generator<T, void, void> {
    yield * this.values()
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
}

export { TreeSet, TreeMultiSet }
