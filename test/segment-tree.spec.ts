import { SegmentTree } from '../src/segment-tree'

describe('SegmentTree', () => {
  describe('.valueAt()', () => {
    it('should initial to zeros', () => {
      const tree = new SegmentTree(2)
      expect(tree.valueAt(0)).toEqual(0)
      expect(tree.valueAt(1)).toEqual(0)
      expect(tree.valueAt(2)).toEqual(undefined)
    })
  })
  describe('.update()', () => {
    it('add a single value', () => {
      const tree = new SegmentTree(2)
      tree.update(0, 3)
      expect(tree.valueAt(0)).toEqual(3)
    })
  })
  describe('.prefix()', () => {
    it('should default value to 1', () => {
      const tree = new SegmentTree(5)
      expect(tree.prefix(0)).toEqual(0)
      expect(tree.prefix(1)).toEqual(0)
      expect(tree.prefix(2)).toEqual(0)
      tree.update(0, 1)
      expect(tree.prefix(0)).toEqual(1)
      expect(tree.prefix(1)).toEqual(1)
      expect(tree.prefix(2)).toEqual(1)
      tree.update(1, 2)
      expect(tree.prefix(0)).toEqual(1)
      expect(tree.prefix(1)).toEqual(3)
      expect(tree.prefix(2)).toEqual(3)
      tree.update(2, 3)
      expect(tree.prefix(0)).toEqual(1)
      expect(tree.prefix(1)).toEqual(3)
      expect(tree.prefix(2)).toEqual(6)
    })
  })

  describe('prefix searching', () => {
    const tree = new SegmentTree(5)
    tree.update(0, 1) // sum 1
    tree.update(1, 2) // sum 3
    tree.update(2, 3) // sum 6
    tree.update(3, 4) // sum 10

    it('higher', () => {
      expect(tree.higher(7)).toEqual(3)
      expect(tree.higher(6)).toEqual(3)
      expect(tree.higher(5)).toEqual(2)
      expect(tree.higher(10)).toEqual(Infinity)
    })

    it('ceil', () => {
      expect(tree.ceil(7)).toEqual(3)
      expect(tree.ceil(6)).toEqual(2)
      expect(tree.ceil(5)).toEqual(2)
      expect(tree.ceil(11)).toEqual(Infinity)
    })

    it('lower', () => {
      expect(tree.lower(7)).toEqual(2)
      expect(tree.lower(6)).toEqual(1)
      expect(tree.lower(5)).toEqual(1)
      expect(tree.lower(0)).toEqual(-1)
    })

    it('floor', () => {
      expect(tree.floor(7)).toEqual(2)
      expect(tree.floor(6)).toEqual(2)
      expect(tree.floor(5)).toEqual(1)
      expect(tree.floor(0)).toEqual(-1)
    })
  })
  describe('customize aggregate', () => {
    it('aggregate=Math.max', () => {
      const tree = new SegmentTree(5, Math.max)
      expect(tree.prefix(0)).toEqual(0)
      expect(tree.prefix(1)).toEqual(0)
      expect(tree.prefix(2)).toEqual(0)
      tree.update(0, 1)
      expect(tree.prefix(0)).toEqual(1)
      expect(tree.prefix(1)).toEqual(1)
      expect(tree.prefix(2)).toEqual(1)
      tree.update(1, 3)
      expect(tree.prefix(0)).toEqual(1)
      expect(tree.prefix(1)).toEqual(3)
      expect(tree.prefix(2)).toEqual(3)
      tree.update(2, 2)
      expect(tree.prefix(0)).toEqual(1)
      expect(tree.prefix(1)).toEqual(3)
      expect(tree.prefix(2)).toEqual(3)
    })
  })
})
