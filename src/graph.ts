export function createGraph<T> (edges: Array<[T, T, number]>): Map<T, Map<T, number>> {
  const G = new Map()
  for (const [u, v, w] of edges) {
    if (!G.has(u)) G.set(u, new Map())
    const currW = G.get(u)!.has(v) ? G.get(u)!.get(v) : Infinity
    G.get(u).set(v, Math.min(currW, w))
  }
  return G
}

export class DirectedGraph<TNode> {
  private readonly edges = new Map<TNode, Map<TNode, number>>()
  private readonly rEdges = new Map<TNode, Map<TNode, number>>()
  private readonly leaves = new Set<TNode>()

  constructor (N: number = 0) {
    for (let i = 0; i < N; i++) {
      this.edges.set(i as unknown as TNode, new Map())
      this.rEdges.set(i as unknown as TNode, new Map())
      this.leaves.add(i as unknown as TNode)
    }
  }

  addEdge (u: TNode, v: TNode, dist = 1): void {
    this.getOrCreateEdges(u).set(v, dist)
    this.getReverseEdges(v).set(u, dist)
    this.leaves.delete(u)
  }

  removeEdge (u: TNode, v: TNode): void {
    this.getOrCreateEdges(u).delete(v)
    this.getReverseEdges(v).delete(u)
    if (!this.getOrCreateEdges(u).size) {
      this.leaves.add(u)
    }
  }

  removeNode (u: TNode): void {
    for (const v of this.getChildren(u)) {
      this.removeEdge(u, v)
    }
    for (const v of this.getParents(u)) {
      this.removeEdge(v, u)
    }
    this.edges.delete(u)
    this.rEdges.delete(u)
  }

  * getAllEdges (): IterableIterator<[TNode, TNode, number]> {
    for (const [u, edges] of this.edges) {
      for (const [v, dist] of edges) {
        yield [u, v, dist]
      }
    }
  }

  getEdges (u: TNode): Map<TNode, number> | undefined {
    return this.edges.get(u)
  }

  size (): number {
    return this.edges.size
  }

  getOrCreateEdges (u: TNode): Map<TNode, number> {
    if (!this.edges.has(u)) this.edges.set(u, new Map())
    return this.edges.get(u)!
  }

  getReverseEdges (u: TNode): Map<TNode, number> {
    if (!this.rEdges.has(u)) this.rEdges.set(u, new Map())
    return this.rEdges.get(u)!
  }

  getDistance (u: TNode, v: TNode): number {
    return this.getEdges(u)?.get(v) ?? Infinity
  }

  * getChildren (u: TNode): Iterable<TNode> {
    for (const [v] of this.getEdges(u) ?? []) yield v
  }

  * getParents (u: TNode): Iterable<TNode> {
    for (const [v] of this.getReverseEdges(u)) yield v
  }

  * getLeaves (): IterableIterator<TNode> {
    for (const u of this.leaves) yield u
  }
}

export class UndirectedGraph<TNode> {
  private readonly edges = new Map<TNode, Map<TNode, number>>()
  private readonly leaves = new Set<TNode>()

  constructor (N: number = 0) {
    for (let i = 0; i < N; i++) {
      this.edges.set(i as unknown as TNode, new Map())
      this.leaves.add(i as unknown as TNode)
    }
  }

  addEdge (u: TNode, v: TNode, dist = 1): void {
    this.getOrCreateEdges(u).set(v, dist)
    this.updateLeaves(u)
    if (u === v) return
    this.getOrCreateEdges(v).set(u, dist)
    this.updateLeaves(v)
  }

  removeEdge (u: TNode, v: TNode): void {
    this.getOrCreateEdges(u).delete(v)
    this.updateLeaves(u)
    if (u === v) return
    this.getOrCreateEdges(v).delete(u)
    this.updateLeaves(v)
  }

  removeNode (u: TNode): void {
    for (const v of this.getAdjacent(u)) {
      this.removeEdge(u, v)
    }
    this.edges.delete(u)
  }

  size (): number {
    return this.edges.size
  }

  getEdges (u: TNode): Map<TNode, number> | undefined {
    return this.edges.get(u)
  }

  getOrCreateEdges (u: TNode): Map<TNode, number> {
    if (!this.edges.has(u)) this.edges.set(u, new Map())
    return this.edges.get(u)!
  }

  getDistance (u: TNode, v: TNode): number {
    return this.getEdges(u)?.get(v) ?? Infinity
  }

  * getAllEdges (): IterableIterator<[TNode, TNode, number]> {
    for (const [u, edges] of this.edges) {
      for (const [v, dist] of edges) {
        if (u <= v) yield [u, v, dist]
      }
    }
  }

  * getAdjacent (u: TNode): Iterable<TNode> {
    for (const [v] of this.getEdges(u) ?? []) yield v
  }

  * getLeaves (): IterableIterator<TNode> {
    for (const u of this.leaves) yield u
  }

  private updateLeaves (u: TNode): void {
    if (this.getEdges(u)!.size <= 1) this.leaves.add(u)
    else this.leaves.delete(u)
  }
}
