import { Heap } from './heap'

function nextPermutation <T=number> (arr: T[]): boolean {
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
function prevPermutation<T=number> (arr: T[]): boolean {
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
function reverse<T=number> (arr: T[], begin = 0, end = arr.length): void {
  while (begin < end - 1) {
    swap(arr, begin++, --end)
  }
}
function swap<T=number> (arr: T[], l: number, r: number): void {
  const tmp = arr[l]
  arr[l] = arr[r]
  arr[r] = tmp
}
// Fisher-Yates shuffle
function shuffle <T=number> (arr: T[]): T[] {
  const N = arr.length
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor((i + 1) * Math.random())
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}
function sort<T=number> (arr: T[], begin = 0, end = arr.length, cmp: ((a: T, b: T) => number) = (l, r) => Number(l) - Number(r)): T[] {
  const pivot = arr[(begin + end) >> 1]
  const mi = partition(arr, val => cmp(val, pivot), begin, end)
  if (begin < mi - 1) sort(arr, begin, mi, cmp)
  if (mi < end - 1) sort(arr, mi, end, cmp)
  return arr
}
// Hoare partition scheme
function partition <T=number> (arr: T[], pred: (val: T) => number, begin = 0, end = arr.length): number {
  let lo = begin - 1; let hi = end
  while (true) {
    do { lo++ } while (pred(arr[lo]) < 0)
    do { hi-- } while (pred(arr[hi]) > 0)
    if (lo >= hi) return lo
    swap(arr, lo, hi)
  }
}

function dijkstra<T> (source: T, G: Map<T, Map<T, number>>): Map<T, number> {
  const dist = new Map([[source, 0]])
  const pq = new Heap([[0, source]], (l: [number, T], r: [number, T]) => l[0] - r[0])
  const finalized = new Set()

  while (pq.size()) {
    const [d, u] = pq.pop()
    if (finalized.has(u)) continue
    else finalized.add(u)

    for (const [v, w] of G.get(u) ?? []) {
      if (d + w < (dist.get(v) ?? Infinity)) {
        pq.push([d + w, v])
        dist.set(v, d + w)
      }
    }
  }
  return dist
}

export { dijkstra, nextPermutation, prevPermutation, reverse, swap, shuffle, sort, partition }
