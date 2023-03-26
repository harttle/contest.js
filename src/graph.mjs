class DirectedGraph {
  constructor(N = 0) {
    this.edges = new Map();
    this.rEdges = new Map();
    this.leaves = new Set();
    for (let i = 0; i < N; i++) {
      this.edges.set(i, new Map());
      this.rEdges.set(i, new Map());
      this.leaves.add(i);
    }
  }
  addEdge(u, v, dist = 1) {
    this.getOrCreateEdges(u).set(v, dist);
    this.getReverseEdges(v).set(u, dist);
    this.leaves.delete(u);
  }
  removeEdge(u, v) {
    this.getOrCreateEdges(u).delete(v);
    this.getReverseEdges(v).delete(u);
    if (!this.getOrCreateEdges(u).size) {
      this.leaves.add(u);
    }
  }
  removeNode(u) {
    for (const v of this.getChildren(u)) {
      this.removeEdge(u, v);
    }
    for (const v of this.getParents(u)) {
      this.removeEdge(v, u);
    }
    this.edges.delete(u);
    this.rEdges.delete(u);
  }
  *getAllEdges() {
    for (const [u, edges] of this.edges) {
      for (const [v, dist] of edges) {
        yield [u, v, dist];
      }
    }
  }
  getEdges(u) {
    return this.edges.get(u);
  }
  size() {
    return this.edges.size;
  }
  getOrCreateEdges(u) {
    if (!this.edges.has(u))
      this.edges.set(u, new Map());
    return this.edges.get(u);
  }
  getReverseEdges(u) {
    if (!this.rEdges.has(u))
      this.rEdges.set(u, new Map());
    return this.rEdges.get(u);
  }
  getDistance(u, v) {
    var _a, _b;
    return (_b = (_a = this.getEdges(u)) == null ? void 0 : _a.get(v)) != null ? _b : Infinity;
  }
  *getChildren(u) {
    var _a;
    for (const [v] of (_a = this.getEdges(u)) != null ? _a : [])
      yield v;
  }
  *getParents(u) {
    for (const [v] of this.getReverseEdges(u))
      yield v;
  }
  *getLeaves() {
    for (const u of this.leaves)
      yield u;
  }
}
class UndirectedGraph {
  constructor(N = 0) {
    this.edges = new Map();
    this.leaves = new Set();
    for (let i = 0; i < N; i++) {
      this.edges.set(i, new Map());
      this.leaves.add(i);
    }
  }
  addEdge(u, v, dist = 1) {
    this.getOrCreateEdges(u).set(v, dist);
    this.updateLeaves(u);
    if (u === v)
      return;
    this.getOrCreateEdges(v).set(u, dist);
    this.updateLeaves(v);
  }
  removeEdge(u, v) {
    this.getOrCreateEdges(u).delete(v);
    this.updateLeaves(u);
    if (u === v)
      return;
    this.getOrCreateEdges(v).delete(u);
    this.updateLeaves(v);
  }
  removeNode(u) {
    for (const v of this.getAdjacent(u)) {
      this.removeEdge(u, v);
    }
    this.edges.delete(u);
  }
  size() {
    return this.edges.size;
  }
  getEdges(u) {
    return this.edges.get(u);
  }
  getOrCreateEdges(u) {
    if (!this.edges.has(u))
      this.edges.set(u, new Map());
    return this.edges.get(u);
  }
  getDistance(u, v) {
    var _a, _b;
    return (_b = (_a = this.getEdges(u)) == null ? void 0 : _a.get(v)) != null ? _b : Infinity;
  }
  *getAllEdges() {
    for (const [u, edges] of this.edges) {
      for (const [v, dist] of edges) {
        if (u <= v)
          yield [u, v, dist];
      }
    }
  }
  *getAdjacent(u) {
    var _a;
    for (const [v] of (_a = this.getEdges(u)) != null ? _a : [])
      yield v;
  }
  *getLeaves() {
    for (const u of this.leaves)
      yield u;
  }
  updateLeaves(u) {
    if (this.getEdges(u).size <= 1)
      this.leaves.add(u);
    else
      this.leaves.delete(u);
  }
}
export {
  DirectedGraph,
  UndirectedGraph
};
