const {RBTree} = require('./rbtree')

class TreeSet {
    constructor(collection = [], compare = (l, r) => l < r) {
        this._size = 0
        this.tree = new RBTree(compare)
        this.compare = compare
        for (const val of collection) this.add(val)
    }
    size() {
        return this._size
    }
    has(val) {
        return !!this.tree.find(val)
    }
    add(val) {
        const added = this.tree.insert(val)
        this._size += added
        return added
    }
    delete(val) {
        const deleted = this.tree.deleteByValue(val)
        this._size -= deleted
        return deleted
    }
    ceiling(val) {
        let p = this.tree.root
        let higher = null
        while (p) {
            if (!this.compare(p.data, val)) {
                higher = p
                p = p.left
            } else {
                p = p.right
            }
        }
        return higher && higher.data
    }
    floor(val) {
        let p = this.tree.root
        let lower = null
        while (p) {
            if (!this.compare(val, p.data)) {
                lower = p
                p = p.right
            } else {
                p = p.left
            }
        }
        return lower && lower.data
    }
    higher(val) {
        let p = this.tree.root
        let higher = null
        while (p) {
            if (this.compare(val, p.data)) {
                higher = p
                p = p.left
            } else {
                p = p.right
            }
        }
        return higher && higher.data
    }
    lower(val) {
        let p = this.tree.root
        let lower = null
        while (p) {
            if (this.compare(p.data, val)) {
                lower = p
                p = p.right
            } else {
                p = p.left
            }
        }
        return lower && lower.data
    }
    *[Symbol.iterator]() {
        for (const val of this.values()) yield val
    }
    *keys() {
        for (const val of this.values()) yield val
    }
    *values() {
        for (const val of this.tree.inOrder()) yield val
    }
}

class TreeMultiSet {
    constructor(collection = [], compare = (l, r) => l < r) {
        this._size = 0
        this.tree = new RBTree(compare)
        this.counts = new Map()
        this.compare = compare
        for (const val of collection) this.add(val)
    }
    size() {
        return this._size
    }
    has(val) {
        return !!this.tree.find(val)
    }
    add(val) {
        this.tree.insert(val)
        this.increase(val)
        this._size++
    }
    delete(val) {
        this.tree.deleteByValue(val)
        this.decrease(val)
        this._size--
    }
    count(val) {
        return this.counts.get(val) || 0
    }
    ceiling(val) {
        let p = this.tree.root
        let higher = null
        while (p) {
            if (!this.compare(p.data, val)) {
                higher = p
                p = p.left
            } else {
                p = p.right
            }
        }
        return higher && higher.data
    }
    floor(val) {
        let p = this.tree.root
        let lower = null
        while (p) {
            if (!this.compare(val, p.data)) {
                lower = p
                p = p.right
            } else {
                p = p.left
            }
        }
        return lower && lower.data
    }
    higher(val) {
        let p = this.tree.root
        let higher = null
        while (p) {
            if (this.compare(val, p.data)) {
                higher = p
                p = p.left
            } else {
                p = p.right
            }
        }
        return higher && higher.data
    }
    lower(val) {
        let p = this.tree.root
        let lower = null
        while (p) {
            if (this.compare(p.data, val)) {
                lower = p
                p = p.right
            } else {
                p = p.left
            }
        }
        return lower && lower.data
    }
    *keys() {
        for (const val of this.values()) yield val
    }
    *values() {
        for (const val of this.tree.inOrder()) {
            let count = this.count(val)
            while (count--) yield val
        }
    }
    decrease(val) {
        this.counts.set(val, this.count(val) - 1)
    }
    increase(val) {
        this.counts.set(val, this.count(val) + 1)
    }
}

module.exports = {TreeSet, TreeMultiSet}
