function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
function gcdExtended(a, b) {
  if (b === 0)
    return [a, 1, 0];
  const [gcd2, x1, y1] = gcdExtended(b, a % b);
  return [gcd2, y1, x1 - Math.floor(a / b) * y1];
}
function modularInverse(a, M) {
  const [gcd2, x] = gcdExtended(a, M);
  if (gcd2 !== 1)
    throw new Error("inverse not exist");
  return (x % M + M) % M;
}
export {
  gcd,
  gcdExtended,
  modularInverse
};
