class BIT {
    constructor(N) {
        this.N = N
        this.sums = Array(N + 1).fill(0)
        this.nums = Array(N + 1).fill(0)
    }
    increment(n, diff) {
        this.nums[n] += diff
        while(n <= this.N) {
            this.sums[n] += diff
            n += n & (-n)
        }
    }
    update(n, val) {
        this.increment(n, val - this.nums[n])
    }
    sum(n) {
        let sum = 0
        while(n) {
            sum += this.sums[n]
            n -= n & (-n)
        }
        return sum
    }
}

module.exports = { BIT }
