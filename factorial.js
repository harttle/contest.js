function factorial(N) {
    let seq = factorial.seq = factorial.seq || [1]
    for (let n = seq.length; n <= N; n++) seq.push(seq[seq.length - 1] * n)
    return seq[N]
}

function factorialSequence(N) {
    let req = [1]
    for (let n = 1; n <= N; n++) req.push(req[req.length - 1] * n)
    return req
}

function modularFactorial(N, M) {
    N = BigInt(N)
    M = BigInt(M)
    let seq = modularFactorial.seq = modularFactorial.seq || [1n]
    for (let n = BigInt(seq.length); n <= N; n++) seq.push(seq[seq.length - 1] * n % M)
    return Number(seq[N])
}

function modularFactorialSequence(N, M) {
    N = BigInt(N)
    M = BigInt(M)
    let seq = [1n]
    for (let n = 1n; n <= N; n++) seq.push(seq[seq.length - 1] * n % M)
    return seq.map(x => Number(x))
}

module.exports = {factorial, modularFactorial, factorialSequence, modularFactorialSequence}