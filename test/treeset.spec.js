const { TreeSet, TreeMultiSet } = require('../treeset')

describe('treeset', () => {
    describe('TreeSet', () => {
        it('should construct from array', () => {
            const set = new TreeSet([0, 1, 2, 3, 4, 5])
            expect([...set.values()]).toEqual([0, 1, 2, 3, 4, 5])
        })
        it('should dedupe', () => {
            const set = new TreeSet([0, 1, 1, 3, 4, 5])
            expect([...set.values()]).toEqual([0, 1, 3, 4, 5])
        })
        it('should support has', () => {
            const set = new TreeSet([0, 1, 2, 3, 4, 5])
            for (let i = 0; i <= 5; i++) expect(set.has(i)).toEqual(true)
            expect(set.has(10)).toEqual(false)
            expect(set.has(-10)).toEqual(false)
        })
        it('should support ceiling', () => {
            const set = new TreeSet([0, 1, 2, 3, 4, 5])
            expect(set.ceiling(1)).toEqual(1)
            expect(set.ceiling(0.5)).toEqual(1)
        })
        it('should support higher', () => {
            const set = new TreeSet([0, 1, 2, 3, 4, 5])
            expect(set.higher(1)).toEqual(2)
            expect(set.higher(0.5)).toEqual(1)
        })
        it('should support floor', () => {
            const set = new TreeSet([0, 1, 2, 3, 4, 5])
            expect(set.floor(1)).toEqual(1)
            expect(set.floor(1.5)).toEqual(1)
        })
        it('should support lower', () => {
            const set = new TreeSet([0, 1, 2, 3, 4, 5])
            expect(set.lower(2)).toEqual(1)
            expect(set.lower(2.5)).toEqual(2)
        })
    })
    describe('TreeSet', () => {
        it('should construct from array', () => {
            const set = new TreeMultiSet([0, 1, 2, 3, 4, 5])
            expect([...set.values()]).toEqual([0, 1, 2, 3, 4, 5])
        })
        it('should not dedupe', () => {
            const set = new TreeMultiSet([0, 1, 1, 3, 4, 5])
            expect([...set.values()]).toEqual([0, 1, 1, 3, 4, 5])
        })
        it('should support count', () => {
            const set = new TreeMultiSet([0, 1, 1, 3, 4, 5])
            expect(set.count(3)).toEqual(1)
            expect(set.count(1)).toEqual(2)
            expect(set.count(10)).toEqual(0)
            set.add(10)
            expect(set.count(10)).toEqual(1)
            set.add(10)
            expect(set.count(10)).toEqual(2)
        })
    })
})
