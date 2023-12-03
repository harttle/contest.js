import { DirectedGraph, UndirectedGraph } from './graph.mjs'

console.log('UndirectedGraph')
const dg = new UndirectedGraph(3)

dg.addEdge(0, 1)
dg.addEdge(1, 2)
console.log('size', dg.size())

dg.removeNode(1)
console.log('size', dg.size())

console.log('DirectedGraph')
const g = new DirectedGraph(4)
g.addEdge(0, 1)
g.addEdge(1, 2)
g.addEdge(1, 3)
console.log('leaves:')
for (const u of g.getLeaves()) {
  console.log(u)
}
