import { Deque } from '../deque'

describe('Deque', () => {
  it('should support push/pop', () => {
    const deque = new Deque()
    expect(deque.size()).toEqual(0)
    expect(deque.front()).toEqual(undefined)
    expect(deque.back()).toEqual(undefined)
    expect([...deque.values()]).toEqual([])
    deque.push(1)
    expect(deque.size()).toEqual(1)
    expect(deque.front()).toEqual(1)
    expect(deque.back()).toEqual(1)
    expect([...deque.values()]).toEqual([1])
    deque.push(2)
    expect(deque.size()).toEqual(2)
    expect(deque.front()).toEqual(1)
    expect(deque.back()).toEqual(2)
    expect([...deque.values()]).toEqual([1, 2])
    deque.push(3)
    expect(deque.size()).toEqual(3)
    expect(deque.front()).toEqual(1)
    expect(deque.back()).toEqual(3)
    expect([...deque.values()]).toEqual([1, 2, 3])

    expect(deque.pop()).toEqual(3)
    expect(deque.size()).toEqual(2)
    expect(deque.front()).toEqual(1)
    expect(deque.back()).toEqual(2)
    expect([...deque.values()]).toEqual([1, 2])

    expect(deque.pop()).toEqual(2)
    expect(deque.size()).toEqual(1)
    expect(deque.front()).toEqual(1)
    expect(deque.back()).toEqual(1)
    expect([...deque.values()]).toEqual([1])

    expect(deque.pop()).toEqual(1)
    expect(deque.size()).toEqual(0)
    expect(deque.front()).toEqual(undefined)
    expect(deque.back()).toEqual(undefined)
    expect([...deque.values()]).toEqual([])
  })
  it('should support shift/unshift', () => {
    const deque = new Deque()
    expect(deque.size()).toEqual(0)
    expect([...deque.values()]).toEqual([])
    deque.unshift(1)
    expect(deque.size()).toEqual(1)
    expect([...deque.values()]).toEqual([1])
    deque.unshift(2)
    expect(deque.size()).toEqual(2)
    expect([...deque.values()]).toEqual([2, 1])
    deque.unshift(3)
    expect(deque.size()).toEqual(3)
    expect([...deque.values()]).toEqual([3, 2, 1])

    expect(deque.shift()).toEqual(3)
    expect(deque.size()).toEqual(2)
    expect([...deque.values()]).toEqual([2, 1])

    expect(deque.shift()).toEqual(2)
    expect(deque.size()).toEqual(1)
    expect([...deque.values()]).toEqual([1])

    expect(deque.shift()).toEqual(1)
    expect(deque.size()).toEqual(0)
    expect([...deque.values()]).toEqual([])
  })
  it('pop/shift on empty deque', () => {
    const deque = new Deque()
    expect(deque.front()).toEqual(undefined)
    expect(deque.back()).toEqual(undefined)
    deque.shift()
    expect(deque.front()).toEqual(undefined)
    expect(deque.back()).toEqual(undefined)
    deque.shift()
    deque.pop()
    deque.pop()
    expect([...deque.values()]).toEqual([])
  })
  it('should work for large data', () => {
    const deque = new Deque<number>()
    const arr = []
    for (let i = 0; i < 1e4; i++) {
      const num = Math.floor(1e9 * Math.random())
      if (num % 4 === 0) {
        deque.push(num)
        arr.push(num)
      }
      if (num % 4 === 1) {
        deque.shift()
        arr.shift()
      }
      if (num % 4 === 2) {
        deque.unshift(num)
        arr.unshift(num)
      }
      if (num % 4 === 3) {
        deque.pop()
        arr.pop()
      }
    }
    expect(arr).toEqual([...deque.values()])
  })
})
