import { describe, expect, test } from 'vitest'
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

describe('getDecimalPlaces', () => {
  test.each(getDecimalPlacesCases)(
    'should return minimum amount of decimals to show at least 2 non-nullable digits',
    (data) => {
      const decimals = getDecimalPlaces(...data.args)
      expect(decimals).toEqual(data.expect)
    },
  )
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

describe('toCurrency', () => {
  test.each(toCurrencyCases)('should display number as a currency', (data) => {
    const currency = toCurrency(...data.args)
    expect(currency).toEqual(data.expect)
  })
})
