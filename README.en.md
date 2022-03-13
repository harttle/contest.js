# contest.js

[简体中文](./README.md)

Ready for contest use! Data structures and algorithms in pure JavaScript with zero dependency. Features:

- Ready to copy! Supports all LTS/* Node.js and has ZERO dependency.
- Easy to change! Implemented in simplified code with less abstraction.
- Available via npm! Can be imported as part of the WORKING code.

## User Guide

- [Algorithm](#Algorithm): shuffle, sort, swap, reverse, partition, nextPermutation, etc.
- [String](#String): KMP, RabinKarp
- [Queue](#Queue)
- [Deque](#Deque)
- [Heap](#Heap)
- [TreeSet](#TreeSet)
- [TreeMultiSet](#TreeMultiSet)
- [BitSet](#BitSet)
- [Binary Indexed Tree](#Binary%20Indexed%20Tree)
- [Disjoint Union Set](#Disjoint%20Union%20Set): Path compression, union by rank
- [Primes](#Primes): prime test, sieve, nth prime, etc.
- [Permutation and Combination](#Permutation%20and%20Combination): factorial, modular factorial, Binomial coefficient, Pascal's Triangle
- [Euclidean](#Euclidean): euclidean/GCD algorithm, extended-euclidean/extended-GCD algorithm and modular inverse.
- [Rolling Hash](#Rolling%20Hash): Rolling hash, rolling double hash.
- [Functional](#Functional): create2DArray, create3DArray, greater, less, valid2D, adjacent2D

### Algorithm

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/algorithm.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/algorithm.mjs)

#### Modifying the Sequence

A collection of functions especially designed to be used on arrays. As a compliment to JavaScript Array to `swap`, to `reverse` on an interval.

**swap(arr: any[], lhs: number, rhs: number)**: exchange the values of `lhs` and `rhs` in array `arr`.

**shuffle(arr: any[])**: randomly shuffle the array using Fisher-Yates method.

```javascript
let arr = [1, 2, 3]
shuffle(arr)
console.log(arr)    // [1, 3, 2]
```

**reverse(arr: any[], begin = 0, end = arr.length)**: reverse elements between [begin, end) in `arr`.

```javascript
let arr = [1, 2, 3, 4, 5]
reverse(arr, 1)
console.log(arr)    // [1, 5, 4, 3, 2]
```

#### Sorting

**sort(arr: any[], begin = 0, end = arr.length, compare = (l, r) => l - r)**: sort the array in-place using quicksort, it's not stable. Support sorting on an specified interval and customize a `compare` function.

```javascript
let arr = [1, 3, 2]
console.log(sort(arr))    // [1, 2, 3]
```

#### Graph Algorithms

**createGraph(edges)**: create a 2d Map representing the graph from an array of edges: `[T, T, number]`. The result can be used as input of `dijkstra` algorithm.

```javascript
const G = createGraph([
    [0, 1, 10],
    [1, 0, 30],
    [1, 2, 50]
])
G.get(0)    // Map(1) { 1 => 10 }
G.get(1)    // Map(2) { 0 => 30, 2 => 50 }
```

**dijkstra(source, G)**: return the single source shortest distance. `G.get(u).get(v)` represents the weight of an edge from `u` to `v`. `source` and keys of `G` can be of arbitrary primitive data type, like strings, numbers, etc. Returns the `dist` of type `Map<T, number>`, where `dist[u]` represents the shortest distance from `source` to `u`.

```javascript
const G = new Map()
G.set(0, new Map([[1, 10]]))
G.set(1, new Map([[0, 30], [2, 50]]))

dijkstra(0, G) // Map(3) { 0 => 0, 1 => 10, 2 => 60 }
```

Make use of `createGraph()`, the above snippet is equivalent to:

```javascript
const G = new createGraph([
    [0, 1, 10],
    [1, 0, 30],
    [1, 2, 50],
])

dijkstra(0, G) // Map(3) { 0 => 0, 1 => 10, 2 => 60 }
```

#### Other

**nextPermutation(arr)**: rearranges arr into the next lexicographically greater permutation. If the function can determine the next higher permutation, it rearranges the elements as such and return `true`. If that was not possible (because it is already at the largest possible permutation), it rearranges the elements according to the first permutation (sorted in ascending order) and return `false`.

**prevPermutation(arr)**: rearranges arr into the previous lexicographically-ordered permutation. If the function can determine the previous permutation, it rearranges the elements as such and return `true`. If that was not possible (because it is already at the lowest possible permutation), it rearranges the elements according to the last permutation (sorted in descending order) and return `false`.

### String

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/string.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/string.mjs)

**kmp(str: string, pattern: string)**: find index of `pattern` in `str` using KMP method, return `-1` if not found.

```javascript
kmp('what a wonderful world', 'a wonderful') // return 5
```

**rabinkarp(str: string, pattern: string)**: find index of `pattern` in `str` using Rabin-Karp method, return `-1` if not found.

```javascript
rabinkarp('what a wonderful world', 'a wonderful')  // return 5
```

### Queue

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/queue.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/queue.mjs)

**new Queue(collection?: Iterable)**: create a queue.

**.size(): number**: the size of queue.

**.front()**: return the first element or `undefined` when empty.

**.back()**: return the last element or `undefined` when empty.

**.shift()**: remove one element from the front and return that element, return `undefined` if no element exists.

**.push(element: any)**: add element to the back.

**.values()**: return an ES6 iterator of values, ordered from front to back.

### Deque

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/deque.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/deque.mjs)

**new Deque(collection?: Iterable)**: create a deque.

**.size(): number**: the size of deque.

**.unshift(element: any)**: add element to the front.

**.front()**: return the first element or `undefined` when empty.

**.back()**: return the last element or `undefined` when empty.

**.shift()**: remove one element from the front and return that element, return `undefined` if no element exists.

**.push(element: any)**: add element to the back.

**.pop()**: remove one element from the back and return that element, return `undefined` if no element exists.

**.values()**: return an ES6 iterator of values, ordered from front to back.

```javascript
let deque = new Deque([1, 2, 3])
deque.push(4)
deque.unshift(0)
deque.pop() // return 4
deque.pop() // return 3
deque.shift()   // return 0
for (let val of deque) {
    console.log(val)    // outputs 1 and 2
}
```

### Heap

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/heap.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/heap.mjs)

**new Heap(collection?: Iterable, compare?: ((l, r) => number) = (l, r) => l - r)**: create a min heap (less elements pop out first) from elements of the `collection`, and compare elements using `compare` (accepts two arguments, return `true` if first argument is less).

**.push(element: any)**: push `element` into the heap.

**.pop()**: pop one element from the heap and return that element, return `undefined` if it's already empty.

**.top()**: return the most top element (the minimal element), return `undefined` if it's empty.

**.size()**: return the number of elements in the heap.

```javascript
let heap = new Heap()
heap.push(2)
heap.push(3)
heap.push(1)
while(heap.size()) console.log(heap.pop()) // outputs 1, 2, 3

let maxHeap = new Heap((lhs, rhs) => lhs > rhs)
maxHeap.push(2)
maxHeap.push(3)
maxHeap.push(1)
// Equivelant to: maxHeap = new Heap([2, 3, 1], (lhs, rhs) => rhs - lhs)
while(maxHeap.size()) console.log(maxHeap.pop()) // outputs 3, 2, 1
```

### TreeSet

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/treeset.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/treeset.mjs)

A worst-case time complexity log(n) set implemented by RedBlackTree (see follows).

**new TreeSet(collection?: any[], compare?: ((l: any, r: any) => boolean) = ((l, r) => l < r))**: create a `TreeSet`, add values from `collection`, compare elements using `compare`, which is increasing order by default.

**.add(val: any)**: add element `val` into the set, the existing element with value `val` will be override, if any.

**.has(val: any)**: return `true` if the given `val` exists, return false if not.

**.delete(val: any)**: delete `val` from the set.

**.floor(val: any)**: find and return the element less than or equal to `val`, return `undefined` if no such element found.

**.ceiling(val: any)**: find and return the element greater than or equal to `val`, return `undefined` if no such element found.

**.lower(val: any)**: find and return the element less than `val`, return `undefined` if no such element found.

**.higher(val: any)**: find and return the element greater than `val`, return `undefined` if no such element found.

**.size(): number**: return size of the set.

**.values()**: return an ES6 iterator of values, ordered from front to back.

**.rvalues()**: return an ES6 iterator of values, ordered from back to front.

### TreeMultiSet

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/treeset.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/treeset.mjs)

A worst-case time complexity log(n) multiset implemented by RedBlackTree (see follows).

**new TreeSet(collection?: any[], compare?: ((l: any, r: any) => boolean) = ((l, r) => l < r))**: create a `TreeMultiSet`, add values from `collection`, compare elements using `compare`, which is increasing order by default.

**.add(val: any)**: add element `val` into the set.

**.has(val: any)**: return `true` if the given `val` exists, return false if not.

**.delete(val: any)**: delete `val` from the set.

**.floor(val: any)**: find and return the element less than or equal to `val`, return `undefined` if no such element found.

**.ceiling(val: any)**: find and return the element greater than or equal to `val`, return `undefined` if no such element found.

**.lower(val: any)**: find and return the element less than `val`, return `undefined` if no such element found.

**.higher(val: any)**: find and return the element greater than `val`, return `undefined` if no such element found.

**.size(): number**: return size of the set.

**.values()**: return an ES6 iterator of values, ordered from front to back.

**.rvalues()**: return an ES6 iterator of values, ordered from back to front.

### BitSet

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/bitset.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/bitset.mjs)

A bitset implemented by bigint, which is very space efficient but not efficient for read/write.

**new BitSet(val:(string|number|bigint) = 0, N = Infinity)**: create a bit string from a number, or a string containing only characters `"0"` and `"1"` with capacity `N`.

**.capacity()**: return the capacity of bitset.

**.count()**: return the count of 1s in the bitset.

**.set(i: number, val: boolean | 1 | 0)**: set the value of `i`th index to `val`.

**.get(i: number): 1 | 0**: return the value of `i`th index.

**.toString()**: return a binary string representation of the bitset.

**.shift(len: number)**: return a new bitset which has the value of `this` bitset left shift by `len` bits.

**.unshift(len: number)**: return a new bitset which has the value of `this` bitset right shift by `len` bits.

**.and(rhs: BitSet)**: return a new bitset as the result of `this & rhs`.

**.or(rhs: BitSet)**: return a new bitset as the result of `this | rhs`.

**.xor(rhs: BitSet)**: return a new bitset as the result of `this ^ rhs`.

**.negate(rhs: BitSet)**: return a new bitset as the result of `!this`.

### Binary Indexed Tree

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/bit.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/bit.mjs)

A binary indexed tree implementation, also called [Fenwick Tree](https://en.wikipedia.org/wiki/Fenwick_tree).

**new BIT(size: number)**: create a binary indexed tree with size `size`.

**.update(index: number, value: number)**: update the value at `index` (1-indexed) to `value`.

**.increment(index: number, diff: number)**: increment the value at `index` (1-indexed) by `diff`.

```javascript
let bit = new BIT(10)
bit.update(1, 10)
bit.update(2, 20)
bit.update(10, 100)
bit.sum(5) // elements in [1, 5] sums to 10 + 20 = 30
bit.sum(10) // elements in [1, 10] sums to 10 + 20 + 100 = 130
```
### Disjoint Union Set

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/dsu.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/dsu.mjs)

A disjoint union set implementation supports path compression and union by rank, providing nearly constant time complexity (Inverse Ackermann Function) `find/union` operations.

**new DSU(N: number)**: create a disjoint set of size `N`.

**.find(x: number)**: find the group of value `x` from the set, return a number.

**.union(x: number, y: number)**: union the group of `x` and the group of `y` and return `true`, return `false` if `x` and `y` are already in the same group.

### Primes

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/prime.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/prime.mjs)

**prime(nth: number)**: get nth (1-indexed) prime. e.g. `prime(1)` return `2`

**primesLeq(n: number)**: get primes less than or equal to `n`, return an array of primes.

**isPrime(n)**: return `true` if `n` is prime, `false` otherwise.

**primeFactors(n)**: return all prime factors of `n` as a Map with keys being factors and values being the power of the corresponding factor.

```javascript
let factors = primeFactors(24)  // 24 = 2*2*2*3 = 2**3 + 3**1
for (let [prime, count] of factors) {
    console.log(prime, count)
}
// Output
// 2 3
// 3 1
```

### Permutation and Combination

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/binomial.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/binomial.mjs)

**factorial(n: number)**: factorial of `n`, e.g. `factorial(3)` return `6`.

**modularFactorial(n: number, MOD: number)**: modular factorial, same as `factorial()` except that the result is modulo by `MOD`.

**factorialSequence(n: number)**: get a sequence of factorials, the value at index `i` represents the factorial of `i`. e.g. `factorialSequence(3)` return `[1, 1, 2, 6]`.

**modularFactorialSequence(n: number, MOD: number)**: modular factorial sequence, same as `factorialSequence()` except that the results are modulo by `MOD`.

**pascalsTriangle(n: number)**: return the `n`-th Pascal's Triangle, e.g. `pascalsTriangle(3)` return `[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]`, in which the value of `P[n][k]` represents the value of C(n, k).

**modularPascalsTriangle(n: number, MOD: number)**: return the `n`-th Pascal's Triangle with each value modulo `MOD`.

**binomialCoefficient(n: number, k: number)**: return C(n, k), i.e. number of ways to choose `k` from `n`.

**moduleBinomialCoefficient(n: number, k: number, MOD: number)**: return the binomial coefficient with each value modulo `MOD`.

### Euclidean

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/euclidean.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/euclidean.mjs)

**gcd(a: number, b: number)**: run Euclidean algorithm to compute the greatest common divisor.

**gcdExtended(a: number, b: number)**: run extended Euclidean algorithm to compute the array `[gcd, x, y]`, in which `gcd` is the greatest common divisor and `gcd === x * a + y * b`.

**modularInverse(a: number, n: number)**: return the modular inverse of `a`, i.e. `a^-1 mod n`. Throws an error if `a` and `n` are not coprime.

# Rolling Hash
[TypeScript](https://github.com/harttle/contest.js/blob/master/src/rolling-hash.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/rolling-hash.mjs)

**new RollingHash(L: number, M: number)**: create a rolling hash object. L is the size of rolling window. M is the base, typically should be a prime number greater than the max value to be hashed. Eg. we're hashing numbers in 0-26, M can be 29 or 31.

**.getValue()**: get current hash value.

**.digest(value: number)**: add next number into the rolling hash.

**.degest(value: number)**：remove the first number from rolling hash. This should be done when length is L + 1. So you should call `.digest()` before `.degest()`:

```javascript
const LEN = 3, hash = new RollingHash(LEN, 29)
const str = 'abcdabc'
const arr = [...str].map(c => c.charCodeAt() - 97)
for (let i = 0; i < arr.length; i++) {
    hash.digest(arr[i])
    if (i >= LEN) hash.degest(arr[i - LEN])
    console.log(hash.getKey())
}
// Output the following sequence, note that the two "abc"s have the same hash 31
0, 1, 31, 902, 1769, 2524, 31
```

**new BiRollingHash(L: number, M1: number, M2: number)**: create a rolling double hash objct. L is the size of rolling window, M1 is the base of first rolling hash, M2 is the base of second rolling hash.

Methods of BiRollingHash are the same as RollingHash, except that `.getKey()` returns a comma separated string, separating the two hash values.

```javascript
const LEN = 3, hash = new BiRollingHash(LEN, 29, 31)
const str = 'abcdabc'
const arr = [...str].map(c => c.charCodeAt() - 97)
for (let i = 0; i < arr.length; i++) {
    hash.digest(arr[i])
    if (i >= LEN) hash.degest(arr[i - LEN])
    console.log(hash.getKey())
}
// Output the following sequence, note that the two "abc"s have the same hash 31
'0,0', '1,1', '31,33', '902,1026', '1769,2015', '2524,2884', '31,33'
```

### Functional

[TypeScript](https://github.com/harttle/contest.js/blob/master/src/funcitonal.ts) [JavaScript](https://github.com/harttle/contest.js/blob/master/src/functional.mjs)

**memorized(fn: Function, getKey? ((...args: any[]) => string) = ((...args) => args.join(',')))**: create a new function memorizing arguments and result for each call, return that result if the same arguments are passed in. A custom `getKey` can be specified to avoid conflict or to be more efficient.

**create2DArray(N, M, val)**: create a 2D array with `N` rows and `M` cols and initialize all elements to `val`.

**create3DArray(N, M, D, val)**: create a 2D array with `N` rows, `M` cols and deep `D` and initialize all elements to `val`.

**adjacent2D(arr, i, j)**: yield adjacent indices (4 directions) around `[i, j]`, with non-valid indices excluded.

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

**valid2D(arr, i, j)**: test if index `[i, j]` is valid or not for 2D array `arr`, return `true` if valid and `false` otherwise.

## Use in Node.js

CommonJS:

```javascript
const { Heap } = require('contest.js')
let heap = new Heap()
```

ES Module:

```js
import { Heap } from 'contest.js'

const heap = new Heap()
```

## Contribution Guideline

All kind of contributions are appreciated:

- Add a new algorithm / data structure.
- Improve existing on readability, simplicity or performance.
- Engineering: improve test coverage, add or translate document in any languate.

### How to add a algorithm/utility?

- How to design the interface/signature?
    - Is there a similiar ES6 Class or function to refer to? e.g. `BitSet` is designed with reference to `Set`.
    - Is there an equivalent C++ standard library, STL or Java class? e.g. algorithm.ts contains functionalities in `<algorithm>` C++ lib.
- How to treat dependencies?
    - Use less dependencies if possible so each file will be still functional when used alone. e.g. `swap` function is inlined to each file using it.
    - For functions/classes referencing each other, maybe we need combine them into one single file. But keep each file reasonabily small. e.g. `TreeSet` and `RBTree` are still two separate files.
- About code style
    - `npm run lint` will do the trick, mostly.
    - Please put `export` to the tail of each file, so we don't need to remove them for each name.
    - Add test cases to ensure test coverage is rising, which will be checked automatically on PR.
    - For implementations with same asymptotic complexity, use the most simple and easy to read one.
