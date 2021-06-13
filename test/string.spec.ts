import { kmp, rabinkarp } from '../string'

describe('kmp, rabinkarp', () => {
  it('should return -1 if not found', () => {
    const text = 'abc'
    const pattern = 'd'
    expect(kmp(text, pattern)).toEqual(-1)
    expect(rabinkarp(text, pattern)).toEqual(-1)
  })
  it('should return index if found (0)', () => {
    const text = 'abcd'
    const pattern = 'd'
    expect(kmp(text, pattern)).toEqual(3)
    expect(rabinkarp(text, pattern)).toEqual(3)
  })
  it('should return index if found (1)', () => {
    const text = 'abcdabcea'
    const pattern = 'abce'
    expect(kmp(text, pattern)).toEqual(4)
    expect(rabinkarp(text, pattern)).toEqual(4)
  })
  it('should return index if found (2)', () => {
    const text = 'ABABDABACDABABCABAB'
    const pattern = 'ABABCABAB'
    expect(kmp(text, pattern)).toEqual(10)
    expect(rabinkarp(text, pattern)).toEqual(10)
  })
  it('should return index if found (3)', () => {
    const text = 'abfdslsnajlasnnalanalalnalalnandlalannanaslalsanlanlsananalsnalnaslsjjasan'
    const pattern = 'anlsa'
    expect(kmp(text, pattern)).toEqual(49)
    expect(rabinkarp(text, pattern)).toEqual(49)
  })
  it('should return index if found (4)', () => {
    const text = 'baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    const pattern = 'aaaaaaaaaaa'
    expect(kmp(text, pattern)).toEqual(1)
    expect(rabinkarp(text, pattern)).toEqual(1)
  })
  it('should return index if found (5)', () => {
    const text = 'ioipoiopiopipoiioipiopipipiipoipoipoiopipoipippp'
    const pattern = 'piop'
    expect(kmp(text, pattern)).toEqual(7)
    expect(rabinkarp(text, pattern)).toEqual(7)
  })
  it('should return index if found (6)', () => {
    const text = 'oiopiopipoipoipoipoiopiopiopipiopiopipoipoipoipoipio'
    const pattern = 'poipio'
    expect(kmp(text, pattern)).toEqual(46)
    expect(rabinkarp(text, pattern)).toEqual(46)
  })
  it('should work for large input', () => {
    const text = Array(1e5).fill('a').join('b') + 'c'
    const pattern = Array(1e3).fill('a').join('b') + 'c'
    expect(kmp(text, pattern)).toEqual(198000)
    expect(rabinkarp(text, pattern)).toEqual(198000)
  })
})
