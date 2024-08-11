type Aggregate<T> = (lhs: T, rhs: T) => T
type Predicate<T> = (value: T) => boolean

class SegmentTreeNode<T = number> {
  value: T
  private readonly l?: SegmentTreeNode<T>
  private readonly r?: SegmentTreeNode<T>
  constructor (private readonly lo: number, private readonly hi: number, arr: T[], private readonly initial: T, private readonly aggregate = (a: T, b: T) => ((a as unknown as number) + (b as unknown as number)) as any) {
    this.aggregate = aggregate as any
    if (lo === hi) {
      this.value = arr[lo]
    } else {
      const m = (lo + hi) >> 1
      this.l = new SegmentTreeNode(lo, m, arr, initial, aggregate)
      this.r = new SegmentTreeNode(m + 1, hi, arr, initial, aggregate)
      this.value = this.aggregate(this.l.value, this.r.value)
    }
  }

  update (i: number, value: T): void {
    if (i < this.lo || i > this.hi) return
    if (this.lo === this.hi) this.value = value
    else {
      this.l!.update(i, value)
      this.r!.update(i, value)
      this.value = this.aggregate(this.l!.value, this.r!.value)
    }
  }

  prefix (i: number): T {
    if (this.lo === this.hi) return this.value
    const m = (this.lo + this.hi) >> 1
    if (i <= m) return this.l!.prefix(i)
    return this.aggregate(this.l!.value, this.r!.prefix(i))
  }

  query (i: number, j: number): T {
    if (i > j) return this.initial
    if (i <= this.lo && j >= this.hi) return this.value
    const m = (this.lo + this.hi) >> 1
    const l1 = Math.max(this.lo, i); const r1 = Math.min(m, j)
    const l2 = Math.max(m, i); const r2 = Math.min(this.hi, j)
    let ans = this.initial
    if (l1 <= r1) ans = this.aggregate(ans, this.l!.query(l1, r1))
    if (l2 <= r2) ans = this.aggregate(ans, this.r!.query(l2, r2))
    return ans
  }

  findPrefix (pred: Predicate<T>): number {
    if (this.lo === this.hi) return pred(this.value) ? this.lo : -1
    if (pred(this.l!.value)) return this.l!.findPrefix(pred)
    return this.r!.findPrefix(value => pred(this.aggregate(value, this.l!.value)))
  }
}

class SegmentTree<T = number> {
  public readonly tree: SegmentTreeNode<T>

  constructor (N: number, aggregate: Aggregate<T> = ((a: number, b: number) => a + b) as any, initial: T = 0 as any) {
    this.tree = new SegmentTreeNode(0, N - 1, Array(N).fill(initial), initial, aggregate)
  }

  public update (i: number, value: T): void {
    this.tree.update(i, value)
  }

  public prefix (i: number): T {
    return this.tree.prefix(i)
  }

  public query (l: number, r: number): T {
    return this.tree.query(l, r)
  }

  public higher (target: T): number {
    return this.tree.findPrefix(value => value > target)
  }

  public ceil (target: T): number {
    return this.tree.findPrefix(value => value >= target)
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

export { SegmentTree, SegmentTreeNode }
