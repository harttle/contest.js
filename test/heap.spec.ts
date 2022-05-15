import { Heap, RemovableHeap, PriorityQueue } from '../src/heap'

describe('heap', () => {
  describe('Heap', () => {
    it('push increasingly', () => {
      const heap = new Heap()
      for (let i = 0; i <= 5; i++) heap.push(i)
      let ans = ''
      for (let i = 0; i <= 5; i++) {
        ans += String(heap.top())
        ans += String(heap.pop())
      }
      expect(ans).toEqual('001122334455')
    })
    it('push decreasingly', () => {
      const heap = new Heap()
      for (let i = 5; i >= 0; i--) heap.push(i)
      let ans = ''
      for (let i = 0; i <= 5; i++) {
        ans += String(heap.top())
        ans += String(heap.pop())
      }
      expect(ans).toEqual('001122334455')
    })
    it('init with increasing numbers', () => {
      const heap = new Heap([0, 1, 2, 3, 4, 5])
      let ans = ''
      for (let i = 0; i <= 5; i++) {
        ans += String(heap.top())
        ans += String(heap.pop())
      }
      expect(ans).toEqual('001122334455')
    })
    it('init with decreasing numbers', () => {
      const heap = new Heap<number>([5, 4, 3, 2, 1, 0])
      let ans = ''
      for (let i = 0; i <= 5; i++) {
        ans += String(heap.top())
        ans += String(heap.pop())
      }
      expect(ans).toEqual('001122334455')
    })
    it('should support custom less', () => {
      const heap = new Heap<number>((l, r) => r - l)
      for (let i = 0; i <= 5; i++) heap.push(i)
      let ans = ''
      for (let i = 0; i <= 5; i++) {
        ans += String(heap.top())
        ans += String(heap.pop())
      }
      expect(ans).toEqual('554433221100')
    })
  })
  describe('RemovableHeap', () => {
    it('should behave like Heap', () => {
      const heap = new RemovableHeap()
      heap.push(3)
      expect(heap.top()).toEqual(3)
      heap.push(4)
      expect(heap.top()).toEqual(3)
      heap.push(2)
      expect(heap.top()).toEqual(2)
    })
    it('should remove elements', () => {
      const heap = new RemovableHeap()
      heap.push(3)
      heap.push(4)
      heap.push(2)
      expect(heap.top()).toEqual(2)
      heap.remove(8)
      expect(heap.top()).toEqual(2)
      heap.remove(2)
      expect(heap.top()).toEqual(3)
    })
    it('should support .has()', () => {
      const heap = new RemovableHeap([1, 2, 5])
      expect(heap.has(1)).toBe(true)
      expect(heap.has(2)).toBe(true)
      expect(heap.has(3)).toBe(false)
      expect(heap.has(4)).toBe(false)
      expect(heap.has(5)).toBe(true)
    })
  })
  describe('PriorityQueue', () => {
    it('push decreasingly', () => {
      const queue = new PriorityQueue()
      for (let i = 5; i >= 0; i--) queue.offer(i)
      let ans = ''
      for (let i = 0; i <= 5; i++) {
        ans += String(queue.peek())
        ans += String(queue.poll())
      }
      expect(ans).toEqual('001122334455')
    })
  })
})
