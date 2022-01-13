import { BitSet } from '../src/bitset'

describe('bitset', () => {
  describe(BitSet.name + '()', () => {
    it('should construct from string', () => {
      expect(new BitSet('01011').toString()).toEqual('1011')
    })
    it('should construct from number', () => {
      expect(new BitSet(6).toString()).toEqual('110')
    })
    it('should construct from 0', () => {
      expect(new BitSet(0).toString()).toEqual('0')
    })
    it('should construct from negative number', () => {
      expect(new BitSet(-6).toString())
        .toEqual('1010')
    })
    it('should construct from array', () => {
      expect(new BitSet([1, 1, 0]).toString()).toEqual('11')
    })
    it('should strip beyond capacity', () => {
      expect(new BitSet([1, 1, 0, 1], 2).toString()).toEqual('11')
      expect(new BitSet('1011', 2).toString()).toEqual('11')
      expect(new BitSet('11', 2).toString()).toEqual('11')
      expect(new BitSet('11', 0).toString()).toEqual('')
    })
  })
  describe('capacity()', () => {
    it('should return allowd size', () => {
      expect(new BitSet('01011').capacity()).toEqual(Infinity)
      expect(new BitSet('01011', 3).capacity()).toEqual(3)
    })
  })
  describe('set()', () => {
    it('should set bit to one', () => {
      const bs = new BitSet('1011')
      bs.set(2, 1)
      expect(bs.toString()).toEqual('1111')
    })
    it('should set bit to zero', () => {
      const bs = new BitSet('1011')
      bs.set(1, 0)
      expect(bs.toString()).toEqual('1001')
    })
  })
  describe('count()', () => {
    it('should count ones', () => {
      expect(new BitSet('01011').count()).toEqual(3)
    })
  })
  describe('and()', () => {
    it('should and another BitSet', () => {
      const lhs = new BitSet('01011', 5)
      const rhs = new BitSet('00111', 6)
      expect(lhs.and(rhs).capacity()).toEqual(6)
      expect(lhs.and(rhs).toString()).toEqual('000011')
    })
    it('should and string', () => {
      const lhs = new BitSet('01011')
      const rhs = '00111'
      expect(lhs.and(rhs).toString()).toEqual('11')
    })
    it('should and number', () => {
      const lhs = new BitSet('01011')
      const rhs = 7
      expect(lhs.and(rhs).toString()).toEqual('11')
    })
  })
  describe('negate()', () => {
    it('should negate', () => {
      const lhs = new BitSet('01011', 5)
      expect(lhs.negate().capacity()).toEqual(5)
      expect(lhs.negate().toString()).toEqual('10100')
    })
  })
  describe('or()', () => {
    it('should or another BitSet', () => {
      const lhs = new BitSet('01011', 5)
      const rhs = new BitSet('00111', 6)
      expect(lhs.or(rhs).capacity()).toEqual(6)
      expect(lhs.or(rhs).toString()).toEqual('001111')
    })
    it('should or string', () => {
      const lhs = new BitSet('01011')
      const rhs = '00111'
      expect(lhs.or(rhs).toString()).toEqual('1111')
    })
    it('should or number', () => {
      const lhs = new BitSet('01011')
      const rhs = 7
      expect(lhs.or(rhs).toString()).toEqual('1111')
    })
  })
  describe('xor()', () => {
    it('should xor another BitSet', () => {
      const lhs = new BitSet('01011', 5)
      const rhs = new BitSet('00111', 6)
      expect(lhs.xor(rhs).capacity()).toEqual(6)
      expect(lhs.xor(rhs).toString()).toEqual('001100')
    })
    it('should xor string', () => {
      const lhs = new BitSet('01011')
      const rhs = '00111'
      expect(lhs.xor(rhs).toString()).toEqual('1100')
    })
    it('should xor number', () => {
      const lhs = new BitSet('01011')
      const rhs = 7
      expect(lhs.xor(rhs).toString()).toEqual('1100')
    })
  })
  describe('shift()', () => {
    it('should return the same when shift zero', () => {
      const lhs = new BitSet('01011')
      expect(lhs.shift(0).toString()).toEqual('1011')
    })
    it('should shift 2', () => {
      const lhs = new BitSet('01011')
      expect(lhs.shift(2).toString()).toEqual('101100')
    })
    it('should chop beyond capacity', () => {
      const lhs = new BitSet('01011', 5)
      expect(lhs.shift(2).capacity()).toEqual(5)
      expect(lhs.shift(2).toString()).toEqual('01100')
    })
    it('should not change lhs when shifting', () => {
      const lhs = new BitSet('01011')
      lhs.shift(2)
      expect(lhs.toString()).toEqual('1011')
    })
    it('should unshift when len is negative', () => {
      const lhs = new BitSet('01011')
      expect(lhs.shift(-2).toString()).toEqual('10')
    })
  })
  describe('unshift()', () => {
    it('should return the same when unshift zero', () => {
      const lhs = new BitSet('01011')
      expect(lhs.unshift(0).toString()).toEqual('1011')
    })
    it('should unshift 2', () => {
      const lhs = new BitSet('01011')
      expect(lhs.unshift(2).toString()).toEqual('10')
    })
    it('should chop beyond capacity', () => {
      const lhs = new BitSet('01011', 5)
      expect(lhs.unshift(2).capacity()).toEqual(5)
      expect(lhs.unshift(2).toString()).toEqual('00010')
    })
    it('should not change lhs when shifting', () => {
      const lhs = new BitSet('1011')
      lhs.unshift(2)
      expect(lhs.toString()).toEqual('1011')
    })
    it('should shift when len is negative', () => {
      const lhs = new BitSet('01011')
      expect(lhs.unshift(-2).toString()).toEqual('101100')
    })
  })
})
