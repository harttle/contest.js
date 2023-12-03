import { kmp, rabinkarp } from '../src/string.mjs'

const text = 'abfdslsnajlasnnalanalalnalalnandlalannanaslalsanlanlsananalsnalnaslsjjasan'
const pattern = 'anlsa'

console.log('[kmp] index of pattern', kmp(text, pattern))
console.log('[rabinkarp] index of pattern', rabinkarp(text, pattern))
