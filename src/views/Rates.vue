<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies'
import { storeToRefs } from 'pinia'
import { useRequestState } from '@/composables/useRequestState'
import { useApi } from '@/plugins/api'
import { ApiMethods } from '@/api/endpoints'
import { computed, watch } from 'vue'
import Loader from '@/components/base/Loader.vue'
import ErrorWidget from '@/components/base/ErrorWidget.vue'

const currenciesStore = useCurrenciesStore()
const {
  loading: loadingCodes,
  error: codesError,
  baseCurrency
} = storeToRefs(currenciesStore)
const { api, endpoints } = useApi()

const {
  loading: loadingRates,
  error: ratesError,
  data: rates,
  request: getRates
} = useRequestState(
  (currency) => api.request<ApiMethods.GET_RATES>(
    endpoints.currencies.getCurrencyRates,
    { currency }
  ),
  (response) => response.data!.conversion_rates
)

const loading = computed(() => loadingRates.value || loadingCodes.value)
const error = computed(() => codesError.value || ratesError.value)

getRates(baseCurrency.value)

watch(baseCurrency, (value) => {
  getRates(value)
})

</script>

<template>
  <Loader v-if="loading" />
  <ErrorWidget v-else-if="error" :error="error.type || error.message || error.data" @retry="() => getRates(baseCurrency)" />
  <div v-else>
    <ul>
      <li v-for="(rate, curr) in rates">
        {{ curr }}: {{ rate }}
      </li>
    </ul>
  </div>
</template>
