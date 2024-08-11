// src/tree.ts
function createTree(N, edges) {
  const nodes = Array(N).fill(0).map((_x, index) => ({ index, children: new Set(), depth: 0, parent: void 0 }));
  const G = Array(N).fill(0).map((_x) => new Set());
  for (const [u, v] of edges) {
    G[u].add(v);
    G[v].add(u);
  }
  const root = nodes[0];
  const added = new Set([root]);
  for (const node of added) {
    for (const j of G[node.index]) {
      if (!added.has(nodes[j])) {
        node.children.add(nodes[j]);
        nodes[j].parent = node;
        nodes[j].depth = node.depth + 1;
        added.add(nodes[j]);
      }
    }
  }
  return nodes;
}
function createWeightedTree(N, edges) {
  const nodes = Array(N).fill(0).map((_x, index) => ({ index, children: new Map(), depth: 0, parent: void 0 }));
  const G = Array(N).fill(0).map((_x) => new Map());
  for (const [u, v, w = 1] of edges) {
    G[u].set(v, w);
    G[v].set(u, w);
  }
  const root = nodes[0];
  const added = new Set([root]);
  for (const node of added) {
    for (const [j, w] of G[node.index]) {
      if (!added.has(nodes[j])) {
        node.children.set(nodes[j], w);
        nodes[j].parent = node;
        nodes[j].depth = node.depth + 1;
        added.add(nodes[j]);
      }
    }
  }
  return nodes;
}
var LCA = class {
  constructor(nodes) {
    this.depths = nodes.map((x) => x.depth);
    this.N = nodes.length;
    this.B = Math.floor(Math.log2(this.N));
    this.ancestors = Array(this.N).fill(0).map((_x) => Array(this.B + 1).fill(-1));
    for (const node of nodes)
      this.ancestors[node.index][0] = node.parent ? node.parent.index : -1;
    for (let b = 1; b <= this.B; b++) {
      for (let i = 0; i < this.N; i++) {
        if (this.ancestors[i][b - 1] !== -1) {
          this.ancestors[i][b] = this.ancestors[this.ancestors[i][b - 1]][b - 1];
        }
      }
    }
  }
  getLCA(u, v) {
    if (this.depths[u] < this.depths[v])
      return this.getLCA(v, u);
    for (let b = this.B; b >= 0; b--) {
      if (this.ancestors[u][b] !== -1 && this.depths[this.ancestors[u][b]] >= this.depths[v]) {
        u = this.ancestors[u][b];
      }
    }
    if (u === v)
      return u;
    for (let b = this.B; b >= 0; b--) {
      if (this.ancestors[u][b] !== this.ancestors[v][b]) {
        u = this.ancestors[u][b];
        v = this.ancestors[v][b];
      }
    }
    return this.ancestors[u][0];
  }
};
export {
  LCA,
  createTree,
  createWeightedTree
};
