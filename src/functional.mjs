function create2DArray(N, M, n) {
  return [...Array(N)].map(() => Array(M).fill(n));
}
function create3DArray(N, M, L, n) {
  return [...Array(N)].map(() => create2DArray(M, L, n));
}
function memorized(fn, getKey = (...args) => args.join(",")) {
  const memo = new Map();
  return function(...args) {
    const key = getKey(...args);
    if (!memo.has(key)) {
      memo.set(key, fn(...args));
    }
    return memo.get(key);
  };
}
function* adjacent2D(arr, i, j) {
  for (const [di, dj] of [[-1, 0], [1, 0], [0, 1], [0, -1]]) {
    const ni = i + di;
    const nj = j + dj;
    if (valid2D(arr, ni, nj))
      yield [ni, nj];
  }
}
function valid2D(arr, i, j) {
  return i >= 0 && j >= 0 && i < arr.length && j < arr[i].length;
}
export {
  adjacent2D,
  create2DArray,
  create3DArray,
  memorized,
  valid2D
};
