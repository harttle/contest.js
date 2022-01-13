import { BiRollingHash, RollingHash } from '../src/rolling-hash'

describe('rolling hash', () => {
  describe('RollingHash', () => {
    it('should hash 0-9', () => {
      const hash = new RollingHash(3, 10)
      hash.digest(3)
      hash.digest(4)
      hash.digest(5)
      expect(hash.getKey()).toEqual(345)
      hash.digest(6)
      hash.degest(3)
      expect(hash.getKey()).toEqual(456)
    })
    it('can be used to find repeating string', () => {
      const LEN = 3
      const hash = new RollingHash(LEN, 29)
      const str = 'abcdabc'
      const results = []
      for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i) - 97
        hash.digest(code)
        if (i >= LEN) hash.degest(str.charCodeAt(i - LEN) - 97)
        results.push(hash.getKey())
      }
      expect(results).toEqual([0, 1, 31, 902, 1769, 2524, 31])
    })
  })
  describe('BiRollingHash', () => {
    it('should hash 0-9', () => {
      const hash = new BiRollingHash(3, 10, 100)
      hash.digest(3)
      hash.digest(4)
      hash.digest(5)
      expect(hash.getKey()).toEqual('345,30405')
      hash.digest(6)
      hash.degest(3)
      expect(hash.getKey()).toEqual('456,40506')
    })
    it('can be used to find repeating string', () => {
      const LEN = 3
      const hash = new BiRollingHash(LEN, 29, 31)
      const str = 'abcdabc'
      const results = []
      for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i) - 97
        hash.digest(code)
        if (i >= LEN) hash.degest(str.charCodeAt(i - LEN) - 97)
        results.push(hash.getKey())
      }
      expect(results).toEqual(['0,0', '1,1', '31,33', '902,1026', '1769,2015', '2524,2884', '31,33'])
    })
  })
})
