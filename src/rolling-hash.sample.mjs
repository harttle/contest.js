import { BiRollingHash, RollingHash } from '../src/rolling-hash.mjs'

console.log('RollingHash')
const hash = new RollingHash(3, 10)
hash.digest(3)
hash.digest(4)
hash.digest(5)
console.log('hash of 3,4,5:', hash.getKey())

hash.digest(6)
hash.degest(3)
console.log('hash of 4,5,6:', hash.getKey())

console.log('BiRollingHash')
const bhash = new BiRollingHash(3, 10, 100)
bhash.digest(3)
bhash.digest(4)
bhash.digest(5)
console.log('hash of 3,4,5:', bhash.getKey())

bhash.digest(6)
bhash.degest(3)
console.log('hash of 4,5,6:', bhash.getKey())
