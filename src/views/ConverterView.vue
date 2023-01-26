<script setup lang="ts">
import CInput from '@/components/base/CInput.vue'
import { ref } from 'vue'
import { useCurrenciesStore } from '@/stores/currencies'
import { storeToRefs } from 'pinia'
import CLoader from '@/components/base/CLoader.vue'
import CButton from '@/components/base/CButton.vue'
import { ArrowsUpDownIcon } from '@heroicons/vue/24/outline'
import { useRequestState } from '@/composables/useRequestState'
import { useApi } from '@/plugins/apiPlugin'
import { ApiMethod } from '@/api/endpoints'
import CCheckbox from '@/components/base/CCheckbox.vue'

const currenciesStore = useCurrenciesStore()
const { supportedCurrencies, loading: loadingCodes, baseCurrency } = storeToRefs(currenciesStore)

const inputCurrency = ref<string | undefined>(baseCurrency.value)
const outputCurrency = ref<string | undefined>()
const inputAmount = ref<string>()
const outputAmount = ref<string>()

const { api } = useApi()

const { loading, data, request } = useRequestState(
  (base, target) => api.request(ApiMethod.GET_CONVERSION, { base, target }),
  (response) => {
    const { conversion_result, conversion_rate } = response.data
    return conversion_result ?? conversion_rate * Number(inputAmount.value)
  },
)

function switchCurrencies() {
  const from = inputCurrency.value
  inputCurrency.value = outputCurrency.value
  outputCurrency.value = from
  inputAmount.value = undefined
  outputAmount.value = undefined
}

async function getConversion() {
  await request(inputCurrency.value, outputCurrency.value)
  outputAmount.value = String(data.value)
}
</script>

<template>
  <c-loader v-if="loadingCodes" />
  <div v-else class="converter">
    <h2 class="text-3xl font-medium mb-8">Convert</h2>
    <div class="convert-form">
      <div class="convert-form__head mb-6">
        <h4 class="text-xl font-medium">Select currencies to convert</h4>
        <c-checkbox wrapper-class="mt-6" label="Choose from favorites" />
      </div>
      <div class="convert-form__body mb-3">
        <c-input
          v-model="inputAmount"
          class="converter-form__input"
          type="number"
          inputmode="numeric"
          placeholder="0.0"
        >
          <template #append>
            <select v-if="supportedCurrencies" v-model="inputCurrency" class="form-select currency-form__select">
              <option v-for="{ code } in supportedCurrencies" :key="code" :value="code">
                {{ code }}
              </option>
            </select>
          </template>
        </c-input>
        <c-button appearance="outline" rounded only-icon @click="switchCurrencies">
          <ArrowsUpDownIcon />
        </c-button>
        <c-input
          v-model="outputAmount"
          class="converter-form__input"
          type="number"
          inputmode="numeric"
          readonly
          placeholder="0.0"
        >
          <template #append>
            <select v-if="supportedCurrencies" v-model="outputCurrency" class="form-select currency-form__select">
              <option v-for="{ code } in supportedCurrencies" :key="code" :value="code">
                {{ code }}
              </option>
            </select>
          </template>
        </c-input>
      </div>
      <div class="convert-form__footer">
        <c-button
          :loading="loading"
          :disabled="!outputCurrency || !inputCurrency"
          class="w-full"
          @click="getConversion"
        >
          Convert
        </c-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.convert-form {
  width: 520px;
  margin: 0 auto;
  @apply p-6 border-2 border-indigo-200 rounded-xl;

  &__body {
    @apply text-center;

    & > * + * {
      margin-top: 8px;
    }
  }

  &__select {
    width: 90px;
  }
}
</style>
