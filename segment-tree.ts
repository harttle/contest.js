export class BinarySegmentTree {
  data: number[]
  height: number

  /**
     * @param {number} height The height of the tree,
     *     corresponding to decisions to make or digits to map
     * @example
     *     height: 1
     *     tree: [0, 2, 1, 1] (4 elements with 1 placeholder)
     */
  constructor (height: number) {
    this.data = Array(2 ** (height + 1)).fill(0)
    this.height = height
  }

  /**
     * Add value to the specified key
     *
     * @param {number} key The binary key to which `val` is added
     * @param {number} val The value to add
     */
  add (key: number, val = 1): void {
    let root = 1
    this.data[root] += val

    for (let i = this.height - 1; i >= 0; i--) {
      const bit = 1 << i
      const kBit = bit & key
      root = kBit ? this.right(root) : this.left(root)
      this.data[root] += val
    }
  }

  /**
     * Query the sum of values with key <= `key`
     *
     * @param {number} key The upper limit to query
     */
  leq (key: number): number {
    let sum = 0; let root = 1
    for (let i = this.height - 1; i >= 0; i--) {
      const bit = 1 << i
      const kBit = key & bit
      if (kBit) {
        sum += this.data[this.left(root)]
        root = this.right(root)
      } else {
        root = this.left(root)
      }
    }
    sum += this.data[root]
    return sum
  }

  left (i: number): number {
    return i * 2
  }

  right (i: number): number {
    return i * 2 + 1
  }
}
