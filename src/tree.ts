export interface TreeNode {
  index: number
  children: Set<TreeNode>
  depth: number
  parent?: TreeNode
}

export interface WeightedTreeNode {
  index: number
  children: Map<WeightedTreeNode, number>
  depth: number
  parent?: WeightedTreeNode
}

export function createTree (N: number, edges: Array<[number, number] | [number, number]>): TreeNode[] {
  const nodes: TreeNode[] = Array(N).fill(0).map((_x, index) => ({ index, children: new Set(), depth: 0, parent: undefined }))
  const G = Array(N).fill(0).map(_x => new Set<number>())
  for (const [u, v] of edges) {
    G[u].add(v)
    G[v].add(u)
  }
  const root = nodes[0]

  const added = new Set([root])
  for (const node of added) {
    for (const j of G[node.index]) {
      if (!added.has(nodes[j])) {
        node.children.add(nodes[j])
        nodes[j].parent = node
        nodes[j].depth = node.depth + 1
        added.add(nodes[j])
      }
    }
  }
  return nodes
}

export function createWeightedTree (N: number, edges: Array<[number, number, number] | [number, number]>): WeightedTreeNode[] {
  const nodes: WeightedTreeNode[] = Array(N).fill(0).map((_x, index) => ({ index, children: new Map(), depth: 0, parent: undefined }))
  const G = Array(N).fill(0).map(_x => new Map())
  for (const [u, v, w = 1] of edges) {
    G[u].set(v, w)
    G[v].set(u, w)
  }
  const root = nodes[0]

  const added = new Set([root])
  for (const node of added) {
    for (const [j, w] of G[node.index]) {
      if (!added.has(nodes[j])) {
        node.children.set(nodes[j], w)
        nodes[j].parent = node
        nodes[j].depth = node.depth + 1
        added.add(nodes[j])
      }
    }
  }
  return nodes
}

export class LCA {
  N: number
  B: number
  ancestors: number[][]
  depths: number[]
  constructor (nodes: TreeNode[]) {
    this.depths = nodes.map(x => x.depth)
    this.N = nodes.length
    this.B = Math.floor(Math.log2(this.N))
    this.ancestors = Array(this.N).fill(0).map(_x => Array(this.B + 1).fill(-1))
    for (const node of nodes) this.ancestors[node.index][0] = node.parent ? node.parent.index : -1
    for (let b = 1; b <= this.B; b++) {
      for (let i = 0; i < this.N; i++) {
        if (this.ancestors[i][b - 1] !== -1) {
          this.ancestors[i][b] = this.ancestors[this.ancestors[i][b - 1]][b - 1]
        }
      }
    }
  }

  getLCA (u: number, v: number): number {
    if (this.depths[u] < this.depths[v]) return this.getLCA(v, u)
    for (let b = this.B; b >= 0; b--) {
      if (this.ancestors[u][b] !== -1 && this.depths[this.ancestors[u][b]] >= this.depths[v]) {
        u = this.ancestors[u][b]
      }
    }
    if (u === v) return u
    for (let b = this.B; b >= 0; b--) {
      if (this.ancestors[u][b] !== this.ancestors[v][b]) {
        u = this.ancestors[u][b]
        v = this.ancestors[v][b]
      }
    }
    return this.ancestors[u][0]
  }
}
