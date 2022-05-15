import { Compare } from './functional'

class Heap<T=number> {
  data: Array<T | null>
  lt: (i: number, j: number) => boolean
  constructor ()
  constructor (data: T[])
  constructor (compare: Compare<T>)
  constructor (data: T[], compare: Compare<T>)
  constructor (data: (T[] | Compare<T>), compare?: (lhs: T, rhs: T) => number)
  constructor (data: (T[] | Compare<T>) = [], compare: Compare<T> = (lhs: T, rhs: T) => lhs < rhs ? -1 : (lhs > rhs ? 1 : 0)) {
    if (typeof data === 'function') {
      compare = data
      data = []
    }
    this.data = [null, ...data]
    this.lt = (i, j) => compare(this.data[i]!, this.data[j]!) < 0
    for (let i = this.size(); i > 0; i--) this.heapify(i)
  }

  size (): number {
    return this.data.length - 1
  }

  push (v: T): void {
    this.data.push(v)
    let i = this.size()
    while ((i >> 1 !== 0) && this.lt(i, i >> 1)) this.swap(i, i >>= 1)
  }

  pop (): T {
    this.swap(1, this.size())
    const top = this.data.pop()
    this.heapify(1)
    return top!
  }

  top (): T { return this.data[1]! }
  heapify (i: number): void {
    while (true) {
      let min = i
      const [l, r, n] = [i * 2, i * 2 + 1, this.data.length]
      if (l < n && this.lt(l, min)) min = l
      if (r < n && this.lt(r, min)) min = r
      if (min !== i) {
        this.swap(i, min); i = min
      } else break
    }
  }

  swap (i: number, j: number): void {
    const d = this.data;
    [d[i], d[j]] = [d[j], d[i]]
  }
}

class RemovableHeap<T> {
  heap: Heap<T>
  counts: Map<T, number>
  _invalidCount: number
  constructor ()
  constructor (data: T[])
  constructor (cmp: Compare<T>)
  constructor (data: T[], cmp: Compare<T>)
  constructor (data: (T[] | Compare<T>), cmp: Compare<T>)
  constructor (data: (T[] | Compare<T>) = [], cmp?: Compare<T>) {
    this.heap = new Heap<T>(data, cmp)
    this.counts = new Map()
    this._invalidCount = 0
  }

  size (): number {
    return this.heap.size() - this._invalidCount
  }

  top (): T {
    this._normalize()
    return this.heap.top()
  }

  pop (): T | undefined {
    this._normalize()
    if (this.heap.size() < 1) return undefined
    const top = this.heap.pop()
    this._count(top, -1)
    return top
  }

  push (num: T): void {
    this._count(num, 1)
    this.heap.push(num)
  }

  remove (num: T): void {
    if (Number(this.counts.get(num)) > 0) {
      this._count(num, -1)
      this._invalidCount++
    }
  }

  _count (num: T, diff: number): void {
    const count = this.counts.get(num) ?? 0
    this.counts.set(num, count + diff)
  }

  _normalize (): void {
    while (this.heap.size() && !this.counts.get(this.heap.top())) {
      this.heap.pop()
      this._invalidCount--
    }
  }
}

class RemovableDoubleHeap<T> {
  min: RemovableHeap<T>
  max: RemovableHeap<T>
  constructor ()
  constructor (data: T[])
  constructor (cmp: Compare<T>)
  constructor (data: T[], cmp: Compare<T>)
  constructor (data: (T[] | (Compare<T>)), cmp: Compare<T>)
  constructor (data: (T[] | (Compare<T>)) = [], cmp: Compare<T> = (lhs: T, rhs: T) => lhs < rhs ? -1 : (lhs > rhs ? 1 : 0)) {
    this.min = new RemovableHeap(data, cmp)
    this.max = new RemovableHeap(data, (lhs, rhs) => -cmp(lhs, rhs))
  }

  popMin (): T {
    const min = this.min.pop()!
    this.max.remove(min)
    return min
  }

  popMax (): T {
    const max = this.max.pop()!
    this.min.remove(max)
    return max
  }

  remove (num: T): void {
    this.min.remove(num)
    this.max.remove(num)
  }

  size (): number {
    return this.min.size()
  }

  push (num: T): void {
    this.min.push(num)
    this.max.push(num)
  }
}

export { Heap, RemovableHeap, RemovableDoubleHeap }
