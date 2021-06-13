// armotized O(m\alpha(n)) for m find/union operations
export class DSU {
  parent: number[]
  rank: any[]
  constructor (N: number) {
    this.parent = Array(N).fill(0).map((x, i) => i)
    this.rank = Array(N).fill(0)
  }

  find (x: number): number {
    if (this.parent[x] === x) return x
    // path compression
    this.parent[x] = this.find(this.parent[x])
    return this.parent[x]
  }

  union (x: number, y: number): void {
    x = this.find(x)
    y = this.find(y)
    if (x === y) return
    // halving and union by rank
    if (this.rank[x] < this.rank[y]) {
      this.parent[x] = y
    } else if (this.rank[x] > this.rank[y]) {
      this.parent[y] = x
    } else {
      this.parent[x] = y
      this.rank[y]++
    }
  }
}
