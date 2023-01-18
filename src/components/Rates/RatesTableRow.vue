<script setup lang="ts">
import { toCurrency } from '@/utils/number'
import { BookmarkIcon } from '@heroicons/vue/24/outline'

defineProps<{
  currency: string
  currencyFullName: string
  rate: number
  isInFavorite: boolean
}>()

defineEmits<{
  (e: 'toggle-favorite', currency: string): void
}>()
</script>

<template>
  <div class="curr-rates-table__row">
    <div>{{ currency }}</div>
    <div>{{ currencyFullName }}</div>
    <div class="curr-rates-table__col-rate">{{ toCurrency(rate) }}</div>
    <div class="curr-rates-table__col-action">
      <bookmark-icon :class="{ active: isInFavorite }" @click="$emit('toggle-favorite', currency)" />
    </div>
  </div>
</template>
