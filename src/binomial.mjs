// src/binomial.ts
var N = 1e5;
var MOD = 1e9 + 7;
var MODn = BigInt(MOD);
var fact = getFactorials();
var factInvs = getFactorialInvs();
function getFactorials() {
  const fact2 = [1n];
  for (let i = 1; i <= N; i++)
    fact2.push(fact2[i - 1] * BigInt(i) % MODn);
  return fact2.map((x) => Number(x));
}
function getFactorialInvs() {
  const arr = Array(N + 1);
  arr[N] = power(fact[N], MOD - 2);
  for (let i = N - 1; i >= 0; i--) {
    arr[i] = prod(arr[i + 1], i + 1);
  }
  return arr;
}
function power(x, p) {
  if (!p)
    return 1;
  if (p % 2)
    return prod(power(x, p - 1), x);
  const h = power(x, p / 2);
  return prod(h, h) % MOD;
}
function pascalsTriangle(N2) {
  const C = [[1n]];
  for (let n = 1; n <= N2; ++n) {
    C.push(Array(n + 1));
    C[n][0] = C[n][n] = 1n;
    for (let k = 1; k < n; ++k) {
      C[n][k] = (C[n - 1][k - 1] + C[n - 1][k]) % MODn;
    }
  }
  for (let n = 0; n <= N2; n++)
    for (let k = 0; k <= n; k++)
      C[n][k] = Number(C[n][k]);
  return C;
}
function combination(n, k) {
  return prod(fact[n], factInvs[k], factInvs[n - k]);
}
function arrangement(n, k) {
  return prod(fact[n], factInvs[n - k]);
}
function prod(...args) {
  let p = 1n;
  for (const arg of args) {
    p = p * BigInt(arg) % MODn;
  }
  return Number(p);
}
export {
  MOD,
  arrangement,
  combination,
  fact,
  factInvs,
  getFactorials,
  pascalsTriangle,
  power,
  prod
};
