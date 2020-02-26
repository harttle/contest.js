# contest.js

[简体中文](./README.md)

Ready for contest use! Data structures and algorithms in pure JavaScript with zero dependency. Features:

- Ready to copy! Supports all LTS/* Node.js and has ZERO dependency.
- Easy to change! Implemented in simplified code with less abstraction.
- Available via npm! Can be imported as part of the WORKING code.

**Table of Contents**

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
- [Factorial](#Factorial): factorial, modular factorial
- [Binomial](#Binomial): Binomial coefficient, Pascal's Triangle
- [Euclidean](#Euclidean): euclidean/GCD algorithm, extended-euclidean/extended-GCD algorithm and modular inverse.
- [Functional](#Functional): create2DArray, create3DArray, greater, less, valid2D, adjacent2D
- [Use in Node.js](#Use-in-Node.js): how to use contest.js in Node.js via npm.

## Algorithm

[Source](https://github.com/harttle/contest.js/blob/master/bit.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/bit.js)

### Modifying the Sequence

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

### Sorting

**sort(arr: any[], begin = 0, end = arr.length, compare = (l, r) => l - r)**: sort the array in-place using quicksort, it's not stable. Support sorting on an specified interval and customize a `compare` function.

```javascript
let arr = [1, 3, 2]
console.log(sort(arr))    // [1, 2, 3]
```

### Other

**nextPermutation(arr)**: rearranges arr into the next lexicographically greater permutation. If the function can determine the next higher permutation, it rearranges the elements as such and return `true`. If that was not possible (because it is already at the largest possible permutation), it rearranges the elements according to the first permutation (sorted in ascending order) and return `false`.

**prevPermutation(arr)**: rearranges arr into the previous lexicographically-ordered permutation. If the function can determine the previous permutation, it rearranges the elements as such and return `true`. If that was not possible (because it is already at the lowest possible permutation), it rearranges the elements according to the last permutation (sorted in descending order) and return `false`.

## String

[Source](https://github.com/harttle/contest.js/blob/master/string.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/string.js)

**kmp(str: string, pattern: string)**: find index of `pattern` in `str` using KMP method, return `-1` if not found.

```javascript
kmp('what a wonderful world', 'a wonderful') // return 5
```

**rabinkarp(str: string, pattern: string)**: find index of `pattern` in `str` using Rabin-Karp method, return `-1` if not found.

```javascript
rabinkarp('what a wonderful world', 'a wonderful')  // return 5
```

## Queue

[Source](https://github.com/harttle/contest.js/blob/master/queue.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/queue.js)

**new Queue(collection?: Iterable)**: create a queue.

**.size(): number**: the size of queue.

**.front()**: return the first element or `undefined` when empty.

**.back()**: return the last element or `undefined` when empty.

**.shift()**: remove one element from the front and return that element, return `undefined` if no element exists.

**.push(element: any)**: add element to the back.

**.values()**: return an ES6 iterator of values, ordered from front to back.

## Deque

[Source](https://github.com/harttle/contest.js/blob/master/deque.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/deque.js)

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

## Heap

[Source](https://github.com/harttle/contest.js/blob/master/heap.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/heap.js)

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

## TreeSet

[Source](https://github.com/harttle/contest.js/blob/master/treeset.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/treeset.js)

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

## TreeMultiSet

[Source](https://github.com/harttle/contest.js/blob/master/treeset.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/treeset.js)

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

## BitSet

[Source](https://github.com/harttle/contest.js/blob/master/bitset.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/bitset.js)

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

## Binary Indexed Tree

[Source](https://github.com/harttle/contest.js/blob/master/bit.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/bit.js)

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
## Disjoint Union Set

[Source](https://github.com/harttle/contest.js/blob/master/dsu.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/dsu.js)

A disjoint union set implementation supports path compression and union by rank, providing nearly constant time complexity (Inverse Ackermann Function) `find/union` operations.

**new DSU(N: number)**: create a disjoint set of size `N`.

**.find(x: number)**: find the group of value `x` from the set, return a number.

**.union(x: number, y: number)**: union the group of `x` and the group of `y` and return `true`, return `false` if `x` and `y` are already in the same group.

## Primes

[Source](https://github.com/harttle/contest.js/blob/master/prime.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/prime.js)

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

## Factorial

[Source](https://github.com/harttle/contest.js/blob/master/factorial.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/factorial.js)

**factorial(n: number)**: factorial of `n`, e.g. `factorial(3)` return `6`.

**modularFactorial(n: number, MOD: number)**: modular factorial, same as `factorial()` except that the result is modulo by `MOD`.

**factorialSequence(n: number)**: get a sequence of factorials, the value at index `i` represents the factorial of `i`. e.g. `factorialSequence(3)` return `[1, 1, 2, 6]`.

**modularFactorialSequence(n: number, MOD: number)**: modular factorial sequence, same as `factorialSequence()` except that the results are modulo by `MOD`.

## Binomial

[Source](https://github.com/harttle/contest.js/blob/master/binomial.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/binomial.js)

**pascalsTriangle(n: number)**: return the `n`-th Pascal's Triangle, e.g. `pascalsTriangle(3)` return `[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]`, in which the value of `P[n][k]` represents the value of C(n, k).

**modularPascalsTriangle(n: number, MOD: number)**: return the `n`-th Pascal's Triangle with each value modulo `MOD`.

**binomialCoefficient(n: number, k: number)**: return C(n, k), i.e. number of ways to choose `k` from `n`.

**moduleBinomialCoefficient(n: number, k: number, MOD: number)**: return the binomial coefficient with each value modulo `MOD`.

## Euclidean

[Source](https://github.com/harttle/contest.js/blob/master/euclidean.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/euclidean.js)

**gcd(a: number, b: number)**: run Euclidean algorithm to compute the greatest common divisor.

**gcdExtended(a: number, b: number)**: run extended Euclidean algorithm to compute the array `[gcd, x, y]`, in which `gcd` is the greatest common divisor and `gcd === x * a + y * b`.

**modularInverse(a: number, n: number)**: return the modular inverse of `a`, i.e. `a^-1 mod n`. Throws an error if `a` and `n` are not coprime.

## Functional

[Source](https://github.com/harttle/contest.js/blob/master/funcitonal.js) [Raw](https://raw.githubusercontent.com/harttle/contest.js/master/functional.js)

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

```javascript
const {Heap} = require('classics')
let heap = new Heap()
```