import {
  fact, factInvs,
  MOD,
  pascalsTriangle, combination, arrangement
} from '../src/binomial'

describe('binomial', () => {
  it('fact', () => {
    expect(fact[0]).toEqual(1)
    expect(fact[1]).toEqual(1)
    expect(fact[2]).toEqual(2)
    expect(fact[3]).toEqual(6)
    expect(fact[4]).toEqual(24)
  })
  it('factInvs', () => {
    expect(fact[0] * factInvs[0] % MOD).toEqual(1)
    expect(fact[1] * factInvs[1] % MOD).toEqual(1)
    expect(fact[2] * factInvs[2] % MOD).toEqual(1)
    expect(fact[3] * factInvs[3] % MOD).toEqual(1)
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
