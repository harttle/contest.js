import { BIT } from '../bit'

describe('BIT', () => {
  it('getSum() should return 0 before any updates', () => {
    const bit = new BIT(3)
    expect(bit.sum(1)).toEqual(0)
    expect(bit.sum(2)).toEqual(0)
    expect(bit.sum(3)).toEqual(0)
  })
  it('getSum() should return corresponding sums', () => {
    const bit = new BIT(5)
    bit.update(1, 1)
    bit.update(2, 2)
    bit.update(3, 3)
    bit.update(4, 4)
    bit.update(5, 5)
    expect(bit.sum(1)).toEqual(1)
    expect(bit.sum(2)).toEqual(3)
    expect(bit.sum(3)).toEqual(6)
    expect(bit.sum(4)).toEqual(10)
    expect(bit.sum(5)).toEqual(15)
  })
})
