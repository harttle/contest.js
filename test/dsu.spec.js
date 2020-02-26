const { DSU } = require("../dsu")

describe('DSU', () => {
    it('should join a simple set', () => {
        let dsu = new DSU(3)
        dsu.union(1, 2)
        expect(dsu.find(0)).toEqual(0)
        expect(dsu.find(1)).toEqual(dsu.find(2))
    })
    it('should join increasing set elements', () => {
        let dsu = new DSU(1e3)
        for (let i = 0; i < 1e3 - 1; i++) {
            dsu.union(i, i + 1)
        }
        for (let i = 0; i < 1e3; i++) {
            expect(dsu.find(i)).toEqual(dsu.find(0))
        }
    })
})