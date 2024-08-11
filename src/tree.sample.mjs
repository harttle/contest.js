import { createTree, LCA } from './tree.mjs'

const nodes = createTree(6, [[0, 1], [0, 2], [1, 4], [1, 3], [4, 5]])
const lca = new LCA(nodes)
const ancestor = lca.getLCA(3, 5)

console.log(`lowerst common ancestor of 3 and 5 is ${ancestor}`)
