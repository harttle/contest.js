export class Heap<T=number> {
  data: Array<T | null>
  lt: (i: number, j: number) => boolean
  constructor ()
  constructor (data: T[])
  constructor (cmp: (lhs: T, rhs: T) => boolean)
  constructor (data: T[], cmp: (lhs: T, rhs: T) => boolean)
  constructor (data: (T[] | ((lhs: T, rhs: T) => boolean)), cmp: (lhs: T, rhs: T) => boolean)
  constructor (data: (T[] | ((lhs: T, rhs: T) => boolean)) = [], cmp = (lhs: T, rhs: T) => lhs < rhs) {
    if (typeof data === 'function') {
      cmp = data
      data = []
    }
    this.data = [null, ...data]
    this.lt = (i, j) => cmp(this.data[i]!, this.data[j]!)
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

export class RemovableHeap<T> {
  heap: Heap<T>
  counts: Map<T, number>
  #invalidCount: number
  constructor ()
  constructor (data: T[])
  constructor (cmp: (lhs: T, rhs: T) => boolean)
  constructor (data: T[], cmp: (lhs: T, rhs: T) => boolean)
  constructor (data: (T[] | ((lhs: T, rhs: T) => boolean)), cmp: (lhs: T, rhs: T) => boolean)
  constructor (data: (T[] | ((lhs: T, rhs: T) => boolean)) = [], cmp = (lhs: T, rhs: T) => lhs < rhs) {
    this.heap = new Heap<T>(data, cmp)
    this.counts = new Map()
    this.#invalidCount = 0
  }

  size (): number {
    return this.heap.size() - this.#invalidCount
  }

  top (): T {
    this.#normalize()
    return this.heap.top()
  }

  pop (): T | undefined {
    this.#normalize()
    if (this.heap.size() < 1) return undefined
    const top = this.heap.pop()
    this.#count(top, -1)
    return top
  }

  push (num: T): void {
    this.#count(num, 1)
    this.heap.push(num)
  }

  remove (num: T): void {
    if (Number(this.counts.get(num)) > 0) {
      this.#count(num, -1)
      this.#invalidCount++
    }
  }

  #count (num: T, diff: number): void {
    const count = this.counts.get(num) ?? 0
    this.counts.set(num, count + diff)
  }

  #normalize (): void {
    while (this.heap.size() && !this.counts.get(this.heap.top())) {
      this.heap.pop()
      this.#invalidCount--
    }
  }
}

export class DoubleRemovableHeap<T> {
  min: RemovableHeap<T>
  max: RemovableHeap<T>
  constructor ()
  constructor (data: T[])
  constructor (cmp: (lhs: T, rhs: T) => boolean)
  constructor (data: T[], cmp: (lhs: T, rhs: T) => boolean)
  constructor (data: (T[] | ((lhs: T, rhs: T) => boolean)), cmp: (lhs: T, rhs: T) => boolean)
  constructor (data: (T[] | ((lhs: T, rhs: T) => boolean)) = [], cmp = (lhs: T, rhs: T) => lhs < rhs) {
    this.min = new RemovableHeap(data, cmp)
    this.max = new RemovableHeap(data, (lhs, rhs) => !cmp(lhs, rhs))
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
