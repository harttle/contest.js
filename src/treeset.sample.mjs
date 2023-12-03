import { TreeSet, TreeMultiSet } from './treeset.mjs'

console.log('TreeSet')
const set = new TreeSet([0, 1, 2, 3, 4, 5], (l, r) => l - r)
console.log('> 2:', set.higher(2))
console.log('> 2.5:', set.higher(2.5))

set.delete(3)
console.log('> 2:', set.higher(2))
console.log('> 2.5:', set.higher(2.5))

console.log('TreeMultiSet')
const mset = new TreeMultiSet()
mset.add(1)
mset.add(1)
mset.add(1)
mset.add(2)
mset.add(2)
console.log('size', mset.size())
mset.delete(1)
console.log('size', mset.size())
mset.deleteAll(1)
console.log('size', mset.size())
