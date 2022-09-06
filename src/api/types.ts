export type ApiSuccessResponse<T extends Record<string, any>> = {
  result: 'success' | 'error'
  documentation: string
  terms_of_use: string
} & {
  [K in keyof T]: T[K]
}

export enum ApiErrorTypes {
  'unsupported-code' = 'unsupported-code',
  'malformed-request' = 'malformed-request',
  'invalid-key' = 'invalid-key',
  'inactive-account' = 'inactive-account',
  'quota-reached' = 'quota-reached'
}

export interface ApiError {
  result: 'success' | 'error'
  'error-type': ApiErrorTypes
}

export type ApiResponse<T extends Record<string, any> = Record<string, any>> = ApiSuccessResponse<T> & ApiError

export type CurrencyCodeDescription = [string, string]
export interface CurrencyCodeObject {
  code: string
  name: string
}
export type CurrencyCodesDict = Record<string, CurrencyCodeObject>

export interface CurrencyUpdatesTime {
  time_last_update_unix: number
  time_last_update_utc: string
  time_next_update_unix: number
  time_next_update_utc: string
}

export type ConversionRates = Record<string, number>
export interface GetRatesResponseData extends CurrencyUpdatesTime{
  base_code: string
  conversion_rates: ConversionRates
}

export interface GetConversionResponseData extends CurrencyUpdatesTime {
  base_code: string
  target_code: string
  conversion_rate: number
  conversion_result?: number
}
