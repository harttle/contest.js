const { BinarySegmentTree } = require('../segment-tree')

describe('BinarySegmentTree', () => {
    it('should initial to zeros', () => {
        let tree = new BinarySegmentTree(2)
        expect(tree.leq(0)).toEqual(0)
        expect(tree.leq(1)).toEqual(0)
        expect(tree.leq(2)).toEqual(0)
        expect(tree.leq(3)).toEqual(0)
    })
    it('add a single value', () => {
        let tree = new BinarySegmentTree(2)
        tree.add(2, 3)
        expect(tree.leq(0)).toEqual(0)
        expect(tree.leq(1)).toEqual(0)
        expect(tree.leq(2)).toEqual(3)
        expect(tree.leq(3)).toEqual(3)
    })
    it('should default value to 1', () => {
        let tree = new BinarySegmentTree(2)
        tree.add(2)
        expect(tree.leq(0)).toEqual(0)
        expect(tree.leq(1)).toEqual(0)
        expect(tree.leq(2)).toEqual(1)
        expect(tree.leq(3)).toEqual(1)
    })
})
