import { TreeMap } from '../src/treemap'

describe('treemap', () => {
  describe('TreeMap', () => {
    it('should construct from array', () => {
      const map = new TreeMap([[0, 'a'], [1, 'b'], [2, 'c']])
      expect([...map.values()]).toEqual(['a', 'b', 'c'])
    })
    it('should dedupe', () => {
      const map = new TreeMap([[0, 'a'], [0, 'b'], [2, 'c']])
      expect([...map.values()]).toEqual(['b', 'c'])
    })
    it('should support has', () => {
      const map = new TreeMap([[0, 'a'], [1, 'b'], [2, 'c']])
      for (let i = 0; i <= 2; i++) expect(map.has(i)).toEqual(true)
      expect(map.has(10)).toEqual(false)
      expect(map.has(-10)).toEqual(false)
    })
    it('should support ceil', () => {
      const map = new TreeMap([[0, 'a'], [1, 'b'], [2, 'c']])
      expect(map.ceil(1)).toEqual([1, 'b'])
      expect(map.ceil(0.5)).toEqual([1, 'b'])
    })
    it('should support higher', () => {
      const map = new TreeMap([[0, 'a'], [1, 'b'], [2, 'c']])
      expect(map.higher(1)).toEqual([2, 'c'])
      expect(map.higher(0.5)).toEqual([1, 'b'])
    })
    it('should support floor', () => {
      const map = new TreeMap([[0, 'a'], [1, 'b'], [2, 'c']])
      expect(map.floor(1)).toEqual([1, 'b'])
      expect(map.floor(1.5)).toEqual([1, 'b'])
    })
    it('should support lower', () => {
      const map = new TreeMap([[1, 'a'], [2, 'b'], [3, 'c']])
      expect(map.lower(2)).toEqual([1, 'a'])
      expect(map.lower(2.5)).toEqual([2, 'b'])
    })
    it('should support first', () => {
      const map = new TreeMap([[0, 'a'], [1, 'b'], [2, 'c']])
      expect(map.first()).toEqual([0, 'a'])
    })
    it('should support last', () => {
      const map = new TreeMap([[0, 'a'], [1, 'b'], [2, 'c']])
      expect(map.last()).toEqual([2, 'c'])
    })
    it('should support shift', () => {
      const map = new TreeMap([[0, 'a'], [1, 'b'], [2, 'c']])
      expect(map.shift()).toEqual([0, 'a'])
      expect(map.size()).toEqual(2)
    })
    it('should support pop', () => {
      const map = new TreeMap([[0, 'a'], [1, 'b'], [2, 'c']])
      expect(map.pop()).toEqual([2, 'c'])
      expect(map.size()).toEqual(2)
    })
    it('should sort the values correctly', () => {
      for (let i = 0; i < 20; i++) {
        const arr: Array<[number, number]> = [...Array(100)].map((v, i) => [Math.random(), i])
        const map = new TreeMap(arr)
        expect([...map.values()]).toEqual(arr.sort((a, b) => a[0] - b[0]).map(x => x[1]))
        expect([...map.rvalues()]).toEqual(arr.sort((a, b) => b[0] - a[0]).map(x => x[1]))
      }
    })
    it('should support empty data', () => {
      const map = new TreeMap()
      map.set(2, 'b')
      map.set(3, 'c')
      expect(map.lower(3)).toEqual([2, 'b'])
      expect(map.lower(2.5)).toEqual([2, 'b'])
    })
    it('should support customize compare', () => {
      const map = new TreeMap([[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']], (l, r) => r - l)
      expect(map.lower(2)).toEqual([3, 'c'])
      expect(map.lower(2.5)).toEqual([3, 'c'])
    })
    it('should support customize compare without data', () => {
      const map = new TreeMap((l, r) => r - l)
      map.set(2, 'b')
      map.set(3, 'c')
      expect(map.lower(2)).toEqual([3, 'c'])
      expect(map.lower(2.5)).toEqual([3, 'c'])
    })
    it('should treat items as equal ones when `compare` returns 0', () => {
      const s = new TreeMap<[number, number]>([], (a: [number, number], b: [number, number]) => {
        if (a[0] !== b[0]) return a[0] - b[0]
        return a[1] - b[1]
      })
      s.set([1, 2], 'a')
      s.set([1, 2], 'b')
      expect(s.size()).toEqual(1)
    })
  })
})
