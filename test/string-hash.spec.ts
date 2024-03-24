import { BiStringHash, StringHash } from '../src/string-hash'

describe('string hash', () => {
  describe('StringHash', () => {
    it('should hash 0-9', () => {
      const hash = new StringHash(10)
      hash.digest(3)
      hash.digest(4)
      hash.digest(5)
      expect(hash.getKey()).toEqual(345)
      hash.digest(6)
      expect(hash.getKey()).toEqual(3456)
    })
  })
  describe('BiStringHash', () => {
    it('should hash 0-9', () => {
      const hash = new BiStringHash(10, 100)
      hash.digest(3)
      hash.digest(4)
      hash.digest(5)
      expect(hash.getKey()).toEqual(345 + 30405 * (1e8 + 7))
      hash.digest(6)
      expect(hash.getKey()).toEqual(3456 + 3040506 * (1e8 + 7))
    })
    it('can be used to find repeating string', () => {
      const hash = new BiStringHash(29, 31)
      const str = 'abcdabc'
      const results: number[] = []
      for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i) - 97
        hash.digest(code)
        results.push(hash.getKey())
      }
      const MOD = 1e8 + 7
      expect(results).toEqual([
        0, // a
        1 + MOD, // ab
        31 + 33 * MOD, // abc
        902 + 1026 * MOD, // abcd
        26158 + 31806 * MOD, // abcda
        758583 + 985987 * MOD, // abcdab
        21998909 + 565560 * MOD // abcdabc
      ])
    })
  })
})
