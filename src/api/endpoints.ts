import type { CurrencyCodeDescription, GetConversionResponseData, GetRatesResponseData } from '@/api/types'
import type { Method } from 'axios'
import { Api } from '@/api/index'

export enum ApiMethod {
  GET_CODES = 'GET_CODES',
  GET_RATES = 'GET_RATES',
  GET_CONVERSION = 'GET_CONVERSION',
}

export interface ApiResponsesData {
  [ApiMethod.GET_CODES]: { supported_codes: CurrencyCodeDescription[] }
  [ApiMethod.GET_RATES]: GetRatesResponseData
  [ApiMethod.GET_CONVERSION]: GetConversionResponseData
}

export interface IApiEndpointConfig {
  url: string
  httpMethod: Method
  apiMethod: ApiMethod
}

export const endpoints = {
  [ApiMethod.GET_CODES]: {
    url: '/codes',
    httpMethod: 'GET' as Method,
    apiMethod: ApiMethod.GET_CODES,
  },
  [ApiMethod.GET_RATES]: {
    url: '/latest/:currency',
    httpMethod: 'GET' as Method,
    apiMethod: ApiMethod.GET_RATES,
  },
  [ApiMethod.GET_CONVERSION]: {
    url: '/pair/:base/:target',
    httpMethod: 'GET' as Method,
    apiMethod: ApiMethod.GET_CONVERSION,
  },
}
