import { TreapMultiSet } from './treap.mjs'

const sortedList = new TreapMultiSet().add(1, 2, 3, 4, 5)

console.log('ceil 1:', sortedList.ceil(1))
console.log('ceil 5.5:', sortedList.ceil(5.5))
console.log('floor 3.5:', sortedList.floor(3.5))
console.log('bisectLeft 3:', sortedList.bisectLeft(3))
