import { DirectedGraph, UndirectedGraph } from '../src/graph'

describe('DirectedGraph', () => {
  it('should yield leaves', () => {
    const g = new DirectedGraph(3)
    g.addEdge(0, 1)
    g.addEdge(1, 2)
    const outs = []
    for (const u of g.getLeaves()) {
      outs.push(u)
    }
    expect(outs).toEqual([2])
  })
  it('should yield leaves recursively', () => {
    const g = new DirectedGraph(3)
    g.addEdge(0, 1)
    g.addEdge(1, 2)
    const outs = []
    for (const u of g.getLeaves()) {
      outs.push(u)
      for (const v of g.getParents(u)) {
        g.removeEdge(v, u)
      }
    }
    expect(outs).toEqual([2, 1, 0])
  })
})

describe('UndirectedGraph', () => {
  it('should removeNode', () => {
    const g = new UndirectedGraph(3)
    g.addEdge(0, 1)
    g.addEdge(1, 2)
    expect(g.size()).toEqual(3)
    g.removeNode(1)
    expect(g.size()).toEqual(2)
  })
  it('should yield leaves', () => {
    const g = new UndirectedGraph(3)
    g.addEdge(0, 1)
    g.addEdge(1, 2)
    const outs = []
    for (const u of g.getLeaves()) {
      outs.push(u)
    }
    expect(outs).toEqual([0, 2])
  })
  it('should yield leaves recursively', () => {
    const g = new UndirectedGraph(3)
    g.addEdge(0, 1)
    g.addEdge(1, 2)
    const outs = []
    for (const u of g.getLeaves()) {
      outs.push(u)
      for (const v of g.getAdjacent(u)) {
        g.removeEdge(v, u)
      }
    }
    expect(outs).toEqual([0, 2, 1])
  })
})
