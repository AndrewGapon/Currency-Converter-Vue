import type { CurrencyCodesDict } from '@/api/types'
import type { ApiServiceSuccessResponse } from '@/api'
import type { ApiResponsesData } from '@/api/endpoints'
import type { ApiMethods } from '@/api/endpoints'

export const mapSupportedCurrenciesResponse = (
  response: ApiServiceSuccessResponse<ApiResponsesData[ApiMethods.GET_CODES]>,
): CurrencyCodesDict => {
  if (!response.data) return {}
  return response.data.supported_codes.reduce<CurrencyCodesDict>((acc, item) => {
    acc[item[0]] = {
      code: item[0],
      name: item[1],
    }
    return acc
  }, {})
}
