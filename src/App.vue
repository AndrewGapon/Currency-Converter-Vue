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
  <router-view v-slot="{ Component }">
    <CHeader />
    <div class="c-layout">
      <CSidebar />
      <main class="c-main">
        <Transition name="fade-cross">
          <component :is="Component" />
        </Transition>
      </main>
    </div>
  </router-view>
</template>

<style scoped lang="scss">
@import 'assets/styles/mixins';

.c-layout {
  @apply flex overflow-hidden;
}

.c-main {
  @apply flex-grow p-6 overflow-y-auto relative;
  @include custom-scroll(
    10px,
    theme('colors.slate.600'),
    theme('colors.slate.700'),
    theme('colors.slate.800'),
    theme('colors.slate.200')
  );

  & > .c-loader {
    position: absolute;
    inset: 0;
    align-self: center;
    margin: auto;
  }

  & > .error-widget {
    align-self: center;
    margin: auto;
  }
}
</style>
