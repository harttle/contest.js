function factorial (N: number): number {
  const seq = factorial.seq
  for (let n = seq.length; n <= N; n++) seq.push(seq[seq.length - 1] * n)
  return seq[N]
}
// https://stackoverflow.com/a/33392782/8242705
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace factorial {
  export const seq = [1]
}
export { factorial }

export function factorialSequence (N: number): number[] {
  const req = [1]
  for (let n = 1; n <= N; n++) req.push(req[req.length - 1] * n)
  return req
}

function modularFactorial (N: number | bigint, M: number | bigint): number {
  N = BigInt(N)
  M = BigInt(M)
  const seq = modularFactorial.seq
  for (let n = BigInt(seq.length); n <= N; n++) seq.push(seq[seq.length - 1] * n % M)
  return Number(seq[Number(N)])
}
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace modularFactorial {
  export const seq = [1n]
}
export { modularFactorial }

export function modularFactorialSequence (N: number | bigint, M: number | bigint): number[] {
  N = BigInt(N)
  M = BigInt(M)
  const seq = [1n]
  for (let n = 1n; n <= N; n++) seq.push(seq[seq.length - 1] * n % M)
  return seq.map(x => Number(x))
}
