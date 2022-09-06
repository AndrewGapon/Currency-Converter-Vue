import type {
  CurrencyCodeDescription,
  GetConversionResponseData,
  GetRatesResponseData
} from '@/api/types'
import type { Method } from 'axios'

export enum ApiMethods {
  GET_CODES = 'GET_CODES',
  GET_RATES = 'GET_RATES',
  GET_CONVERSION = 'GET_CONVERSION'
}

export interface ApiResponsesData {
  [ApiMethods.GET_CODES]: { supported_codes: CurrencyCodeDescription[] }
  [ApiMethods.GET_RATES]: GetRatesResponseData
  [ApiMethods.GET_CONVERSION]: GetConversionResponseData
}

export interface IApiEndpointConfig {
  url: string
  method: Method
}

export const endpoints = {
  currencies: {
    getCodes: {
      url: '/codes',
      method: 'GET' as Method
    },
    getCurrencyRates: {
      url: '/latest/:currency',
      method: 'GET' as Method
    },
    getCurrenciesConversion: {
      url: '/pair/:base/:target',
      method: 'GET' as Method
    }
  }
}
