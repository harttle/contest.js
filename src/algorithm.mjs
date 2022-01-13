function nextPermutation(arr) {
  let i = arr.length - 1;
  while (i > 0 && arr[i - 1] >= arr[i])
    i--;
  if (i <= 0) {
    reverse(arr);
    return false;
  }
  let j = i;
  while (j + 1 < arr.length && arr[i - 1] < arr[j + 1])
    j++;
  swap(arr, i - 1, j);
  reverse(arr, i);
  return true;
}
function prevPermutation(arr) {
  let i = arr.length - 1;
  while (i > 0 && arr[i - 1] <= arr[i])
    i--;
  if (i <= 0) {
    reverse(arr);
    return false;
  }
  let j = i;
  while (j + 1 < arr.length && arr[i - 1] > arr[j + 1])
    j++;
  swap(arr, i - 1, j);
  reverse(arr, i);
  return true;
}
function reverse(arr, begin = 0, end = arr.length) {
  while (begin < end - 1) {
    swap(arr, begin++, --end);
  }
}
function swap(arr, l, r) {
  const tmp = arr[l];
  arr[l] = arr[r];
  arr[r] = tmp;
}
function shuffle(arr) {
  const N = arr.length;
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor((i + 1) * Math.random());
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}
function sort(arr, begin = 0, end = arr.length, cmp = (l, r) => Number(l) - Number(r)) {
  const pivot = arr[begin + end >> 1];
  const mi = partition(arr, (val) => cmp(val, pivot), begin, end);
  if (begin < mi - 1)
    sort(arr, begin, mi, cmp);
  if (mi < end - 1)
    sort(arr, mi, end, cmp);
  return arr;
}
function partition(arr, pred, begin = 0, end = arr.length) {
  let lo = begin - 1;
  let hi = end;
  while (true) {
    do {
      lo++;
    } while (pred(arr[lo]) < 0);
    do {
      hi--;
    } while (pred(arr[hi]) > 0);
    if (lo >= hi)
      return lo;
    swap(arr, lo, hi);
  }
}
export {
  nextPermutation,
  partition,
  prevPermutation,
  reverse,
  shuffle,
  sort,
  swap
};
