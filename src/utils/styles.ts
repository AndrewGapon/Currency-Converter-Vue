export const getCSSSize = (val: string | number) => typeof val === 'number'
  ? `${val}px`
  : val
