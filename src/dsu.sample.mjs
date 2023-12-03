import { DSU } from './dsu.mjs'

const dsu = new DSU(6)

dsu.union(0, 1)
dsu.union(0, 2)
dsu.union(0, 3)
dsu.union(4, 5)

console.log('group of 0', dsu.find(0))
console.log('group of 1', dsu.find(1))
console.log('group of 2', dsu.find(2))
console.log('group of 3', dsu.find(3))
console.log('group of 4', dsu.find(4))
console.log('group of 5', dsu.find(5))
