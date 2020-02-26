const {modularFactorial} = require('./factorial')
const {modularInverse} = require('./euclidean')

function pascalsTriangle(N) {
    let C = [[1]]
    for (let n = 1; n <= N; ++n) {
        C.push(Array(n + 1))
        C[n][0] = C[n][n] = 1
        for (let k = 1; k < n; ++k) {
            C[n][k] = C[n - 1][k - 1] + C[n - 1][k]
        }
    }
    return C
}

function modularPascalsTriangle(N, MOD) {
    let C = [[1n]]
    let MODn = BigInt(MOD)

    for (let n = 1; n <= N; ++n) {
        C.push(Array(n + 1))
        C[n][0] = C[n][n] = 1n
        for (let k = 1; k < n; ++k) {
            C[n][k] = (C[n - 1][k - 1] + C[n - 1][k]) % MODn
        }
    }
    for (let n = 0; n <= N; n++) for (let k = 0; k <= n; k++) C[n][k] = Number(C[n][k])
    return C
}

function binomialCoefficient(n, k) {
    let res = 1
    k = Math.min(k, n - k)
    for (let i = 1; i <= k; ++i)
        res = res * (n - k + i) / i
    return Math.round(res)
}

function moduleBinomialCoefficient(n, k, P) {
    let deno = modularMultiply(modularFactorial(k, P), modularFactorial(n - k, P), P)
    return modularMultiply(modularFactorial(n, P), modularInverse(deno, P), P)
}

function modularMultiply(a, b, M) {
    return Number(BigInt(a) * BigInt(b) % BigInt(M))
}

module.exports = {pascalsTriangle, modularPascalsTriangle, binomialCoefficient, moduleBinomialCoefficient}