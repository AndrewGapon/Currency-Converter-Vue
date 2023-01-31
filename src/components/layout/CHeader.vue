<script setup lang="ts">
import { useCurrenciesStore } from '@/stores/currencies'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { BookmarkSquareIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import FavoritesModal from '@/components/common/FavoritesModal.vue'

const currenciesStore = useCurrenciesStore()
const { supportedCurrencies, baseCurrency, favoriteCurrencies } = storeToRefs(currenciesStore)
const { setBaseCurrency, toggleFavorite } = currenciesStore

const baseCurr = computed({
  get() {
    return baseCurrency.value
  },
  set(newValue) {
    setBaseCurrency(newValue)
  },
})

const showFavoritesPopup = ref(false)
const { beforeEach } = useRouter()
beforeEach((to, from, next) => {
  showFavoritesPopup.value = false
  return next()
})
</script>

<template>
  <header class="c-header">
    <div class="c-header__inner">
      <div class="c-header__left">
        <h1 class="c-header__title">Currency Converter</h1>
      </div>
      <div class="c-header__right">
        <select v-if="supportedCurrencies" v-model="baseCurr" class="form-select base-curr-select">
          <option v-for="{ code, name } in supportedCurrencies" :key="code" :value="code">
            {{ code }} ({{ name }})
          </option>
        </select>
        <button class="w-10" type="button" @click="showFavoritesPopup = true">
          <BookmarkSquareIcon />
        </button>
      </div>
    </div>
  </header>
  <favorites-modal
    :show="showFavoritesPopup"
    :items="favoriteCurrencies"
    @close="showFavoritesPopup = false"
    @remove-favorite="toggleFavorite"
  />
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
    @apply flex items-center gap-2;

    .base-curr-select {
      @apply w-48 overflow-hidden overflow-ellipsis whitespace-nowrap;
    }
  }

  &__title {
    @apply text-2xl text-sky-700;
  }
}
</style>
