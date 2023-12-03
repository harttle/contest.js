import { TreeMap } from '../src/treemap.mjs'

const map = new TreeMap([[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']], (l, r) => l - r)

console.log('has(3):', map.has(3))
console.log('key > 2:', map.higher(2))
map.delete(3)

console.log('has(3):', map.has(3))
console.log('key > 2:', map.higher(2))
