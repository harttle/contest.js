import { gcd, gcdExtended } from '../euclidean'

describe('euclidean', () => {
  it('.gcd()', () => {
    expect(gcd(3, 5)).toEqual(1)
    expect(gcd(3, 6)).toEqual(3)
    expect(gcd(24, 36)).toEqual(12)
  })
  it('.gcdExtended()', () => {
    expect(gcdExtended(3, 5)).toEqual([1, 2, -1])
    expect(gcdExtended(3, 6)).toEqual([3, 1, 0])
    expect(gcdExtended(24, 36)).toEqual([12, -1, 1])
  })
})
