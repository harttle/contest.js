import { LCA, TreeNode, WeightedTreeNode, createTree, createWeightedTree } from '../src/tree'


describe('tree', () => {
  describe('createTree()', () => {
    it('should be able to create a single node tree', () => {
      expect(createTree(1, [])).toEqual([{ index: 0, children: new Set(), parent: undefined, depth: 0 }])
    })
    it('should be able to create a tree with 3 nodes', () => {
      const b: TreeNode = { index: 1, children: new Set(), parent: undefined, depth: 1 }
      const c: TreeNode = { index: 2, children: new Set(), parent: undefined, depth: 1 }
      const a: TreeNode = { index: 0, children: new Set([b, c]), parent: undefined, depth: 0 }
      b.parent = c.parent = a
      expect(createTree(3, [[0, 1], [0, 2]])).toEqual([a, b, c])
    })
  })
  describe('createWeightedTree()', () => {
    it('should be able to create a single node tree', () => {
      expect(createWeightedTree(1, [])).toEqual([{ index: 0, children: new Map(), parent: undefined, depth: 0 }])
    })
    it('should be able to create a tree with default weight', () => {
      const b: WeightedTreeNode = { index: 1, children: new Map(), parent: undefined, depth: 1 }
      const c: WeightedTreeNode = { index: 2, children: new Map(), parent: undefined, depth: 1 }
      const a: WeightedTreeNode = { index: 0, children: new Map([[b, 1], [c, 1]]), parent: undefined, depth: 0 }
      b.parent = c.parent = a
      expect(createWeightedTree(3, [[0, 1], [0, 2]])).toEqual([a, b, c])
    })
    it('should be able to create a tree with specified weight', () => {
      const b: WeightedTreeNode = { index: 1, children: new Map(), parent: undefined, depth: 1 }
      const c: WeightedTreeNode = { index: 2, children: new Map(), parent: undefined, depth: 1 }
      const a: WeightedTreeNode = { index: 0, children: new Map([[b, 2], [c, 3]]), parent: undefined, depth: 0 }
      b.parent = c.parent = a
      expect(createWeightedTree(3, [[0, 1, 2], [0, 2, 3]])).toEqual([a, b, c])
    })
  })

  describe('LCA', () => {
    it('typical', () => {
      const nodes = createTree(6, [[0, 1], [0, 2], [1, 4], [1, 3], [4, 5]])
      const lca = new LCA(nodes)
      expect(lca.getLCA(3, 5)).toEqual(1)
    })
    it('direct siblings', () => {
      const nodes = createTree(3, [[0, 1], [0, 2]])
      const lca = new LCA(nodes)
      expect(lca.getLCA(1, 2)).toEqual(0)
    })
    it('root node', () => {
      const nodes = createTree(3, [[0, 1], [0, 2]])
      const lca = new LCA(nodes)
      expect(lca.getLCA(0, 0)).toEqual(0)
    })
    it('same node', () => {
      const nodes = createTree(3, [[0, 1], [0, 2]])
      const lca = new LCA(nodes)
      expect(lca.getLCA(1, 1)).toEqual(1)
    })
  })
})
