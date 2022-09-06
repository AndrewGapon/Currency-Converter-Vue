import { defineStore,  } from 'pinia'
import { computed, ref } from 'vue'
import { useApi } from '@/plugins/api'
import type { ApiMethods } from '@/api/endpoints'
import { mapSupportedCurrenciesResponse } from '@/stores/mapping'
import { useRequestState } from '@/composables/useRequestState'
import { useLocalStorage } from '@/composables/useLocalStorage'

const defaultBaseCurrency = 'UAH'

export const useCurrenciesStore = defineStore('currencies', () => {
  const storage = useLocalStorage()
  const baseCurrency = computed(() => storage.value.baseCurrency || defaultBaseCurrency)

  const { api, endpoints } = useApi()

  const {
    loading,
    error,
    data: codesResponse,
    request: getSupportedCurrencies
  } = useRequestState(
    () => api.request<ApiMethods.GET_CODES>(
      endpoints.currencies.getCodes
    )
  )

  const supportedCurrencies = computed(
    () => codesResponse.value
      ? mapSupportedCurrenciesResponse(codesResponse.value)
      : null
  )

  function setBaseCurrency(currency: string) {
    if (!supportedCurrencies.value) return
    if (!Object.keys(supportedCurrencies.value).includes(currency)) return
    storage.value.baseCurrency = currency
  }

  return {
    loading,
    error,
    baseCurrency,
    codesResponse,
    supportedCurrencies,
    getSupportedCurrencies,
    setBaseCurrency
  }
})
