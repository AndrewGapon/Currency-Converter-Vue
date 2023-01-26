<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies'
import { storeToRefs } from 'pinia'
import RatesTableRow from '@/components/Rates/RatesTableRow.vue'
import type { CurrencyCodesDict } from '@/api/types'

defineProps<{
  rates: Record<string, number>
  supportedCurrencies: CurrencyCodesDict
  favoriteCurrencies: CurrencyCodesDict
}>()

const currenciesStore = useCurrenciesStore()
const { baseCurrency } = storeToRefs(currenciesStore)
const { toggleFavorite } = currenciesStore
</script>

<template>
  <div class="curr-rates-table">
    <div class="curr-rates-table__head">
      <div>Currency</div>
      <div>FullName</div>
      <div class="curr-rates-table__col-rate">
        Rate to {{ baseCurrency }} <br />
        1 {{ baseCurrency }} =
      </div>
      <div></div>
    </div>
    <div class="curr-rates-table__body">
      <rates-table-row
        v-for="(rate, currency) in rates"
        :key="currency"
        :currency="currency"
        :currency-full-name="supportedCurrencies[currency].name"
        :rate="rate"
        :is-in-favorite="!!favoriteCurrencies[currency]"
        @toggle-favorite="toggleFavorite"
      />
    </div>
  </div>
</template>

<style lang="scss">
.curr-rates-table {
  $p: &;
  &__head,
  &__row {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr 0.5fr;

    div {
      @apply p-2 border-b-[1px] border-y-blue-400;
    }

    #{$p}__col-rate {
      @apply text-right;
    }
  }

  &__head {
    @apply font-semibold;
  }

  &__col-action {
    @apply flex justify-end;

    svg {
      @apply w-6 h-6 cursor-pointer hover:text-sky-300 transition;

      &.active {
        @apply text-sky-900 fill-sky-900 hover:text-sky-700 hover:fill-sky-700;
      }
    }
  }
}
</style>
