class CircularDeque<T> {
  prev: CircularDeque<T> | null
  next: CircularDeque<T> | null
  begin: number
  end: number
  empty: boolean
  data: T[]
  constructor (N: number) {
    this.prev = this.next = null
    this.begin = this.end = 0
    this.empty = true
    this.data = Array(N)
  }

  isFull (): boolean {
    return this.end === this.begin && !this.empty
  }

  isEmpty (): boolean {
    return this.empty
  }

  push (val: T): boolean {
    if (this.isFull()) return false
    this.empty = false
    this.data[this.end] = val
    this.end = (this.end + 1) % this.data.length
    return true
  }

  front (): T | undefined {
    return this.isEmpty() ? undefined : this.data[this.begin]
  }

  back (): T | undefined {
    return this.isEmpty() ? undefined : this.data[this.end - 1]
  }

  pop (): T | undefined {
    if (this.isEmpty()) return undefined
    const value = this.data[this.end - 1]
    this.end = (this.end - 1) % this.data.length
    if (this.end < 0) this.end += this.data.length
    if (this.end === this.begin) this.empty = true
    return value
  }

  unshift (val: T): boolean {
    if (this.isFull()) return false
    this.empty = false
    this.begin = (this.begin - 1) % this.data.length
    if (this.begin < 0) this.begin += this.data.length
    this.data[this.begin] = val
    return true
  }

  shift (): T | undefined {
    if (this.isEmpty()) return undefined
    const value = this.data[this.begin]
    this.begin = (this.begin + 1) % this.data.length
    if (this.end === this.begin) this.empty = true
    return value
  }

  * values (): Generator<T, void, undefined> {
    if (this.isEmpty()) return undefined
    let i = this.begin
    do {
      yield this.data[i]
      i = (i + 1) % this.data.length
    } while (i !== this.end)
  }
}

class Deque<T> {
  head: CircularDeque<T>
  tail: CircularDeque<T>
  _size: number
  constructor (collection: T[] = []) {
    this.head = new CircularDeque<T>(128)
    this.tail = new CircularDeque<T>(128)
    this.tail.empty = this.head.empty = false
    this.tail.prev = this.head
    this.head.next = this.tail
    this._size = 0
    for (const item of collection) this.push(item)
  }

  size (): number {
    return this._size
  }

  push (val: T): void {
    let last = this.tail.prev!
    if (last.isFull()) {
      const inserted = new CircularDeque<T>(128)

      this.tail.prev = inserted
      inserted.next = this.tail

      last.next = inserted
      inserted.prev = last

      last = inserted
    }
    last.push(val)
    this._size++
  }

  back (): T | undefined {
    if (this._size === 0) return
    return this.tail.prev!.back()
  }

  pop (): T | undefined {
    if (this.head.next === this.tail) return undefined
    const last = this.tail.prev!
    const value = last.pop()
    if (last.isEmpty()) {
      this.tail.prev = last.prev
      last.prev!.next = this.tail
    }
    this._size--
    return value
  }

  unshift (val: T): void {
    let first = this.head.next!
    if (first.isFull()) {
      const inserted = new CircularDeque<T>(128)

      this.head.next = inserted
      inserted.prev = this.head

      inserted.next = first
      first.prev = inserted

      first = inserted
    }
    first.unshift(val)
    this._size++
  }

  shift (): T | undefined {
    if (this.head.next === this.tail) return undefined
    const first = this.head.next!
    const value = first.shift()
    if (first.isEmpty()) {
      this.head.next = first.next
      first.next!.prev = this.head
    }
    this._size--
    return value
  }

  front (): T | undefined {
    if (this._size === 0) return undefined
    return this.head.next!.front()
  }

  * values (): Generator<T, void, undefined> {
    let node = this.head.next!
    while (node !== this.tail) {
      for (const value of node.values()) yield value
      node = node.next!
    }
  }
}

export { CircularDeque, Deque }
