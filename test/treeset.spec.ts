import { TreeSet, TreeMultiSet } from '../src/treeset'

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
    it('should sort the values correctly', () => {
      for (let i = 0; i < 20; i++) {
        const arr = [...Array(100)].map(() => Math.random())
        const set = new TreeSet(arr)
        expect([...set.values()]).toEqual(arr.sort((a, b) => a - b))
        expect([...set.rvalues()]).toEqual(arr.sort((a, b) => b - a))
      }
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
    it('delete should only erase the value when count is 0', () => {
      const set = new TreeMultiSet([4, 4])
      expect(set.size()).toEqual(2)
      set.delete(4)
      expect(set.size()).toEqual(1)
      expect(set.values().next().value).toEqual(4)
      set.delete(4)
      expect(set.size()).toEqual(0)
      set.add(4)
      expect(set.size()).toEqual(1)
    })
    it('should sort the values correctly', () => {
      for (let i = 0; i < 20; i++) {
        let arr = [...Array(100)].map(() => Math.random())
        arr = [...arr, ...arr]
        const set = new TreeMultiSet(arr)
        expect([...set.values()]).toEqual(arr.sort((a, b) => a - b))
        expect([...set.rvalues()]).toEqual(arr.sort((a, b) => b - a))
        expect(set.count(set.rvalues().next().value)).toEqual(2)
      }
    })
  })
})
