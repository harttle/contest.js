/**
 * @description An Adjacency List data structure. See "算法竞赛进阶指南: 0x13 链表与邻接表" for more detail.
 */
class AdjList {
  head: number[]
  ver: number[]
  edge: number[]
  next: number[]
  tot: number
  /**
   * @description Initialize an adjacency list
   * @param n Number of vertices
   * @param m Number of edges
   */
  constructor (n: number, m: number | undefined) {
    m ??= n
    this.head = new Array<number>(n + 1).fill(0)
    this.ver = new Array<number>(2 * (m + 1)).fill(0)
    this.edge = new Array<number>(2 * (m + 1)).fill(0)
    this.next = new Array<number>(2 * (m + 1)).fill(0)
    this.tot = 0
  }

  /**
   * @description Add an directed edge to the adjacency list, you can add two edges (ie. a to b & b to a) when constructing an undirected graph
   * @param from The starting vertex of the edge
   * @param to The ending vertex of the edge
   * @param weight The weight of the edge
  */
  add (from: number, to: number, weight: number): void {
    this.ver[++this.tot] = to
    this.edge[this.tot] = weight
    this.next[this.tot] = this.head[from]
    this.head[from] = this.tot
  }

  /**
   * @description Return a iterator to all the edges ([`to`, `weight`]) starting from `from`
   * @param from The starting vertex of the edges
  */
  * edges (from: number): Generator<[number, number]> {
    let curr = this.head[from]
    while (curr) {
      yield [this.ver[curr], this.edge[curr]]
      curr = this.next[curr]
    }
  }
};

export { AdjList }
