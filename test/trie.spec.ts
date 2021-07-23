import { Trie } from '../trie'

describe('trie', () => {
  describe('Trie', () => {
    it('add successfully', () => {
      const trie = new Trie(2, 'a')
      const arr = ['aaa', 'aab', 'a', 'b']
      arr.forEach((s) => trie.insert(s), trie)
      expect(arr.map(trie.search, trie)).toEqual([1, 1, 1, 1])
    })
    it('remove successfully', () => {
      const trie = new Trie(2, 'a')
      const arr = ['aaa', 'aab', 'a', 'b', 'a', 'aab']
      arr.forEach((s) => trie.insert(s), trie)
      const removeArr = ['aaa', 'aab']
      removeArr.forEach((s) => trie.insert(s, -1), trie)
      expect(trie.search('aaa')).toEqual(0)
      expect(trie.search('aab')).toEqual(1)
      expect(trie.search('a')).toEqual(2)
      expect(trie.search('b')).toEqual(1)
    })
    it('searchPrefix successfully', () => {
      const trie = new Trie(3, 'a')
      const arr = ['aaa', 'aab', 'a', 'b', 'a', 'aab']
      arr.forEach((s) => trie.insert(s), trie)
      expect(trie.searchPrefix('aaa')).toEqual(9)
      expect(trie.searchPrefix('aab')).toEqual(10)
      expect(trie.searchPrefix('a')).toEqual(5)
      expect(trie.searchPrefix('b')).toEqual(1)
      expect(trie.searchPrefix('c')).toEqual(0)
    })
    it('searchMaxXor successfully', () => {
      // Test cases from: https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/
      test([3, 10, 5, 25, 2, 8], 28)
      test([0], 0)
      test([8, 10, 2], 10)
      test([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70], 127)
      function test (nums: number[], exp: number): void {
        const s = nums.map(num => num.toString(2).padStart(32, '0'))
        const trie = new Trie(2, '0')
        s.forEach(x => trie.insert(x))
        let ans = 0
        s.map(trie.searchMaxXor, trie).forEach((x, idx) => { ans = Math.max(ans, parseInt(x, 2) ^ nums[idx]) })
        expect(ans).toEqual(exp)
      }
    })
  })
})
