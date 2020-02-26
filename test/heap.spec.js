const { Heap, RemovableHeap } = require('../heap')

describe('heap', () => {
    describe('Heap', () => {
        it('push increasingly', () => {
            const heap = new Heap()
            for (let i = 0; i <= 5; i++) heap.push(i)
            let ans = ''
            for (let i = 0; i <= 5; i++) {
                ans += heap.top()
                ans += heap.pop()
            }
            expect(ans).toEqual('001122334455')
        })
        it('push decreasingly', () => {
            const heap = new Heap()
            for (let i = 5; i >= 0; i--) heap.push(i)
            let ans = ''
            for (let i = 0; i <= 5; i++) {
                ans += heap.top()
                ans += heap.pop()
            }
            expect(ans).toEqual('001122334455')
        })
        it('init with increasing numbers', () => {
            const heap = new Heap([0, 1, 2, 3, 4, 5])
            let ans = ''
            for (let i = 0; i <= 5; i++) {
                ans += heap.top()
                ans += heap.pop()
            }
            expect(ans).toEqual('001122334455')
        })
        it('init with decreasing numbers', () => {
            const heap = new Heap([5, 4, 3, 2, 1, 0])
            let ans = ''
            for (let i = 0; i <= 5; i++) {
                ans += heap.top()
                ans += heap.pop()
            }
            expect(ans).toEqual('001122334455')
        })
        it('should support custom less', () => {
            const heap = new Heap((l, r) => l > r)
            for (let i = 0; i <= 5; i++) heap.push(i)
            let ans = ''
            for (let i = 0; i <= 5; i++) {
                ans += heap.top()
                ans += heap.pop()
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
    })
})
