type Aggregate<T> = (lhs: T, rhs: T) => T
type Predicate<T> = (value: T) => boolean

class SegmentTree<T = number> {
  public readonly initial: T
  public readonly tree: T[]
  public readonly N: number
  public aggregate: Aggregate<T>

  constructor (N: number, aggregate: Aggregate<T> = ((a: number, b: number) => a + b) as any, initial: T = 0 as any) {
    this.N = N
    this.tree = Array(N * 4).fill(initial)
    this.aggregate = aggregate
    this.initial = initial
  }

  public update (idx: number, val: T, node = 1, start = 0, end = this.N - 1): void {
    if (start === end) this.tree[node] = val
    else {
      const mid = Math.floor((start + end) / 2)
      if (idx <= mid) this.update(idx, val, node * 2, start, mid)
      else this.update(idx, val, node * 2 + 1, mid + 1, end)
      this.tree[node] = this.aggregate(this.tree[node * 2], this.tree[node * 2 + 1])
    }
  }

  public query (l: number, r: number, node = 1, start = 0, end = this.N - 1): T {
    if (l <= start && end <= r) return this.tree[node]
    if (r < start || end < l) return this.initial
    const mi = Math.floor((start + end) / 2)
    const lval = this.query(l, r, node * 2, start, mi)
    const rval = this.query(l, r, node * 2 + 1, mi + 1, end)
    return this.aggregate(lval, rval)
  }

  public prefix (r: number): T {
    return this.query(0, r)
  }

  public findPrefix (pred: Predicate<T>, node = 1, start = 0, end = this.N - 1): number {
    if (start === end) return pred(this.tree[node]) ? end : -1
    const mi = Math.floor((start + end) / 2)
    if (pred(this.tree[node * 2])) return this.findPrefix(pred, node * 2, start, mi)
    return this.findPrefix(val => pred(this.aggregate(val, this.tree[node * 2])), node * 2 + 1, mi + 1, end)
  }

  public higher (target: T): number {
    return this.findPrefix(value => value > target)
  }

  public ceil (target: T): number {
    return this.findPrefix(value => value >= target)
  }

  public lower (target: T): number {
    const i = this.ceil(target)
    return i < 0 ? i : i - 1
  }

  public floor (target: T): number {
    const i = this.higher(target)
    return i < 0 ? i : i - 1
  }
}

export { SegmentTree }
