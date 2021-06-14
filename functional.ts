function create2DArray<T> (N: number, M: number, n: T): T[][] {
  // https://stackoverflow.com/a/39879146/8242705
  // `empty` will be skipped in `map`, so we need destruct & create an `undefined` array
  return [...Array(N)].map(() => Array(M).fill(n))
}

function create3DArray<T> (N: number, M: number, L: number, n: T): T[][][] {
  return [...Array(N)].map(() => create2DArray(M, L, n))
}

function memorized <Args extends any[], T> (fn: (...args: Args) => T, getKey = (...args: any[]) => args.join(',')): (...args: Parameters<typeof fn>) => T {
  const memo = new Map<string, any>()
  return function (...args: Parameters<typeof fn>): T {
    const key = getKey(...args)
    if (!memo.has(key)) {
      memo.set(key, fn(...args))
    }
    return memo.get(key)
  }
}

function * adjacent2D (arr: number[][], i: number, j: number): Generator<number[], void, void> {
  for (const [di, dj] of [[-1, 0], [1, 0], [0, 1], [0, -1]]) {
    const ni = i + di
    const nj = j + dj
    if (valid2D(arr, ni, nj)) yield [ni, nj]
  }
}
function valid2D (arr: number[][], i: number, j: number): boolean {
  return i >= 0 && j >= 0 && i < arr.length && j < arr[i].length
}

export { create2DArray, create3DArray, memorized, adjacent2D, valid2D }
