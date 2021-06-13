export function create2DArray<T> (N: number, M: number, n: T): T[][] {
  // https://stackoverflow.com/a/39879146/8242705
  // `empty` will be skipped in `map`, so we need destruct & create an `undefined` array
  return [...Array(N)].map(() => Array(M).fill(n))
}

export function create3DArray<T> (N: number, M: number, L: number, n: T): T[][][] {
  return [...Array(N)].map(() => create2DArray(M, L, n))
}

export function memorized (fn: Function, getKey = (...args: any[]) => args.join(',')): Function {
  const memo = new Map<string, any>()
  return function (...args: any[]) {
    const key = getKey(...args)
    if (!memo.has(key)) {
      memo.set(key, fn(...args))
    }
    return memo.get(key)
  }
}

export function * adjacent2D (arr: number[][], i: number, j: number): Generator<number[], void, void> {
  for (const [di, dj] of [[-1, 0], [1, 0], [0, 1], [0, -1]]) {
    const ni = i + di
    const nj = j + dj
    if (valid2D(arr, ni, nj)) yield [ni, nj]
  }
}
export function valid2D (arr: number[][], i: number, j: number): boolean {
  return i >= 0 && j >= 0 && i < arr.length && j < arr[i].length
}
