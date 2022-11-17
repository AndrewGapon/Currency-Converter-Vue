import { describe, it, expect } from 'vitest'
import { getDecimalPlaces, toCurrency } from '@/utils/number'

const getDecimalPlacesCases: {
  args: [number]
  expect: number
}[] = [
  {
    args: [10.232342],
    expect: 2,
  },
  {
    args: [0.000034565],
    expect: 6,
  },
  {
    args: [0.0034565],
    expect: 4,
  },
  {
    args: [0.034565],
    expect: 3,
  },
  {
    args: [0.34565],
    expect: 2,
  },
]

describe.each(getDecimalPlacesCases)('getDecimalPlaces', (data) => {
  it('should return minimum amount of decimals to show at least 2 non-nullable digits', () => {
    const decimals = getDecimalPlaces(...data.args)
    expect(decimals).toEqual(data.expect)
  })
})

const toCurrencyCases: {
  args: [number, number?]
  expect: string
}[] = [
  {
    args: [10],
    expect: '10',
  },
  {
    args: [10000],
    expect: '10,000',
  },
  {
    args: [10000.2324],
    expect: '10,000.23',
  },
  {
    args: [10000.2324, 4],
    expect: '10,000.2324',
  },
  {
    args: [10000.0002324],
    expect: '10,000',
  },
  {
    args: [10000.0002324, 3],
    expect: '10,000',
  },
  {
    args: [0.0002324],
    expect: '0.00023',
  },
]

describe.each(toCurrencyCases)('toCurrency', (data) => {
  it('should display number as a currency', () => {
    const currency = toCurrency(...data.args)
    expect(currency).toEqual(data.expect)
  })
})
