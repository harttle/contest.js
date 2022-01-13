import { adjacent2D } from '../src/functional'

describe('functional', () => {
  describe('adjacent2D', () => {
    it('should yield valid adjacent indices (1, 2)', () => {
      const arr = [
        [11, 12, 13],
        [21, 22, 23],
        [31, 32, 33]
      ]
      expect([...adjacent2D(arr, 1, 0)]).toEqual([[0, 0], [2, 0], [1, 1]])
    })
  })
})
