import { RBTree } from './rbtree'
import { Compare } from './functional'

class TreeMap<K = number, V = unknown> {
  _size: number
  tree: RBTree<K>
  map: Map<K, V> = new Map()
  compare: Compare<K>
  constructor (collection: (Array<[K, V]> | Compare<K>) = [], compare: Compare<K> = (l: K, r: K) => l < r ? -1 : (l > r ? 1 : 0)) {
    if (typeof collection === 'function') {
      compare = collection
      collection = []
    }
    this._size = 0
    this.compare = compare
    this.tree = new RBTree(compare)
    for (const [key, val] of collection) this.set(key, val)
  }

  size (): number {
    return this._size
  }

  has (key: K): boolean {
    return !!this.tree.find(key)
  }

  get (key: K): V | undefined {
    return this.map.get(key)
  }

  set (key: K, val: V): boolean {
    const successful = this.tree.insert(key)
    this._size += successful ? 1 : 0
    this.map.set(key, val)
    return successful
  }

  delete (key: K): boolean {
    const deleted = this.tree.deleteAll(key)
    this._size -= deleted ? 1 : 0
    return deleted
  }

  ceil (target: K): [K, V] | undefined {
    return this.toKeyValue(this.tree.search(key => this.compare(key, target) >= 0, 'left'))
  }

  floor (target: K): [K, V] | undefined {
    return this.toKeyValue(this.tree.search(key => this.compare(key, target) <= 0, 'right'))
  }

  higher (target: K): [K, V] | undefined {
    return this.toKeyValue(this.tree.search(key => this.compare(key, target) > 0, 'left'))
  }

  lower (target: K): [K, V] | undefined {
    return this.toKeyValue(this.tree.search(key => this.compare(key, target) < 0, 'right'))
  }

  first (): [K, V] | undefined {
    return this.toKeyValue(this.tree.inOrder().next().value)
  }

  last (): [K, V] | undefined {
    return this.toKeyValue(this.tree.reverseInOrder().next().value)
  }

  shift (): [K, V] | undefined {
    const first = this.first()
    if (first === undefined) return undefined
    this.delete(first[0])
    return first
  }

  pop (): [K, V] | undefined {
    const last = this.last()
    if (last === undefined) return undefined
    this.delete(last[0])
    return last
  }

  toKeyValue (key: K): [K, V]
  toKeyValue (key: undefined): undefined
  toKeyValue (key: K | undefined): [K, V] | undefined
  toKeyValue (key: K | undefined): [K, V] | undefined {
    return key != null ? [key, this.map.get(key)!] : undefined
  }

  * [Symbol.iterator] (): Generator<[K, V], void, void> {
    for (const key of this.keys()) yield this.toKeyValue(key)
  }

  * keys (): Generator<K, void, void> {
    for (const key of this.tree.inOrder()) yield key
  }

  * values (): Generator<V, undefined, void> {
    for (const key of this.keys()) yield this.map.get(key)!
    return undefined
  }

  * rkeys (): Generator<K, undefined, void> {
    for (const key of this.tree.reverseInOrder()) yield key
    return undefined
  }

  * rvalues (): Generator<V, undefined, void> {
    for (const key of this.rkeys()) yield this.map.get(key)!
    return undefined
  }
}

export { TreeMap }
