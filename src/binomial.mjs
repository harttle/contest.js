// src/euclidean.ts
function gcdExtended(a, b) {
  if (b === 0)
    return [a, 1, 0];
  const [gcd, x1, y1] = gcdExtended(b, a % b);
  return [gcd, y1, x1 - Math.floor(a / b) * y1];
}
function modInverse(a, M) {
  const [gcd, x] = gcdExtended(a, M);
  if (gcd !== 1)
    throw new Error("inverse not exist");
  return (x % M + M) % M;
}

// src/binomial.ts
var MOD = 1e9 + 7;
var MODn = BigInt(MOD);
var _Ann = [1n];
function factorial(N) {
  const Nn = BigInt(N);
  for (let n = BigInt(_Ann.length); n <= Nn; n++)
    _Ann.push(_Ann[_Ann.length - 1] * n % MODn);
  return Number(_Ann[Number(N)]);
}
function factorialSeq(N) {
  factorial(N);
  return _Ann.slice(0, N + 1).map((x) => Number(x));
}
function pascalsTriangle(N) {
  const C = [[1n]];
  for (let n = 1; n <= N; ++n) {
    C.push(Array(n + 1));
    C[n][0] = C[n][n] = 1n;
    for (let k = 1; k < n; ++k) {
      C[n][k] = (C[n - 1][k - 1] + C[n - 1][k]) % MODn;
    }
  }
  for (let n = 0; n <= N; n++)
    for (let k = 0; k <= n; k++)
      C[n][k] = Number(C[n][k]);
  return C;
}
function combination(n, k) {
  const deno = modMultiply(factorial(k), factorial(n - k));
  return modMultiply(factorial(n), modInverse(deno, MOD));
}
function arrangement(n, k) {
  const deno = factorial(n - k);
  return modMultiply(factorial(n), modInverse(deno, MOD));
}
function modMultiply(a, b) {
  return Number(BigInt(a) * BigInt(b) % MODn);
}
export {
  arrangement,
  combination,
  factorial,
  factorialSeq,
  modMultiply,
  pascalsTriangle
};
