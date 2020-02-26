class BinarySegmentTree {
    /**
     * @param {number} height The height of the tree,
     *     corresponding to decisions to make or digits to map
     * @example
     *     height: 1
     *     tree: [0, 2, 1, 1] (4 elements with 1 placeholder)
     */
    constructor(height) {
        this.data = Array(2 ** (height + 1)).fill(0)
        this.height = height
    }

    /**
     * Add value to the specified key
     * 
     * @param {number} key The binary key to which `val` is added
     * @param {number} val The value to add
     */
    add(key, val = 1) {
        let root = 1
        this.data[root] += val

        for (let i = this.height - 1; i >= 0; i--) {
            let bit = 1 << i
            let kBit = bit & key
            root = kBit ? this.right(root, i, bit) : this.left(root, i, bit)
            this.data[root] += val
        }
    }

    /**
     * Query the sum of values with key <= `key`
     * 
     * @param {number} key The upper limit to query
     */
    leq (key) {
        let sum = 0, root = 1
        for (let i = this.height - 1; i >= 0; i--) {
            let bit = 1 << i
            let kBit = key & bit
            if (kBit) {
                sum += this.data[this.left(root, i, bit)]
                root = this.right(root, i, bit)
            } else {
                root = this.left(root, i, bit)
            }
        }
        sum += this.data[root]
        return sum
    }
    left (i) {
        return i * 2
    }
    right (i) {
        return i * 2 + 1
    }
}

module.exports = { BinarySegmentTree }