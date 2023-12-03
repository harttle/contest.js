import { createTree } from './algorithm.mjs'
import { LCA } from './lca.mjs'

const nodes = createTree(4, [[0, 1], [0, 2], [2, 3]])
const lca = new LCA(nodes)
console.log(`lowest common ancestor of ${1} and ${3}:`, lca.getLCA(1, 2))
