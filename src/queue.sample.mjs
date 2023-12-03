import { Queue } from './queue.mjs'

const queue = new Queue([1, 2, 3, 4, 5])

console.log('front', queue.front())
console.log('back', queue.back())

queue.push(6)
queue.shift()

console.log('front', queue.front())
console.log('back', queue.back())
