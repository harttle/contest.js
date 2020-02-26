// armotized O(m\alpha(n)) for m find/union operations
class DSU {
    constructor(N) {
        this.parent = Array(N).fill(0).map((x, i) => i)
        this.rank = Array(N).fill(0)
    }
    find(x) {
        if (this.parent[x] === x) return x
        // path compression
        this.parent[x] = this.find(this.parent[x])
        return this.parent[x]
    }
    union(x, y) {
        x = this.find(x)
        y = this.find(y)
        if (x === y) return false
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

module.exports = { DSU }