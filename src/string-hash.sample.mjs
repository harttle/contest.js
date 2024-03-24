import { BiStringHash, StringHash } from '../src/string-hash.mjs'

console.log('StringHash')
const hash = new StringHash(10)
hash.digest(3)
hash.digest(4)
hash.digest(5)
console.log('hash of 3,4,5:', hash.getKey())

hash.digest(6)
console.log('hash of 4,5,6:', hash.getKey())

console.log('BiStringHash')
const bhash = new BiStringHash(10, 100)
bhash.digest(3)
bhash.digest(4)
bhash.digest(5)
console.log('hash of 3,4,5:', bhash.getKey())

bhash.digest(6)
console.log('hash of 4,5,6:', bhash.getKey())
