# contest.js

> Original work by [@harttle](https://github.com/harttle/contest.js), ported to TypeScript by [@upupming](https://github.com/upupming/contest.js).

[English](./README.en.md)

纯 JavaScript 实现的数据结构和算法，主要是方便用于比赛、教学和白板，尽可能缓解 JavaScript 在竞赛上的劣势，特点：

- **拷来即用**。支持所有 LTS/* Node.js 且零依赖。
- **容易更改**。采用简化的实现，尽量少的抽象层级。
- **支持 npm**。加一句 require，即可写出可以工作的代码。

支持在 LeetCode 页面提取、执行、判定用例的 Tampermonkey 脚本： https://greasyfork.org/zh-CN/scripts/402276-leetcode-helper-for-javascript

**目录**

- [算法](#算法): shuffle, sort, swap, reverse, partition, nextPermutation 等。
- [字符串](#字符串): KMP, RabinKarp
- [队列](#队列)
- [双向队列](#双向队列)
- [堆](#堆)
- [TreeSet](#TreeSet)
- [TreeMultiSet](#TreeMultiSet)
- [BitSet](#BitSet)
- [树状数组](#树状数组)
- [并查集](#并查集): 路径压缩、按秩合并。
- [质数算法](#质数算法): 质数测试、筛选等。
- [阶乘](#阶乘): 阶乘、模阶乘。
- [二项式](#二项式): 二项式系数、帕斯卡三角。
- [欧几里得算法](#欧几里得算法): 欧几里得公约数，扩展欧几里得，模拟元。
- [工具](#工具): create2DArray, create3DArray, greater, less, valid2D, adjacent2D。
- [在 Node.js 里使用](#在-Node.js-里使用): 在 Node.js 里如何通过 npm 使用 contest.js。

## 算法

[Source](https://github.com/harttle/contest.js/blob/master/bit.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/bit.ts)

### 数组修改

补充 JavaScript 中一些针对数组的操作。比如 JavaScript 缺少 `swap`，不能对区间进行 `reverse`。

**swap(arr: any[], lhs: number, rhs: number)**：在数组 `arr` 里替换 `lhs` 和 `rhs` 的值。

**shuffle(arr: any[])**：用 Fisher-Yates 方法随机打乱数组。

```javascript
let arr = [1, 2, 3]
shuffle(arr)
console.log(arr)    // [1, 3, 2]
```

**reverse(arr: any[], begin = 0, end = arr.length)**：反转数组 `arr` 里的 [begin, end) 之间的元素。

```javascript
let arr = [1, 2, 3, 4, 5]
reverse(arr, 1)
console.log(arr)    // [1, 5, 4, 3, 2]
```

### 排序操作

**sort(arr: any[], begin = 0, end = arr.length, compare = (l, r) => l - r)**：使用快排堆数组进行原址排序（不稳定），支持对一个区间进行排序，以及自定义 `compare` 方法。

```javascript
let arr = [1, 3, 2]
console.log(sort(arr))    // [1, 2, 3]
```

### 其他算法

**nextPermutation(arr)**：重组为下一个字典序排列。如果可以得到更大的排列，就完成排列并返回 `true`。如果无法得到更大的排列，就重排为第一个排列（所有元素都是升序）并返回 `false`。

**prevPermutation(arr)**：重组为上一个字典序排列。如果可以得到更小的排列，就完成排列并返回 `true`。如果无法得到更小的排列，就重排为最后一个排列（所有元素都是降序）并返回 `false`。

## 字符串

[Source](https://github.com/harttle/contest.js/blob/master/string.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/string.ts)

**kmp(str: string, pattern: string)**：使用 KMP 方法在 `str` 中找到 `pattern` 的下标，如果不存在则返回 `-1`。

```javascript
kmp('what a wonderful world', 'a wonderful') // returns 5
```

**rabinkarp(str: string, pattern: string)**：使用 Rabin-Karp 方法在 `str` 中找到 `pattern` 的下标，如果不存在则返回 `-1`。

```javascript
rabinkarp('what a wonderful world', 'a wonderful')  // returns 5
```

## 队列

[Source](https://github.com/harttle/contest.js/blob/master/queue.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/queue.ts)

**new Queue(collection?: Iterable)**：创建一个队列。

**.size(): number**：返回队列的大小。

**.front()**：返回第一个元素，为空时返回 `undefined`。

**.back()**：返回最后一个元素，为空时返回 `undefined`。

**.shift()**：移除并返回第一个元素，为空时返回 `undefined`。

**.push(element: any)**：在尾部添加一个元素。

**.values()**：返回从第一个元素到最后一个元素的 ES6 迭代器。

## 双向队列

[Source](https://github.com/harttle/contest.js/blob/master/deque.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/deque.ts)

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
deque.shift()   // returns 0
for (let val of deque) {
    console.log(val)    // outputs 1 and 2
}
```

## 堆

[Source](https://github.com/harttle/contest.js/blob/master/heap.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/heap.ts)

**new Heap(collection?: Iterable, compare?: ((l, r) => number) = (l, r) => l - r)**：从可迭代集合 `collection` 创建一个最小堆（较小的先 pop 出来），使用 `compare` 比较大小（接受两个参数，首个参数较小则返回 `true`，否则返回 `false`，详见示例）。

**.push(element: any)**：把 `element` 加入堆中。

**.pop()**：从堆中弹出一个元素并返回，如果堆是空的则返回 `undefined`。

**.top()**：返回堆顶的元素（最小的元素），如果堆是空的则返回 `undefined`。

**.size()**：返回堆里的元素个数。

```javascript
let heap = new Heap()
heap.push(2)
heap.push(3)
heap.push(1)
while(heap.size()) console.log(heap.pop()) // 输出 1, 2, 3

let maxHeap = new Heap((lhs, rhs) => lhs > rhs)
maxHeap.push(2)
maxHeap.push(3)
maxHeap.push(1)
// 等价于 maxHeap = new Heap([2, 3, 1], (lhs, rhs) => rhs - lhs)
while(maxHeap.size()) console.log(maxHeap.pop()) // 输出 3, 2, 1
```

## TreeSet

[Source](https://github.com/harttle/contest.js/blob/master/treeset.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/treeset.ts)

读写元素最坏情况时间复杂度为 log(n) 的有序集合，由红黑树实现。

**new TreeSet(collection?: any[], compare?: ((l: any, r: any) => boolean) = ((l, r) => l < r))**：创建一个集合，添加所有 `collection` 里的元素，并按照 `compare` 来比较元素大小（默认为升序）。

**.add(val: any)**：把元素 `val` 插入集合，如果 `val` 已存在则移除它。

**.has(val: any)**：如果 `val` 存在则返回 `true`，否则返回 `false`。

**.delete(val: any)**：从集合删除元素 `val`。

**.floor(val: any)**：找到并返回小于等于 `val` 的元素，如果不存在这样的元素则返回 `undefined`。

**.ceiling(val: any)**：找到并返回大于等于 `val` 的元素，如果不存在这样的元素则返回 `undefined`。

**.lower(val: any)**：找到并返回小于 `val` 的元素，如果不存在这样的元素则返回 `undefined`。

**.higher(val: any)**：找到并返回大于 `val` 的元素，如果不存在这样的元素则返回 `undefined`。

**.size(): number**：返回集合的大小。

## TreeMultiSet

[Source](https://github.com/harttle/contest.js/blob/master/treeset.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/treeset.ts)

读写元素最坏情况时间复杂度为 log(n) 的有序集合，和 `TreeSet` 不同的是它允许多个等价的键存在，由红黑树实现。

**new TreeSet(collection?: any[], compare?: ((l: any, r: any) => boolean) = ((l, r) => l - r))**：创建一个集合，添加所有 `collection` 里的元素，并按照 `compare` 来比较元素大小（默认为升序）。

**.add(val: any)**：把元素 `val` 插入集合。

**.has(val: any)**：如果 `val` 存在则返回 `true`，否则返回 `false`。

**.delete(val: any)**：从集合删除元素 `val`。

**.floor(val: any)**：找到并返回小于等于 `val` 的元素，如果不存在这样的元素则返回 `undefined`。

**.ceiling(val: any)**：找到并返回大于等于 `val` 的元素，如果不存在这样的元素则返回 `undefined`。

**.lower(val: any)**：找到并返回小于 `val` 的元素，如果不存在这样的元素则返回 `undefined`。

**.higher(val: any)**：找到并返回大于 `val` 的元素，如果不存在这样的元素则返回 `undefined`。

**.size(): number**：返回集合的大小。

## BitSet

[Source](https://github.com/harttle/contest.js/blob/master/bitset.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/bitset.ts)

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

[Source](https://github.com/harttle/contest.js/blob/master/bit.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/bit.ts)

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
## 并查集

[Source](https://github.com/harttle/contest.js/blob/master/dsu.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/dsu.ts)

支持路径压缩和按秩合并的并查集实现，提供接近常数时间复杂度（Inverse Ackermann Function）的 `find/union` 操作。

**new DSU(N: number)**：创建一个大小为 `N` 的并查集。

**.find(x: number)**：找到值 `x` 对应的组，返回表示这个组的数字。

**.union(x: number, y: number)**：合并 `x` 和 `y` 所属的组并返回 `true`，如果 `x` 和 `y` 已经在同一组则返回 `false`。

## 质数算法

[Source](https://github.com/harttle/contest.js/blob/master/prime.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/prime.ts)

**prime(n: number)**：返回第 n（从 1 开始）个质数，例如 `prime(1)` 返回 `2`。

**primesLeq(n: number)**: 得到小于等于 `n` 的所有质数，返回一个数组。

**isPrime(n)**：如果 `n` 是质数则返回 `true`，否则返回 `false`。

**primeFactors(n)**：返回 `n` 的所有质数因子，键为质数，值为因子的指数。

```javascript
let factors = primeFactors(24)  // 24 = 2*2*2*3 = 2**3 + 3**1
for (let [prime, count] of factors) {
    console.log(prime, count)
}
// 输出
// 2 3
// 3 1
```

## 阶乘

[Source](https://github.com/harttle/contest.js/blob/master/factorial.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/factorial.ts)

**factorial(n: number)**：返回 `n` 的阶乘，例如 `factorial(3)` 返回 `6`。

**modularFactorial(n: number, MOD: number)**：模阶乘，同 `factorial()`，区别是结果会对 `MOD` 取模。

**factorialSequence(n: number)**：得到阶乘序列，下标 `i` 的值表示 `i` 的阶乘。例如 `factorialSequence(3)` 返回 `[1, 1, 2, 6]`。

**modularFactorialSequence(n: number, MOD: number)**：得到取模的阶乘序列，同 `factorialSequence()`，区别是结果会对 `MOD` 取模。

## 二项式

[Source](https://github.com/harttle/contest.js/blob/master/binomial.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/binomial.ts)

**pascalsTriangle(n: number)**：返回第 `n` 个帕斯卡三角，例如 `pascalsTriangle(3)` 返回 `[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]`。其中 `P[n][k]` 表示 C(n, k) 的值。

**modularPascalsTriangle(n: number, MOD: number)**：返回第 `n` 个帕斯卡三角，其中每个值对 `MOD` 取模。

**binomialCoefficient(n: number, k: number)**：返回二项式系数 C(n, k)，即从 n 个互不相同的元素中取 k 个元素的组合数。

**moduleBinomialCoefficient(n: number, k: number, MOD: number)**：返回二项式系数，它的值对 `MOD` 取模。

## 欧几里得算法

[Source](https://github.com/harttle/contest.js/blob/master/euclidean.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/euclidean.ts)

**gcd(a: number, b: number)**：运行欧几里得算法，得到最大公约数。

**gcdExtended(a: number, b: number)**：运行扩展欧几里得算法，得到 `[gcd, x, y]` 数组，其中第一个元素 `gcd` 为最大公约数，且 `gcd === x * a + y * b`。

**modularInverse(a: number, n: number)**：返回 `a` 的模逆元，即 `a^-1 mod n`。如果 `a` 和 `n` 不互质则抛出异常。

## 工具

[Source](https://github.com/harttle/contest.js/blob/master/funcitonal.ts) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/functional.ts)

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
    console.log([ni, nj])   // [0, 0], [1, 1], [2, 0]
}
```

**valid2D(arr, i, j)**：测试 `[i, j]` 对于二位数组 `arr` 是否合法，如果合法则返回 `true` 否则返回 `false`。

## 在 Node.js 里使用

```javascript
const {Heap} = require('contest.js')
let heap = new Heap()
```
