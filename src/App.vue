<script setup lang="ts">
import { RouterView } from 'vue-router'
import CHeader from '@/components/layout/CHeader.vue'
import CSidebar from '@/components/layout/CSidebar.vue'
import { useCurrenciesStore } from '@/stores/currencies'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'

const currenciesStore = useCurrenciesStore()
const { supportedCurrencies, loading } = storeToRefs(currenciesStore)
const { getSupportedCurrencies } = currenciesStore

onBeforeMount(() => {
  if (!supportedCurrencies.value && !loading.value) {
    getSupportedCurrencies()
  }
})
</script>

<template>
  <CHeader />
  <div class="c-layout">
    <CSidebar />
    <main class="c-main">
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="scss">
.c-layout {
  @apply flex overflow-hidden;
}
.c-main {
  @apply flex flex-grow p-6 overflow-y-auto relative;

  & > .c-loader {
    align-self: center;
    margin: auto;
  }

  & > .error-widget {
    align-self: center;
    margin: auto;
  }
}
</style>
