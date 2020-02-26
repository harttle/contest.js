const {pascalsTriangle, modularPascalsTriangle, binomialCoefficient, moduleBinomialCoefficient} = require('../binomial')

describe('binomial', () => {
    it('.pascalsTriangle()', () => {
        expect(pascalsTriangle(4)).toEqual([
            [1],
            [1, 1],
            [1, 2, 1],
            [1, 3, 3, 1],
            [1, 4, 6, 4, 1]
        ])
    })
    it('.modularPascalsTriangle()', () => {
        expect(modularPascalsTriangle(4, 3)).toEqual([
            [1],
            [1, 1],
            [1, 2, 1],
            [1, 0, 0, 1],
            [1, 1, 0, 1, 1]
        ])
    })
    it('.binomialCoefficient()', () => {
        expect(binomialCoefficient(5, 3)).toEqual(10)
        expect(binomialCoefficient(4, 2)).toEqual(6)
        expect(binomialCoefficient(4, 0)).toEqual(1)
        expect(binomialCoefficient(4, 4)).toEqual(1)
    })
    it('.moduleBinomialCoefficient()', () => {
        expect(moduleBinomialCoefficient(5, 3, 1e9 + 7)).toEqual(10)
        expect(moduleBinomialCoefficient(4, 2, 1e9 + 7)).toEqual(6)
        expect(moduleBinomialCoefficient(4, 0, 1e9 + 7)).toEqual(1)
        expect(moduleBinomialCoefficient(4, 4, 1e9 + 7)).toEqual(1)
    })
})