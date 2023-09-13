import { LCA } from '../src/lca'
import { createTree } from '../src/algorithm'

describe('LCA', () => {
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
