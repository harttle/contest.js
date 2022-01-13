class BIT {
  N: number
  sums: number[]
  nums: number[]
  constructor (N: number) {
    this.N = N
    this.sums = Array(N + 1).fill(0)
    this.nums = Array(N + 1).fill(0)
  }

  increment (n: number, diff: number): void {
    this.nums[n] += diff
    while (n <= this.N) {
      this.sums[n] += diff
      n += n & (-n)
    }
  }

  update (n: number, val: number): void {
    this.increment(n, val - this.nums[n])
  }

  sum (n: number): number {
    let sum = 0
    while (n > 0) {
      sum += this.sums[n]
      n -= n & (-n)
    }
    return sum
  }
}

export { BIT }
