type Aggregate<T> = (left: T, right: T) => T
type Predicate<T> = (value: T, target: T) => boolean

class SegmentTree<T = number> {
  public readonly N: number
  public readonly aggregate: Aggregate<T>
  public readonly values: T[]
  public readonly tree: T[]
  public initial: T

  constructor (N: number, aggregate: Aggregate<T> = ((a: number, b: number) => a + b) as any, initial: T = 0 as any) {
    this.N = N
    this.initial = initial
    this.values = Array(N).fill(initial)
    // # of nodes = 2**(h-1)-1, h = ceil(logN) => # of nodes < 4N - 1
    this.tree = Array(N * 4).fill(initial)
    this.aggregate = aggregate
  }

  public update (i: number, value: T): void {
    this.values[i] = value
    this._update(0, this.N - 1, 1, i)
  }

  public prefix (i: number): T {
    return this._query(0, this.N - 1, 1, 0, i)
  }

  public query (l: number, r: number): T {
    return this._query(0, this.N - 1, 1, l, r)
  }

  public higher (target: T): number {
    return this._queryIndex(0, this.N - 1, 1, target, (value, target) => value > target)
  }

  public ceil (target: T): number {
    return this._queryIndex(0, this.N - 1, 1, target, (value, target) => value >= target)
  }

  public lower (target: T): number {
    return this.ceil(target) - 1
  }

  public floor (target: T): number {
    return this.higher(target) - 1
  }

  public valueAt (i: number): T {
    return this.values[i]
  }

  protected _update (l: number, r: number, ti: number, i: number): void {
    const m = (l + r) >> 1
    if (l === r) {
      this.tree[ti] = this.values[i]
      return
    }
    if (i <= m) this._update(l, m, ti * 2, i)
    else this._update(m + 1, r, ti * 2 + 1, i)
    this.tree[ti] = this.aggregate(this.tree[ti * 2], this.tree[ti * 2 + 1])
  }

  protected _queryIndex (l: number, r: number, ti: number, target: T, predicate: Predicate<T>): number {
    if (l === r) {
      return predicate(this.tree[ti], target) ? l : Infinity
    }
    const m = (l + r) >> 1
    if (predicate(this.tree[ti * 2], target)) return this._queryIndex(l, m, ti * 2, target, predicate)
    return this._queryIndex(m + 1, r, ti * 2 + 1, (target as any) - (this.tree[ti * 2] as any) as any, predicate)
  }

  protected _query (l: number, r: number, ti: number, li: number, ri: number): T {
    if (l === r || (l === li && r === ri)) {
      return this.tree[ti]
    }
    const m = l + r >> 1
    const r1 = [li, Math.min(m, ri)]
    const r2 = [Math.max(m + 1, li), ri]
    let ans = this.initial
    if (r1[0] <= r1[1]) {
      ans = this.aggregate(ans, this._query(l, m, ti * 2, r1[0], r1[1]))
    }
    if (r2[0] <= r2[1]) {
      ans = this.aggregate(ans, this._query(m + 1, r, ti * 2 + 1, r2[0], r2[1]))
    }
    return ans
  }
}

export { SegmentTree }
