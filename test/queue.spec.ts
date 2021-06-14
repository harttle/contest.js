import { Queue } from '../queue'

describe('Queue', () => {
  it('should support push/shift', () => {
    const queue = new Queue()
    expect(queue.size()).toEqual(0)
    expect(queue.front()).toEqual(undefined)
    expect([...queue.values()]).toEqual([])
    queue.push(1)
    expect(queue.size()).toEqual(1)
    expect(queue.front()).toEqual(1)
    expect([...queue.values()]).toEqual([1])
    queue.push(2)
    expect(queue.size()).toEqual(2)
    expect(queue.front()).toEqual(1)
    expect([...queue.values()]).toEqual([1, 2])
    queue.push(3)
    expect(queue.size()).toEqual(3)
    expect(queue.front()).toEqual(1)
    expect([...queue.values()]).toEqual([1, 2, 3])

    expect(queue.shift()).toEqual(1)
    expect(queue.size()).toEqual(2)
    expect(queue.front()).toEqual(2)
    expect([...queue.values()]).toEqual([2, 3])

    expect(queue.shift()).toEqual(2)
    expect(queue.size()).toEqual(1)
    expect(queue.front()).toEqual(3)
    expect([...queue.values()]).toEqual([3])

    expect(queue.shift()).toEqual(3)
    expect(queue.size()).toEqual(0)
    expect(queue.front()).toEqual(undefined)
    expect([...queue.values()]).toEqual([])
  })
  it('shift on empty queue', () => {
    const queue = new Queue()
    expect(queue.front()).toEqual(undefined)
    queue.shift()
    expect(queue.front()).toEqual(undefined)
    expect([...queue.values()]).toEqual([])
  })
  it('should work for large data', () => {
    const queue = new Queue()
    const arr = []
    const data = Array(1e4).fill(0).map(() => Math.floor(1e9 * Math.random()))
    for (const num of data) {
      if (num % 2 === 0) {
        queue.push(num)
        arr.push(num)
      }
      if (num % 2 === 1) {
        queue.shift()
        arr.shift()
      }
    }
    expect(arr).toEqual([...queue.values()])
  })
})
