# contest.js

[English](./README.en.md)

纯 JavaScript 实现的数据结构和算法，主要是方便用于比赛、教学和白板，尽可能缓解 JavaScript 在竞赛上的劣势，特点：

- **拷来即用**。支持所有 LTS/\* Node.js 且零依赖。
- **容易更改**。采用简化的实现，尽量少的抽象层级。
- **支持 npm**。加一句 require，即可写出可以工作的代码。

有用链接：

- 在线预览： https://harttle.land/contest.js
- 在 LeetCode 页面执行/判定用例： https://greasyfork.org/zh-CN/scripts/402276-leetcode-helper-for-javascript

**索引**

模块 | 内容 | 链接
---  | ---  | ---
[算法](#算法) | swap, shuffle, reverse, sort, dijkstra | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/algorithm.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/algorithm.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/algorithm.spec.ts)
[字符串](#字符串) | kmp, rabinkarp | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/string.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/string.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/string.spec.ts)
[队列](#队列) | Queue | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/queue.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/queue.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/queue.spec.ts)
[双向队列](#双向队列) | Deque | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/deque.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/deque.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/deque.spec.ts)
[堆](#堆) | Heap, PriorityQueue, RemovableHeap, RemovableDoubleHeap | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/heap.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/heap.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/heap.spec.ts)
[TreeSet](#TreeSet) | TreeSet, TreeMultiSet | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/treeset.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/treeset.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/treeset.spec.ts)
[TreeMap](#TreeMap) | TreeMap | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/treemap.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/treemap.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/treemap.spec.ts)
[BitSet](#BitSet) | BitSet | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/bitset.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/bitset.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/bitset.spec.ts)
[树状数组](#树状数组) | BIT | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/bit.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/bit.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/bit.spec.ts)
[线段树](#线段树) | SegmentTree | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/segment-tree.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/segment-tree.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/segment-tree.spec.ts)
[图](#图) | Graph | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/graph.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/graph.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/graph.spec.ts)
[并查集](#并查集) | 路径压缩、按秩合并 | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/dsu.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/dsu.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/dsu.spec.ts)
[质数算法](#质数算法) | 质数测试、筛选等 | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/prime.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/prime.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/prime.spec.ts)
[排列组合](#排列组合) | 阶乘、模阶乘、二项式系数、帕斯卡三角 | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/binomial.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/binomial.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/binomial.spec.ts)
[欧几里得算法](#欧几里得算法) | 欧几里得公约数，扩展欧几里得，模逆元 | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/euclidean.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/euclidean.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/euclidean.spec.ts)
[滚动哈希](#滚动哈希) | 滚动哈希，双哈希 | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/rolling-hash.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/rolling-hash.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/rolling-hash.spec.ts)
[工具](#工具) | create2DArray, create3DArray, greater, valid2D, adjacent2D | [TypeScript](https://github.com/harttle/contest.js/blob/master/src/funcitonal.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/functional.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/funcitonal.spec.ts)

## 算法

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/algorithm.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/algorithm.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/algorithm.spec.ts)

### 数组操作

补充 JavaScript 中一些针对数组的操作。比如 JavaScript 缺少 `swap`，不能对区间进行 `reverse`。

**swap(arr: any[], lhs: number, rhs: number)**：在数组 `arr` 里替换 `lhs` 和 `rhs` 的值。

**shuffle(arr: any[])**：用 Fisher-Yates 方法随机打乱数组。

```javascript
let arr = [1, 2, 3]
shuffle(arr)
console.log(arr) // [1, 3, 2]
```

**reverse(arr: any[], begin = 0, end = arr.length)**：反转数组 `arr` 里的 [begin, end) 之间的元素。

```javascript
let arr = [1, 2, 3, 4, 5]
reverse(arr, 1)
console.log(arr) // [1, 5, 4, 3, 2]
```

### 排序操作

**sort(arr: any[], begin = 0, end = arr.length, compare = (l, r) => l - r)**：使用快排堆数组进行原址排序（不稳定），支持对一个区间进行排序，以及自定义 `compare` 方法。

```javascript
let arr = [1, 3, 2]
sort(arr) // [1, 2, 3]
sort(arr, (l, r) => r - l) // [3, 2, 1]
```

### 图算法

**createGraph(edges)**：从边 `[T, T, number]` 的数组创建有表示向图的二维映射。可用于 `dijkstra` 算法。

```javascript
const G = createGraph([
    [0, 1, 10],
    [1, 0, 30],
    [1, 2, 50]
])
G.get(0) // Map(1) { 1 => 10 }
G.get(1) // Map(2) { 0 => 30, 2 => 50 }
```

**dijkstra(source, G)**: 单源最短路径算法。`G` 为二维映射，`G.get(u).get(v)` 表示有向图中边 `u` 到 `v` 的权。`source` 和 `G` 的键可以是任意基本类型比如数字、字符串等。返回一个 `dist: Map<T, number>`，`dist[u]` 表示 `source` 到 `u` 的最短路径长度。

```javascript
const G = new Map()
G.set(0, new Map([[1, 10]]))
G.set(1, new Map([[0, 30], [2, 50]]))

dijkstra(0, G) // Map(3) { 0 => 0, 1 => 10, 2 => 60 }
```

<!-- 可以借助于 `createGraph()`，上述代码等价于： -->

```javascript
const G = new createGraph([
    [0, 1, 10],
    [1, 0, 30],
    [1, 2, 50],
])

dijkstra(0, G) // Map(3) { 0 => 0, 1 => 10, 2 => 60 }
```

### createTree

**createTree(N: number, edges: [number, number][] | [number, number, number][]): TreeNode[]**: 从边的数组 `[number, number, number]` 生成一棵树，返回节点列表，其中第一个节点为树的根节点。

```javascript
const nodes = createTree(3, [[0, 1], [0, 2]])
console.log(nodes[0]) // { index: 0, children: Map{[{index: 1, ...}, 1], [{index: 2, ...}, 1]}, depth: 0 }
console.log(nodes[1]) // { index: 1, children: Map{}, parent: {index: 0, ...}, depth: 1 }
console.log(nodes[2]) // { index: 2, children: Map{}, parent: {index: 0, ...}, depth: 1 }
```

对于有权边的树，每条边增加一个表示权重的数字即可：

```javascript
const nodes = createTree(3, [[0, 1, 10], [0, 2, 20]])
console.log(nodes[0]) // { index: 0, children: Map{[{index: 1, ...}, 10], [{index: 2, ...}, 20]}, depth: 0 }
console.log(nodes[1]) // { index: 1, children: Map{}, parent: {index: 0, ...}, depth: 1 }
console.log(nodes[2]) // { index: 2, children: Map{}, parent: {index: 0, ...}, depth: 1 }
```

### 其他算法

**nextPermutation(arr)**：重组为下一个字典序排列。如果可以得到更大的排列，就完成排列并返回 `true`。如果无法得到更大的排列，就重排为第一个排列（所有元素都是升序）并返回 `false`。

**prevPermutation(arr)**：重组为上一个字典序排列。如果可以得到更小的排列，就完成排列并返回 `true`。如果无法得到更小的排列，就重排为最后一个排列（所有元素都是降序）并返回 `false`。

## 字符串

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/string.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/string.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/string.spec.ts)

**kmp(str: string, pattern: string)**：使用 KMP 方法在 `str` 中找到 `pattern` 的下标，如果不存在则返回 `-1`。

```javascript
kmp('what a wonderful world', 'a wonderful') // returns 5
```

**rabinkarp(str: string, pattern: string)**：使用 Rabin-Karp 方法在 `str` 中找到 `pattern` 的下标，如果不存在则返回 `-1`。

```javascript
rabinkarp('what a wonderful world', 'a wonderful') // returns 5
```

## 队列

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/queue.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/queue.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/queue.spec.ts)

**new Queue(collection?: Iterable)**：创建一个队列。

**.size(): number**：返回队列的大小。

**.front()**：返回第一个元素，为空时返回 `undefined`。

**.back()**：返回最后一个元素，为空时返回 `undefined`。

**.shift()**：移除并返回第一个元素，为空时返回 `undefined`。

**.push(element: any)**：在尾部添加一个元素。

**.values()**：返回从第一个元素到最后一个元素的 ES6 迭代器。

## 双向队列

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/deque.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/deque.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/deque.spec.ts)

**new Deque(collection?: Iterable)**：创建一个双向队列。

**.size(): number**：返回双向队列的大小。

**.unshift(element: any)**：在头部添加一个元素。

**.front()**：返回第一个元素，为空时返回 `undefined`。

**.back()**：返回最后一个元素，为空时返回 `undefined`。

**.shift()**：移除并返回第一个元素，为空时返回 `undefined`。

**.push(element: any)**：在尾部添加一个元素。

**.pop()**：移除并返回最后一个元素，为空时返回 `undefined`。

**.values()**：返回从第一个元素到最后一个元素的 ES6 迭代器。

```javascript
let deque = new Deque([1, 2, 3])
deque.push(4)
deque.unshift(0)
deque.pop() // returns 4
deque.pop() // returns 3
deque.shift() // returns 0
for (let val of deque) {
  console.log(val) // outputs 1 and 2
}
```

## 堆

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/heap.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/heap.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/heap.spec.ts)

### Heap

**new Heap(collection?: Iterable, compare?: ((l, r) => number) = (l, r) => l - r)**：从可迭代集合 `collection` 创建一个最小堆（较小的先 pop 出来），使用 `compare` 比较大小（接受两个参数，首个参数较小则返回 `true`，否则返回 `false`，详见示例）。

**.push(element: any)**：把 `element` 加入堆中。

**.pop()**：从堆中弹出最小元素并返回，如果堆是空的则返回 `undefined`。

**.top()**：返回堆顶的元素（最小的元素），如果堆是空的则返回 `undefined`。

**.size()**：返回堆里的元素个数。

```javascript
let heap = new Heap()
heap.push(2)
heap.push(3)
heap.push(1)
while (heap.size()) console.log(heap.pop()) // 输出 1, 2, 3

let maxHeap = new Heap((lhs, rhs) => rhs - lhs)
maxHeap.push(2)
maxHeap.push(3)
maxHeap.push(1)
// 等价于 maxHeap = new Heap([2, 3, 1], (lhs, rhs) => rhs - lhs)
while (maxHeap.size()) console.log(maxHeap.pop()) // 输出 3, 2, 1
```

### PriorityQueue

**new PriorityQueue(collection?: Iterable, compare?: ((l, r) => number) = (l, r) => l - r)**：从可迭代集合 `collection` 创建一个最小堆（较小的先 pop 出来），使用 `compare` 比较大小（接受两个参数，首个参数较小则返回 `true`，否则返回 `false`，详见示例）。

**.offer(element: any)**：把 `element` 加入堆中。

**.push(element: any)**：同上。

**.poll()**：从队列中弹出最小元素并返回，如果堆是空的则返回 `undefined`。

**.pop()**：同上。

**.peek()**：返回队列顶的元素（最小的元素），如果堆是空的则返回 `undefined`。

**.top()**：同上。

**.has(element: any)**：返回布尔值，表示是否包含 `element`。

**.size()**：返回队列里的元素个数。

**.remove(element: any)**：从队列里删除 `element`。

```javascript
let queue = new PriorityQueue()
queue.offer(3)
queue.offer(2)
queue.offer(1)
while (heap.size()) console.log(heap.poll()) // 输出 1, 2, 3

queue = new PriorityQueue((lhs, rhs) => rhs - lhs)
queue.offer(3)
queue.offer(2)
queue.offer(1)
// 等价于 queue = new PriorityQueue([3, 2, 1], (lhs, rhs) => rhs - lhs)
while (queue.size()) console.log(queue.poll()) // 输出 3, 2, 1
```

### RemovableHeap

**new RemovableHeap(collection?: Iterable, compare?: ((l, r) => number) = (l, r) => l - r)**：从可迭代集合 `collection` 创建一个最小堆（较小的先 pop 出来），使用 `compare` 比较大小（接受两个参数，首个参数较小则返回 `true`，否则返回 `false`，详见示例）。

**.push(element: any)**：把 `element` 加入堆中。

**.pop()**：从堆中弹出最小元素并返回，如果堆是空的则返回 `undefined`。

**.top()**：返回堆顶的元素（最小的元素），如果堆是空的则返回 `undefined`。

**.has(element: any)**：返回布尔值，表示是否包含 `element`。

**.size()**：返回堆里的元素个数。

**.remove(element: any)**：从堆里删除 `element`。

```javascript
let heap = new RemovableHeap()
heap.push(2)
heap.push(3)
heap.push(1)
heap.remove(2)
while (heap.size()) console.log(heap.pop()) // 输出 1, 3
```

### RemovableDoubleHeap

**new RemovableHeap(collection?: Iterable, compare?: ((l, r) => number) = (l, r) => l - r)**：从可迭代集合 `collection` 创建一个最小堆（较小的先 pop 出来），使用 `compare` 比较大小（接受两个参数，首个参数较小则返回 `true`，否则返回 `false`，详见示例）。

**.push(element: any)**：把 `element` 加入堆中。

**.popMin()**：从堆中弹出最小元素并返回，如果堆是空的则返回 `undefined`。

**.popMin()**：从堆中弹出最大元素并返回，如果堆是空的则返回 `undefined`。

**.top()**：返回堆顶的元素（最小的元素），如果堆是空的则返回 `undefined`。

**.has(element: any)**：返回布尔值，表示是否包含 `element`。

**.size()**：返回堆里的元素个数。

**.remove(element: any)**：从堆里删除 `element`。

```javascript
let heap = new RemovableDoubleHeap()
heap.push(2)
heap.push(3)
heap.push(1)
heap.popMin() // 1
heap.popMax() // 3
```

## TreeSet

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/treeset.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/treeset.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/treeset.spec.ts)

**TreeSet**

读写元素最坏情况时间复杂度为 log(n) 的有序集合，由红黑树实现。

**new TreeSet(collection?: any[], compare?: ((l: any, r: any) => boolean) = ((l, r) => l - r))**：创建一个集合，添加所有 `collection` 里的元素，并按照 `compare` 来比较元素大小（默认为升序）。

**.add(val: any)**：把元素 `val` 插入集合，如果 `val` 已存在则移除它。

**.has(val: any)**：如果 `val` 存在则返回 `true`，否则返回 `false`。

**.delete(val: any)**：从集合删除元素 `val`。

**.floor(val: any)**：找到并返回小于等于 `val` 的最大元素，如果不存在这样的元素则返回 `undefined`。

**.ceil(val: any)**：找到并返回大于等于 `val` 的最小元素，如果不存在这样的元素则返回 `undefined`。

**.lower(val: any)**：找到并返回小于 `val` 的最大元素，如果不存在这样的元素则返回 `undefined`。

**.higher(val: any)**：找到并返回大于 `val` 的最小元素，如果不存在这样的元素则返回 `undefined`。

**.first()**：返回集合中第一个元素，如果不存在这样的元素则返回 `undefined`。

**.last()**：返回集合中最后一个元素，如果不存在这样的元素则返回 `undefined`。

**.shift()**：删除集合中第一个元素并返回被删除元素的值，如果不存在这样的元素则返回 `undefined`。

**.pop()**：删除集合中最后一个元素并返回被删除元素的值，如果不存在这样的元素则返回 `undefined`。

**.size(): number**：返回集合的大小。

**.values()**：返回从第一个元素到最后一个元素的 ES6 迭代器。

**.rvalues()**：返回从最后一个元素到第一个元素的 ES6 迭代器。

```javascript
const set = new TreeSet()
set.add(3)
set.add(5)
set.add(7)
// 等价于
// const set = new TreeSet([3, 5, 7], (l, r) => l - r);

set.ceil(4) // 5 is the smallest element >= 4
set.ceil(5) // 5 is the smallest element >= 5
```

**TreeMultiSet**

读写元素最坏情况时间复杂度为 log(n) 的有序集合，和 `TreeSet` 不同的是它允许多个等价的键存在，由红黑树实现。

**new TreeSet(collection?: any[], compare?: ((l: any, r: any) => boolean) = ((l, r) => l - r))**：创建一个集合，添加所有 `collection` 里的元素，并按照 `compare` 来比较元素大小（默认为升序）。

**.add(val: any)**：把元素 `val` 插入集合。

**.has(val: any)**：如果 `val` 存在则返回 `true`，否则返回 `false`。

**.delete(val: any)**：从集合删除元素 `val`。

**.floor(val: any)**：找到并返回小于等于 `val` 的最大元素，如果不存在这样的元素则返回 `undefined`。

**.ceil(val: any)**：找到并返回大于等于 `val` 的最小元素，如果不存在这样的元素则返回 `undefined`。

**.lower(val: any)**：找到并返回小于 `val` 的最大元素，如果不存在这样的元素则返回 `undefined`。

**.higher(val: any)**：找到并返回大于 `val` 的最小元素，如果不存在这样的元素则返回 `undefined`。

**.fisrt()**：返回集合中`第一个`元素，如果不存在这样的元素则返回 `undefined`。

**.last()**：返回集合中`最后一个`元素，如果不存在这样的元素则返回 `undefined`。

**.shift()**：删除集合中`第一个`元素并返回被删除元素的值，如果不存在这样的元素则返回 `undefined`。

**.pop()**：删除集合中`最后一个`元素并返回被删除元素的值，如果不存在这样的元素则返回 `undefined`。

**.size(): number**：返回集合的大小。

**.values()**：返回从第一个元素到最后一个元素的 ES6 迭代器。

**.rvalues()**：返回从最后一个元素到第一个元素的 ES6 迭代器。

## TreeMap

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/treemap.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/treemap.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/treemap.spec.ts)

读写元素最坏情况时间复杂度为 log(n) 的有序映射，由红黑树实现。

**new TreeMap<K, V>(collection?: [K, V][], compare?: ((lhs: K, rhs: K) => boolean) = ((l, r) => l - r))**：创建一个映射，添加所有 `collection` 里的元素，并按照 `compare` 来比较元素大小（默认为升序）。

**.set(key: K, value: V)**：把键值对 `key`, `value` 插入映射，如果 `key` 已存在则移除它。

**.has(key: K): boolean**：如果 `key` 存在则返回 `true`，否则返回 `false`。

**.delete(key: K)**：从映射删除元素 `key`。

**.floor(key: K): [K, V]**：找到并返回小于等于 `key` 的最大键值对，如果不存在这样的元素则返回 `undefined`。

**.ceil(key: K): [K, V]**：找到并返回大于等于 `key` 的最小键值对，如果不存在这样的元素则返回 `undefined`。

**.lower(key: K): [K, V]**：找到并返回小于 `key` 的最大键值对，如果不存在这样的元素则返回 `undefined`。

**.higher(key: K): [K, V]**：找到并返回大于 `key` 的最小键值对，如果不存在这样的元素则返回 `undefined`。

**.first(): [K, V]**：返回映射中`第一个`键值对，如果不存在这样的元素则返回 `undefined`。

**.last(): [K, V]**：返回映射中`最后一个`键值对，如果不存在这样的元素则返回 `undefined`。

**.shift(): [K, V]**：删除映射中`第一个`键值对并返回被删除元素的值，如果不存在这样的元素则返回 `undefined`。

**.pop(): [K, V]**：删除映射中`最后一个`键值对并返回被删除元素的值，如果不存在这样的元素则返回 `undefined`。

**.size(): number**：返回映射的大小。

**.keys()**：返回从第一个键到最后一个键的 ES6 迭代器。

**.rkeys()**：返回从最后一个键到第一个键的 ES6 迭代器。

**.values()**：返回从第一个值到最后一个值的 ES6 迭代器。

**.rvalues()**：返回从最后一个值到第一个值的 ES6 迭代器。

```javascript
const map = new TreeMap()
map.set(3, 'c')
map.set(5, 'e')
map.set(7, 'g')
// 等价于
// const map = new TreeMap([[3, 'c'], [5, 'e'], [7, 'g']], (l, r) => l - r);

map.ceil(4) // [5, 'e] is the smallest element >= 4
map.ceil(5) // [5, 'e'] is the smallest element >= 5
```

## BitSet

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/bitset.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/bitset.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/bitset.spec.ts)

一个动态大小的位集合。由 BigInt 实现，占用空间很小，但独写性能不如数组。

**new BitSet(val:(string|number|bigint) = 0, N = Infinity)**：创建一个 `BitSet` 对象，输入可以是数字，BigInt，也可以是由 `"0"` 和 `"1"` 构成的字符串，位长度为 `N`，默认容量为 Infinity。

**.capacity()**：返回集合的容量。

**.count()**：返回集合中 1 的位数。

**.set(i: number, val: boolean | 1 | 0)**：把下标为 `i` 的位设置位 `val`。

**.get(i: number): 1 | 0**：返回下表为 `i` 的位的值。

**.toString()**：返回一个由 `"1"` 和 `"0"` 构成的字符串，表示这个集合。

**.shift(len: number)**：返回一个新的 `BitSet`，它的值是 `this` 左移 `len` 位。

**.unshift(len: number)**：返回一个新的 `BitSet`，它的值是 `this` 右移 `len` 位。

**.and(rhs: BitSet)**：返回一个新的 `BigSet`，它的值是 `this & rhs`.

**.or(rhs: BitSet)**：返回一个新的 `BigSet`，它的值是 `this | rhs`.

**.xor(rhs: BitSet)**：返回一个新的 `BigSet`，它的值是 `this ^ rhs`.

**.negate(rhs: BitSet)**：返回一个新的 `BigSet`，它的值是 `!this`.

## 树状数组

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/bit.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/bit.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/bit.spec.ts)

一个树状数组的实现，也叫 [Fenwick Tree](https://zh.wikipedia.org/zh-hans/%E6%A0%91%E7%8A%B6%E6%95%B0%E7%BB%84), Binary Indexed Tree，BIT。

**new BIT(size: number)**：创建一个大小为 `size` 的 BIT。

**.update(index: number, value: number)**：更新下标（从 1 开始）`index` 处的值为 `value`。

**.increment(index: number, diff: number)**：把下标（从 1 开始）`index` 处的值增加 `diff`。

```javascript
let bit = new BIT(10)
bit.update(1, 10)
bit.update(2, 20)
bit.update(10, 100)
bit.sum(5) // elements in [1, 5] sums to 10 + 20 = 30
bit.sum(10) // elements in [1, 10] sums to 10 + 20 + 100 = 130
```

## 线段树

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/segment-tree.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/segment-tree.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/segment-tree.spec.ts)

一个数组二叉树实现的线段树，聚合方式默认为前缀和。

**new SegmentTree<T>(N: number, aggregate = (a, b) => a + b, initial = 0)**：创建一个大小为 `N` 的线段树，采用 `aggregate` 进行聚合，初始值为 `initial`。

**.update(index: number, value: T)**：更新下标（从 0 开始）`index` 处的值为 `value`。

**.query(l: number, r: number)**: 求 `[l, r]` 范围的聚合，注意包含 `l` 和 `r` 处的元素。

**.prefix(index: number)**: 相当于 `.query(0, index)`，求 `[0, index]` 范围内的前缀和，注意包含 `index` 元素。

**.valueAt(index: number)**：返回下标 `index` 处的元素。

**.floor(val: any)**：找到并返回聚合值小于等于 `val` 的最大元素下标，如果不存在这样的元素则返回 `-1`。

**.ceil(val: any)**：找到并返回聚合值大于等于 `val` 的最小元素下标，如果不存在这样的元素则返回 Infinity。

**.lower(val: any)**：找到并返回聚合值小于 `val` 的最大元素下标，如果不存在这样的元素则返回 `-1`。

**.higher(val: any)**：找到并返回聚合值大于 `val` 的最小元素下标，如果不存在这样的元素则返回 `Infinity`。

```javascript
const sumTree = new SegmentTree(5)
sumTree.update(0, 1)
sumTree.update(1, 2)
sumTree.update(2, 3)
sumTree.update(3, 4)

sumTree.query(0, 2) // 6
sumTree.prefix(0) // 1
sumTree.prefix(1) // 3
sumTree.prefix(2) // 6
sumTree.prefix(3) // 10

sumTree.ceil(7) // 3
sumTree.ceil(6) // 2
sumTree.ceil(5) // 2
sumTree.ceil(11) // Infinity

const maxTree = new SegmentTree(5, Math.max)
maxTree.update(0, 1)
maxTree.prefix(0) // 1

maxTree.update(1, 3)
maxTree.prefix(1) // 3
maxTree.prefix(2) // 3

maxTree.update(2, 2)
maxTree.prefix(2) // 3
```

## 图

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/graph.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/graph.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/graph.spec.ts)

提供 `DirectedGraph` 和 `UndirectedGraph`，用 `Map` 实现，支持稀疏图。

### DirectedGraph

**new DirectedGraph(N: number)**：创建一个有 `N` 个节点的有向图。

**.addEdge(u, v, dist?)**：添加一条从 `u` 到 `v` 的边，距离为 `dist`。

**.removeEdge(u, v)**：移除一条边。

**.removeNode(u)**：移除一个节点，会同时移除它的所有边。

**.size(): number**：返回图的节点数目。

**.getLeaves(): IterableIterator<TNode>**：返回叶节点的数目（入度小于等于1），迭代期间移除边导致的新叶节点会加入迭代。

**.getDistance(u, v): number**：返回 `u` 和 `v` 节点的距离，如果没有直接连接起来则返回 `Infinity`。

**.getChildren(u): IterableIterator<TNode>**：返回迭代器，包括 `u` 的所有子节点。

**.getParents(u): IterableIterator<TNode>**：返回迭代器，包括 `u` 的所有父节点。

**.getAllEdges(): IterableIterator<[TNode, TNode, number]>**: 返回迭代器，包括图中的所有边。

### UndirectedGraph

**new UndirectedGraph(N: number)**：创建一个有 `N` 个节点的无向图。

**.addEdge(u, v, dist?)**：同 `DirectedGraph`。

**.removeEdge(u, v)**：同 `DirectedGraph`。

**.removeNode(u)**：同 `DirectedGraph`。

**.size(): number**：同 `DirectedGraph`。

**.getLeaves(): IterableIterator<TNode>**：同 `DirectedGraph`。

**.getDistance(u, v): number**：同 `DirectedGraph`。

**.getAdjacent(u): IterableIterator<TNode>**：同 `DirectedGraph#getChildren()`。

**.getAllEdges(): IterableIterator<[TNode, TNode, number]>**: 同 `DirectedGraph`。

## 并查集

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/dsu.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/dsu.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/dsu.spec.ts)

支持路径压缩和按秩合并的并查集实现，提供接近常数时间复杂度（Inverse Ackermann Function）的 `find/union` 操作。

**new DSU(N: number)**：创建一个大小为 `N` 的并查集。

**.find(x: number)**：找到值 `x` 对应的组，返回表示这个组的数字。

**.union(x: number, y: number)**：合并 `x` 和 `y` 所属的组并返回 `true`，如果 `x` 和 `y` 已经在同一组则返回 `false`。

## 质数算法

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/prime.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/prime.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/prime.spec.ts)

**prime(n: number)**：返回第 n（从 1 开始）个质数，例如 `prime(1)` 返回 `2`。

**primesLeq(n: number)**: 得到小于等于 `n` 的所有质数，返回一个数组。

**isPrime(n)**：如果 `n` 是质数则返回 `true`，否则返回 `false`。

**primeFactors(n)**：返回 `n` 的所有质数因子，键为质数，值为因子的指数。

```javascript
let factors = primeFactors(24) // 24 = 2*2*2*3 = 2**3 + 3**1
for (let [prime, count] of factors) {
  console.log(prime, count)
}
// 输出
// 2 3
// 3 1
```

## 排列组合

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/binomial.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/binomial.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/binomial.spec.ts)

**factorial(n: number)**：返回 `n` 的阶乘，例如 `factorial(3)` 返回 `6`。

**factorialSeq(n: number)**：得到阶乘序列，下标 `i` 的值表示 `i` 的阶乘。例如 `factorialSeq(3)` 返回 `[1, 1, 2, 6]`。

**pascalsTriangle(n: number)**：返回第 `n` 个帕斯卡三角，例如 `pascalsTriangle(3)` 返回 `[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]`。其中 `P[n][k]` 表示 C(n, k) 的值。

**combination(n: number, k: number)**：返回二项式系数 C(n, k)，即从 n 个互不相同的元素中取 k 个元素的组合数。

**arrangement(n: number, k: number)**：返回 A(n, k)，即从 n 个互不相同的元素中取 k 个元素的排列数。

## 欧几里得算法

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/euclidean.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/euclidean.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/euclidean.spec.ts)

**gcd(a: number, b: number)**：运行欧几里得算法，得到最大公约数。

**gcdExtended(a: number, b: number)**：运行扩展欧几里得算法，得到 `[gcd, x, y]` 数组，其中第一个元素 `gcd` 为最大公约数，且 `gcd === x * a + y * b`。

**modInverse(a: number, n: number)**：返回 `a` 的模逆元，即 `a^-1 mod n`。如果 `a` 和 `n` 不互质则抛出异常。

## 滚动哈希
[TypeScript](https://github.com/harttle/contest.js/blob/master/src/rolling-hash.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/rolling-hash.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/rolling-hash.spec.ts)

**new RollingHash(L: number, M: number)**：创建一个滚动哈希对象。L 是滚动窗口的长度；M 是倍增的进制，通常取大于被哈希数的最大值的一个质数。例如被哈希的是 0-26，该质数可以取 29 或 31。

**.getValue()**：得到当前的哈希值。

**.digest(value: number)**：加一个数到滚动哈希里。

**.degest(value: number)**：退出一个数到滚动哈希里。注意要在刚超过窗口长度时（长度为 L + 1）的时候退出。一般需要调用 `.digest()` 之后调用 `.degest()`。例如：

```javascript
const LEN = 3,
  hash = new RollingHash(LEN, 29)
const str = 'abcdabc'
const arr = [...str].map((c) => c.charCodeAt() - 97)
for (let i = 0; i < arr.length; i++) {
  hash.digest(arr[i])
  if (i >= LEN) hash.degest(arr[i - LEN])
  console.log(hash.getKey())
}
// 输出，注意两次到 c 时哈希值相等
0, 1, 31, 902, 1769, 2524, 31
```

**new BiRollingHash(L: number, M1: number, M2: number)**：创建一个滚动哈希对象，其中封装两个 RollingHash。L 是滚动窗口的长度；M1 是第一个哈希的倍增进制，M2 是第二个哈希的倍增进制。

BiRollingHash 的其他接口与 RollingHash 一致，除了 `.getKey()` 返回的是一个字符串，逗号分隔两个哈希值。例如：

```javascript
const LEN = 3,
  hash = new BiRollingHash(LEN, 29, 31)
const str = 'abcdabc'
const arr = [...str].map((c) => c.charCodeAt() - 97)
for (let i = 0; i < arr.length; i++) {
  hash.digest(arr[i])
  if (i >= LEN) hash.degest(arr[i - LEN])
  console.log(hash.getKey())
}
// 输出，注意两次到 c 时哈希值相等
'0,0', '1,1', '31,33', '902,1026', '1769,2015', '2524,2884', '31,33'
```

## 工具

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/funcitonal.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/functional.mjs) [Test Cases](https://github.com/harttle/contest.js/blob/master/test/funcitonal.spec.ts)

**memorized(fn: Function, getKey? ((...args: any[]) => string) = ((...args) => args.join(',')))**：返回一个新的函数，记录并缓存 `fn` 的调用参数和返回值。可以自定义 `getKey` 来避免键的冲突或降低键的空间占用。

**create2DArray(N, M, val)**：创建一个 `N` 行 `M` 列的二维数组，所有元素的值初始化为 `val`。

**create3DArray(N, M, D, val)**：创建一个 `N` 行 `M` 列，深度为 `D` 的二维数组，所有元素的值初始化为 `val`。

**adjacent2D(arr, i, j)**：迭代 `[i, j]` 周围四个方向的合法下标。

```javascript
let arr = [
  [11, 12, 13],
  [21, 22, 23],
  [31, 32, 33]
]
for (let [ni, nj] of adjacent2D(arr, 1, 0)) {
  console.log([ni, nj]) // [0, 0], [1, 1], [2, 0]
}
```

**valid2D(arr, i, j)**：测试 `[i, j]` 对于二位数组 `arr` 是否合法，如果合法则返回 `true` 否则返回 `false`。

## 在 Node.js 里使用

在 Node.js 里可以通过 npm 安装后使用 contest.js。

CommonJS:

```javascript
const { Heap } = require('contest.js')
let heap = new Heap()
```

ES Module:

```typescript
import { Heap } from 'contest.js'

const heap = new Heap()
```

## 贡献指南

### 接受哪些 PR？

欢迎任何形式的贡献，我都会给予帮助！你可以：

- 代码：
  - 新增算法：某个门类中缺少的算法/数据结构，或者缺少的门类。
  - 增强既有算法：更可读，更简单，或性能更好。
- 测试：补充测试 case，改善测试覆盖率。
- 文档：文档中有不少描述不清或缺失的地方，比如漏了某个 `public` 方法的描述、英文和中文不同步、标点空格使用错误或不一致、例子可以再丰富或方便理解一些。

### 如何新增一个算法/工具？

- 如何设计接口？
    - 是否有类似的 ES6 类和方法？参考它们！比如 BitSet 里方法的命名可以参考 Set。
    - 是否有类似的 C++ 标准库、STL 或 Java 类？参考它们！比如 algorithm.ts 的内容参考 `<algorithm>` 库。
- 如何解决依赖？
    - 尽量减少依赖，这样单个文件拷贝出去可以直接使用。例如 `swap` 方法直接写在需要使用的文件里。
    - 如果有若干方法或类互相依赖，建议合并为一个文件，但单个文件不要太大。例如 `TreeSet` 和 `RBTree` 仍然是两个文件。
- 关于代码风格
    - `npm run lint` 可以通过就基本可以了！
    - `export` 请写文件尾部，拷贝上面的内容时不需要逐个删除 `export`。
    - 请添加对应的 test，确保覆盖率不下降。
    - 渐进复杂度相同的情况下，优先确保简单性和可读性，而非性能。
    - 只需要提供 TypeScript 版本，`mjs` 会在合入后自动生成。请通过 `npm run build` 确保生成的 `lib/*.mjs` 仍然可读，比如避免用私有方法语法，直接加前缀下划线可以避免 `msj` 中包含不可读的代码。
