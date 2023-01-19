export const getDecimalPlaces = (amount: number): number => {
  let decimalPlaces = 2
  const absoluteValue = Math.abs(amount)
  if (absoluteValue < 1) {
    const zeroDigits = Math.floor(Math.log10(1 / (absoluteValue || 1)))
    decimalPlaces = zeroDigits + 2
  }
  return decimalPlaces
}

export const toCurrency = (num: number, decimals?: number): string => {
  if (!decimals) {
    decimals = getDecimalPlaces(num)
  }
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
  })

  return formatter.format(num)
}


