import { Trie } from '../trie'

describe('trie', () => {
  describe('Trie', () => {
    it('add successfully', () => {
      const trie = new Trie()
      const arr = ['aaa', 'aab', 'a', 'b']
      arr.forEach((s) => trie.insert(s), trie)
      expect(arr.map(trie.count, trie)).toEqual([1, 1, 1, 1])
    })
    it('remove successfully', () => {
      const trie = new Trie()
      const arr = ['aaa', 'aab', 'a', 'b', 'a', 'aab']
      arr.forEach((s) => trie.insert(s), trie)
      const removeArr = ['aaa', 'aab']
      removeArr.forEach((s) => trie.insert(s, -1), trie)
      expect(trie.count('aaa')).toEqual(0)
      expect(trie.count('aab')).toEqual(1)
      expect(trie.count('a')).toEqual(2)
      expect(trie.count('b')).toEqual(1)
    })
    it('searchPrefix successfully', () => {
      const trie = new Trie()
      const arr = ['aaa', 'aab', 'a', 'b', 'a', 'aab']
      arr.forEach((s) => trie.insert(s), trie)
      expect(trie.countPrefix('aaa')).toEqual(9)
      expect(trie.countPrefix('aab')).toEqual(10)
      expect(trie.countPrefix('a')).toEqual(5)
      expect(trie.countPrefix('b')).toEqual(1)
      expect(trie.countPrefix('c')).toEqual(0)
    })
    it('calculate max xor successfully', () => {
      // Test cases from: https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/
      test([3, 10, 5, 25, 2, 8], 28)
      test([0], 0)
      test([8, 10, 2], 10)
      test([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70], 127)
      function test (nums: number[], exp: number): void {
        const strs = nums.map(num => num.toString(2).padStart(32, '0'))
        const trie = new Trie()
        strs.forEach(x => trie.insert(x))
        const reverse = (ch: string): string => ch === '1' ? '0' : '1'
        let ans = 0
        strs.forEach((str, idx) => {
          let tmp = 0
          trie.traverse(str, (char, idx, node) => {
            tmp <<= 1
            if (node.children[reverse(char)]?.countPrefix) {
              tmp += 1
              return reverse(char)
            } else {
              return char
            }
          })
          ans = Math.max(ans, tmp)
        })
        expect(ans).toEqual(exp)
      }
    })
  })
})
