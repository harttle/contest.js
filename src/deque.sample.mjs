import { CircularDeque, Deque } from './deque.mjs'

const deque = new Deque([1, 2, 3, 4, 5])
console.log('Deque')
console.log('front:', deque.front())
console.log('back:', deque.back())

const circular = new CircularDeque(5)
circular.push(3)
circular.push(4)
circular.push(5)

circular.unshift(2)
circular.unshift(1)
circular.unshift(0)

console.log('CircularDeque')
console.log('isFull:', circular.isFull())
console.log('front:', circular.front())
console.log('back:', circular.back())
