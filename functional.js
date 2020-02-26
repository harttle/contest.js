function create2DArray(N, M, n) {
    return [...Array(N)].map(() => Array(M).fill(n))
}

function create3DArray(N, M, L, n) {
    return [...Array(N)].map(() => create2DArray(M, L, n))
}

function memorized(fn, getKey = (...args) => args.join(',')) {
    let memo = new Map()
    return function(...args) {
        let key = getKey(...args)
        if (!memo.has(key)) {
            memo.set(key, fn(...args))
        }
        return memo.get(key)
    }
}

function* adjacent2D(arr, i, j) {
    for (let [di, dj] of [[-1, 0], [1, 0], [0, 1], [0, -1]]) {
        let ni = i + di
        let nj = j + dj
        if (valid2D(arr, ni, nj)) yield [ni, nj]
    }
}
function valid2D(arr, i, j) {
    return i >= 0 && j >= 0 && i < arr.length && j < arr[i].length
}

module.exports = {memorized, create2DArray, create3DArray, adjacent2D, valid2D}
