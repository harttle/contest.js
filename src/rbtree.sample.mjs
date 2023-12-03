import { RBTree } from './rbtree.mjs'

const tree = new RBTree()
for (let i = 0; i < 7; i++) {
  tree.insert(i)
  console.log('color of root', tree.root.color)
}
