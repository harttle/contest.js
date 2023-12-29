// src/heap.ts
var Heap = class {
  constructor(data = [], compare = (lhs, rhs) => lhs < rhs ? -1 : lhs > rhs ? 1 : 0) {
    if (typeof data === "function") {
      compare = data;
      data = [];
    }
    this.data = [null, ...data];
    this.lt = (i, j) => compare(this.data[i], this.data[j]) < 0;
    for (let i = this.size(); i > 0; i--)
      this.heapify(i);
  }
  size() {
    return this.data.length - 1;
  }
  push(v) {
    this.data.push(v);
    let i = this.size();
    while (i >> 1 !== 0 && this.lt(i, i >> 1))
      this.swap(i, i >>= 1);
  }
  pop() {
    this.swap(1, this.size());
    const top = this.data.pop();
    this.heapify(1);
    return top;
  }
  top() {
    return this.data[1];
  }
  heapify(i) {
    while (true) {
      let min = i;
      const [l, r, n] = [i * 2, i * 2 + 1, this.data.length];
      if (l < n && this.lt(l, min))
        min = l;
      if (r < n && this.lt(r, min))
        min = r;
      if (min !== i) {
        this.swap(i, min);
        i = min;
      } else
        break;
    }
  }
  clear() {
    this.data = [null];
  }
  swap(i, j) {
    const d = this.data;
    [d[i], d[j]] = [d[j], d[i]];
  }
};

// src/algorithm.ts
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
function dijkstra(source, G) {
  var _a, _b;
  const dist = new Map([[source, 0]]);
  const pq = new Heap([[0, source]], (l, r) => l[0] - r[0]);
  const finalized = new Set();
  while (pq.size()) {
    const [d, u] = pq.pop();
    if (finalized.has(u))
      continue;
    else
      finalized.add(u);
    for (const [v, w] of (_a = G.get(u)) != null ? _a : []) {
      if (d + w < ((_b = dist.get(v)) != null ? _b : Infinity)) {
        pq.push([d + w, v]);
        dist.set(v, d + w);
      }
    }
  }
  return dist;
}
function createGraph(edges) {
  const G = new Map();
  for (const [u, v, w] of edges) {
    if (!G.has(u))
      G.set(u, new Map());
    const currW = G.get(u).has(v) ? G.get(u).get(v) : Infinity;
    G.get(u).set(v, Math.min(currW, w));
  }
  return G;
}
function createTree(N, edges) {
  const nodes = Array(N).fill(0).map((x, index) => ({ index, children: new Map(), depth: 0, parent: void 0 }));
  const G = Array(N).fill(0).map((x) => new Map());
  for (const [u, v, w = 1] of edges) {
    G[u].set(v, w);
    G[v].set(u, w);
  }
  const root = nodes[0];
  const added = new Set([root]);
  for (const node of added) {
    for (const [j, w] of G[node.index]) {
      if (!added.has(nodes[j])) {
        node.children.set(nodes[j], w);
        nodes[j].parent = node;
        nodes[j].depth = node.depth + 1;
        added.add(nodes[j]);
      }
    }
  }
  return nodes;
}
export {
  createGraph,
  createTree,
  dijkstra,
  nextPermutation,
  partition,
  prevPermutation,
  reverse,
  shuffle,
  sort,
  swap
};
