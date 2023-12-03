import { SegmentTree } from './segment-tree.mjs'

const tree = new SegmentTree(5)
tree.update(0, 1) // sum 1
tree.update(1, 2) // sum 3
tree.update(2, 3) // sum 6
tree.update(3, 4) // sum 10

console.log('index for presum > 6:', tree.higher(6))
console.log('index for presum >= 6:', tree.ceil(6))

console.log('sum between [1, 2] inclusive:', tree.query(1, 2))
tree.update(2, 1)
console.log('sum between [1, 2] inclusive:', tree.query(1, 2))
