const { RBTree } = require('../rbtree')
const { shuffle } = require('../algorithm')
/**
 * Red-Black Tree Properties:
 * 
 * 1) Every node has a color either red or black.
 * 2) Root of tree is always black.
 * 3) There are no two adjacent red nodes (A red node cannot have a red parent or red child).
 * 4) Every path from a node (including root) to any of its descendant NULL node has the same number of black nodes.
 */
describe('RBTree', () => {
    it('should find inserted data', () => {
        const t = new RBTree()
        for(let i = 0; i < 10; i++) t.insert(i)
        expect(t.find(1)).toHaveProperty('data', 1)
        expect(t.find(2)).toHaveProperty('data', 2)
        expect(t.find(9)).toHaveProperty('data', 9)
    })
    it('should return null if not found', () => {
        const t = new RBTree()
        for(let i = 0; i < 10; i++) t.insert(i)
        expect(t.find(100)).toBeNull()
        expect(t.find(-1)).toBeNull()
        expect(t.find(10)).toBeNull()
    })
    it('should deleteByValue inserted data', () => {
        const t = new RBTree()
        const data = shuffle(Array(10).fill(0).map((v, i) => i))
        for(const d of data) t.insert(d)
        
        t.deleteByValue(1)
        expect(t.find(1)).toBeNull()
        t.deleteByValue(2)
        expect(t.find(2)).toBeNull()
        t.deleteByValue(9)
        expect(t.find(9)).toBeNull()
    })
    it('prop2: root is always black', () => {
        const t = new RBTree()
        for(let i = 0; i < 1e4; i++) {
            t.insert(i)
            expect(t.root.color).toEqual(1)
        }
    })
    it('prop3: no adjacent red nodes', () => {
        const t = new RBTree()
        for(let i = 0; i < 1e4; i++) t.insert(i)
        const dfs = (root) => {
            if (!root) return false
            if (root.parent && root.color === 0 && root.parent.color === 0) return true
            return dfs(root.left) || dfs(root.right)
        }
        expect(dfs(t.root)).toBeFalsy()
    })
    it('prop4: all leaves have same black height', () => {
        const t = new RBTree()
        for(let i = 0; i < 1e4; i++) t.insert(i)
        let maxBH = -Infinity
        let minBH = Infinity
        for(let i = 0; i < 1e4; i++) {
            const node = t.find(i)
            if (!node.left || !node.right) {
                const height = blackHeight(node)
                maxBH = Math.max(maxBH, height)
                minBH = Math.min(minBH, height)
            }
        }
        expect(maxBH).toEqual(minBH)
    })
    it('should be quick enough for 10k items', () => {
        const t = new RBTree()
        const s = new Set()
        // insert
        for(let i = 0; i < 1e4; i++) {
            const r = Math.random()
            s.add(r)
            t.insert(r)
        }
        // find
        for(let r of s) expect(t.find(r)).toHaveProperty('data', r)
        // delete
        const arr = shuffle([...s])
        for(let i = 0; i < arr.length; i++) {
            if (i < arr.length / 2) {
                t.deleteByValue(arr[i])
                expect(t.find(arr[i])).toBeNull()
            } else {
                expect(t.find(arr[i])).toHaveProperty('data', arr[i])
            }
        }
    })
    it('should support costom compare', () => {
        const t = new RBTree((lhs, rhs) => rhs < lhs)
        for(let i = 0; i < 10; i++) t.insert(i)
        expect([...t.inOrder()]).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
    })
})

function blackHeight(root) {
    let bh = 0
    while(root) {
        bh += root.color
        root = root.parent
    }
    return bh
}