function nextPermutation(arr) {
    let i = arr.length - 1
    while (i > 0 && arr[i - 1] >= arr[i]) i--
    if (i <= 0) {
        reverse(arr)
        return false
    }
    let j = i
    while (j + 1 < arr.length && arr[i - 1] < arr[j + 1]) j++
    swap(arr, i - 1, j)
    reverse(arr, i)
    return true
}
function prevPermutation(arr) {
    let i = arr.length - 1
    while (i > 0 && arr[i - 1] <= arr[i]) i--
    if (i <= 0) {
        reverse(arr)
        return false
    }
    let j = i
    while (j + 1 < arr.length && arr[i - 1] > arr[j + 1]) j++
    swap(arr, i - 1, j)
    reverse(arr, i)
    return true
}
function reverse(arr, begin = 0, end = arr.length) {
    while (begin < end - 1) {
        swap(arr, begin++, --end)
    }
}
function swap(arr, l, r) {
    let tmp = arr[l]
    arr[l] = arr[r]
    arr[r] = tmp
}
// Fisher-Yates shuffle
function shuffle(arr) {
    const N = arr.length
    for(let i = N - 1; i > 0; i--) {
        let j = Math.floor((i + 1) * Math.random())
        let tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }
    return arr
}
function sort(arr, begin = 0, end = arr.length, cmp = (l, r) => l - r) {
    let pivot = arr[(begin + end) >> 1]
    let mi = partition(arr, val => cmp(val, pivot), begin, end)
    if (begin < mi - 1) sort(arr, begin, mi, cmp)
    if (mi < end - 1) sort(arr, mi, end, cmp)
    return arr
}
// Hoare partition scheme
function partition(arr, pred, begin = 0, end = arr.length) {
    let lo = begin - 1, hi = end
    while (true) {
        do { lo++ } while (pred(arr[lo]) < 0)
        do { hi-- } while (pred(arr[hi]) > 0)
        if (lo >= hi) return lo
        swap(arr, lo, hi)
    }
}
module.exports = {shuffle, sort, partition, nextPermutation, prevPermutation, reverse, swap}