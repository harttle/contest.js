import { factorial, modularFactorial, factorialSequence, modularFactorialSequence } from '../factorial'

describe('factorial', () => {
  it('.factorial()', () => {
    expect(factorial(0)).toEqual(1)
    expect(factorial(1)).toEqual(1)
    expect(factorial(2)).toEqual(2)
    expect(factorial(3)).toEqual(6)
    expect(factorial(4)).toEqual(24)
  })
  it('.factorialSequence()', () => {
    expect(factorialSequence(4)).toEqual([1, 1, 2, 6, 24])
  })
  it('.modularFactorial()', () => {
    expect(modularFactorial(0, 5)).toEqual(1)
    expect(modularFactorial(1, 5)).toEqual(1)
    expect(modularFactorial(2, 5)).toEqual(2)
    expect(modularFactorial(3, 5)).toEqual(1)
    expect(modularFactorial(4, 5)).toEqual(4)
  })
  it('.modularFactorialSequence()', () => {
    expect(modularFactorialSequence(4, 5)).toEqual([1, 1, 2, 1, 4])
  })
})
