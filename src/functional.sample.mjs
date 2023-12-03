import { adjacent2D } from './functional.mjs'

const grid = [
  [1, 2, 3, 4],
  ['a', 'b', 'c', 'd'],
  ['A', 'B', 'C', 'D']
]

console.log('adjacent indices for [1, 1]')
for (const [i, j] of adjacent2D(grid, 1, 1)) {
  console.log(i, j)
}

console.log('adjacent indices for [2, 3]')
for (const [i, j] of adjacent2D(grid, 2, 3)) {
  console.log(i, j)
}
