const { sort, shuffle, nextPermutation, prevPermutation } = require('../algorithm')

describe('algorithm', () => {   
    describe('shuffle', () =>  {
        it('should shuffle array of length 0', () => {
            expect(shuffle([])).toEqual([])
        })
        it('should shuffle array of length 1', () => {
            expect(shuffle([1])).toEqual([1])
        })
        it('should shuffle array of length 3', () => {
            expect(shuffle([1, 2, 3]).sort()).toEqual([1, 2, 3])
        })
    })
    describe('sort', () => {
        it('should sort a simple array', () => {
            expect(sort([8, 9, 7, 0, 3, 4, 6, 5, 1, 2])).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        })
        it('should sort identical data', () => {
            expect(sort([1, 1, 1, 1, 1])).toEqual([1, 1, 1, 1, 1])
        })
        it('should sort sorted data', () => {
            expect(sort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
        })
        it('should sort an array with duplicate keys', () => {
            expect(sort([1, 3, 2, 1, 5, 5, 4])).toEqual([1, 1, 2, 3, 4, 5, 5])
        })
        it('should work for large data', () => {
            const arr = shuffle(Array(1e4).fill(0).map((v, i) => i))
            const sorted = Array(1e4).fill(0).map((v, i) => i)
            expect(sort(arr)).toEqual(sorted)
        })
        it('should work for large identical data', () => {
            const arr = Array(1e4).fill(0)
            expect(sort(arr)).toEqual(arr)
        })
        it('should work for random data', () => {
            const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
            for(let i = 0; i < 10000; i++) {
                shuffle(arr)
                expect(sort(arr)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
            }
        })
    })
    describe('nextPermutation()', () => {
        it('should return false for a single-element-array', () => {
            let arr = [1]
            expect(nextPermutation(arr)).toEqual(false)
            expect(arr).toEqual([1])
        })
        it('should not throw for an empty array', () => {
            let arr = []
            expect(nextPermutation(arr)).toEqual(false)
            expect(arr).toEqual([])
        })
        it('should arrange a short array', () => {
            let arr = [1, 2, 3]
            expect(nextPermutation(arr)).toEqual(true)
            expect(arr).toEqual([1, 3, 2])
            expect(nextPermutation(arr)).toEqual(true)
            expect(arr).toEqual([2, 1, 3])
            expect(nextPermutation(arr)).toEqual(true)
            expect(arr).toEqual([2, 3, 1])
            expect(nextPermutation(arr)).toEqual(true)
            expect(arr).toEqual([3, 1, 2])
            expect(nextPermutation(arr)).toEqual(true)
            expect(arr).toEqual([3, 2, 1])
            expect(nextPermutation(arr)).toEqual(false)
            expect(arr).toEqual([1, 2, 3])
        })
    })
    describe('prevPermutation()', () => {
        it('should return false for a single-element-array', () => {
            let arr = [1]
            expect(prevPermutation(arr)).toEqual(false)
            expect(arr).toEqual([1])
        })
        it('should not throw for an empty array', () => {
            let arr = []
            expect(prevPermutation(arr)).toEqual(false)
            expect(arr).toEqual([])
        })
        it('should arrange a short array', () => {
            let arr = [1, 2, 3]
            expect(prevPermutation(arr)).toEqual(false)
            expect(arr).toEqual([3, 2, 1])
            expect(prevPermutation(arr)).toEqual(true)
            expect(arr).toEqual([3, 1, 2])
            expect(prevPermutation(arr)).toEqual(true)
            expect(arr).toEqual([2, 3, 1])
            expect(prevPermutation(arr)).toEqual(true)
            expect(arr).toEqual([2, 1, 3])
            expect(prevPermutation(arr)).toEqual(true)
            expect(arr).toEqual([1, 3, 2])
            expect(prevPermutation(arr)).toEqual(true)
            expect(arr).toEqual([1, 2, 3])
        })
    })
})