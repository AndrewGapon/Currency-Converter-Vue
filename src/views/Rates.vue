<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies'
import { storeToRefs } from 'pinia'
import { useRequestState } from '@/composables/useRequestState'
import { useApi } from '@/plugins/api'
import type { ApiMethods } from '@/api/endpoints'
import { computed, watch } from 'vue'
import Loader from '@/components/base/Loader.vue'
import ErrorWidget from '@/components/base/ErrorWidget.vue'
import RatesTable from '@/components/Rates/RatesTable.vue'

const currenciesStore = useCurrenciesStore()
const {
  loading: loadingCodes,
  error: codesError,
  baseCurrency,
  supportedCurrencies,
  favoriteCurrencies
} = storeToRefs(currenciesStore)
const { api, endpoints } = useApi()

const {
  loading: loadingRates,
  error: ratesError,
  data: rates,
  request: getRates,
} = useRequestState(
  (currency) => api.request<ApiMethods.GET_RATES>(endpoints.currencies.getCurrencyRates, { currency }),
  (response) => response.data!.conversion_rates,
)

const loading = computed(() => loadingRates.value || loadingCodes.value)
const error = computed(() => codesError.value || ratesError.value)

getRates(baseCurrency.value)

watch(baseCurrency, (value) => {
  getRates(value)
})
</script>

<template>
  <loader v-if="loading" />
  <error-widget
    v-else-if="error"
    :error="error.type || error.message || error.data"
    @retry="() => getRates(baseCurrency)"
  />
  <div v-else-if="rates && supportedCurrencies">
    <h2 class="text-3xl font-medium mb-5">{{ baseCurrency }} Rate:</h2>
    <p class="mb-8">{{ baseCurrency }} exchange rate according to the other world currencies</p>
    <rates-table
      :rates="rates"
      :favorite-currencies="favoriteCurrencies"
      :supported-currencies="supportedCurrencies"
    />
  </div>
</template>

<style lang="scss">

</style>
