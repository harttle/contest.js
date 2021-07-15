import { AdjList } from '../adjlist'

describe('AdjList', () => {
  it('should return all edges from a vertex', () => {
    const adjList = new AdjList(5, 6)
    adjList.add(1, 2, 10)
    adjList.add(2, 5, 1); adjList.add(2, 3, 2)
    adjList.add(3, 5, 3)
    adjList.add(5, 1, 3); adjList.add(5, 4, 13)
    for (const e of adjList.edges(1)) {
      expect(e[0]).toBe(2)
      expect(e[1]).toBe(10)
    }
    let i = 0
    for (const e of adjList.edges(2)) {
      if (i === 0) {
        expect(e[0]).toBe(3)
        expect(e[1]).toBe(2)
      } else if (i === 1) {
        expect(e[0]).toBe(5)
        expect(e[1]).toBe(1)
      }
      i++
    }
  })
})
