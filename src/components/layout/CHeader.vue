<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const currenciesStore = useCurrenciesStore()
const { supportedCurrencies, baseCurrency } = storeToRefs(currenciesStore)
const { setBaseCurrency } = currenciesStore

const baseCurr = computed({
  get() {
    return baseCurrency.value
  },
  set(newValue) {
    setBaseCurrency(newValue)
  },
})
</script>

<template>
  <header class="c-header">
    <div class="c-header__inner">
      <div class="c-header__left">
        <h1 class="c-header__title">Currency Converter</h1>
      </div>
      <div class="c-header__right">
        <select class="form-select base-curr-select" v-if="supportedCurrencies" v-model="baseCurr">
          <option v-for="{ code, name } in supportedCurrencies" :value="code">{{ code }} ({{ name }})</option>
        </select>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.c-header {
  @apply border-b-gray-300
  border-b-[1px]
  shadow-md
  px-3
  font-bold;

  &__inner {
    @apply flex
    py-5
    items-center
    justify-between;
  }

  &__left {
    @apply flex items-center;
  }

  &__right {
    .base-curr-select {
      @apply w-48 overflow-hidden overflow-ellipsis whitespace-nowrap;
    }
  }

  &__title {
    @apply text-2xl text-sky-700;
  }
}
</style>
