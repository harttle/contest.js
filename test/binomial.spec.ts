import {
  factorial, factorialSeq,
  pascalsTriangle, combination, arrangement
} from '../src/binomial'

describe('binomial', () => {
  it('.factorial()', () => {
    expect(factorial(0)).toEqual(1)
    expect(factorial(1)).toEqual(1)
    expect(factorial(2)).toEqual(2)
    expect(factorial(3)).toEqual(6)
    expect(factorial(4)).toEqual(24)
  })
  it('.factorialSeq()', () => {
    expect(factorialSeq(4)).toEqual([1, 1, 2, 6, 24])
  })
  it('.pascalsTriangle()', () => {
    expect(pascalsTriangle(4)).toEqual([
      [1],
      [1, 1],
      [1, 2, 1],
      [1, 3, 3, 1],
      [1, 4, 6, 4, 1]
    ])
  })
  it('.combination()', () => {
    expect(combination(5, 3)).toEqual(10)
    expect(combination(4, 2)).toEqual(6)
    expect(combination(4, 0)).toEqual(1)
    expect(combination(4, 4)).toEqual(1)
  })
  it('.arrangement()', () => {
    expect(arrangement(3, 3)).toEqual(6)
    expect(arrangement(3, 0)).toEqual(1)
    expect(arrangement(3, 3)).toEqual(6)
    expect(arrangement(5, 3)).toEqual(60)
  })
})
