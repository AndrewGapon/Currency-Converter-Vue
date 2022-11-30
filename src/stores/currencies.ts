import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useApi } from '@/plugins/apiPlugin'
import type { ApiMethod } from '@/api/endpoints'
import { mapSupportedCurrenciesResponse } from '@/stores/mapping'
import { useRequestState } from '@/composables/useRequestState'
import { useLocalStorage } from '@/plugins/localStoragePlugin'

const defaultBaseCurrency = 'UAH'

export const useCurrenciesStore = defineStore('currencies', () => {
  const storage = useLocalStorage()
  const baseCurrency = computed<string>(() => storage.value.baseCurrency || defaultBaseCurrency)
  const favoriteCurrencies = computed(() => storage.value.favoriteCurrencies || {})

  const { api, endpoints } = useApi()

  const {
    loading,
    error,
    data: supportedCurrencies,
    request: getSupportedCurrencies,
  } = useRequestState(
    () => api.request<ApiMethod.GET_CODES>(endpoints.currencies.getCodes),
    mapSupportedCurrenciesResponse
  )

  function setBaseCurrency(currency: string) {
    if (
      !supportedCurrencies.value ||
      !supportedCurrencies.value[currency]
    ) return
    storage.value.baseCurrency = currency
  }

  function toggleFavorite(currency: string) {
    if (!storage.value.favoriteCurrencies) {
      storage.value.favoriteCurrencies = {}
    }
    if (
      !supportedCurrencies.value ||
      !supportedCurrencies.value[currency]
    ) return

    if (favoriteCurrencies.value[currency]) {
      delete storage.value.favoriteCurrencies[currency]
      return
    }
    storage.value.favoriteCurrencies[currency] = true
  }

  return {
    loading,
    error,
    baseCurrency,
    setBaseCurrency,
    supportedCurrencies,
    favoriteCurrencies,
    toggleFavorite,
    getSupportedCurrencies,
  }
})
