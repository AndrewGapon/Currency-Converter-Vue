<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { defineProps } from 'vue'

defineProps<{
  error?: string
}>()

defineEmits<{
  (e: 'retry'): void
}>()
</script>

<template>
  <div class="error-widget">
    <h2 class="error-widget__title">
      <exclamation-triangle-icon class="w-6 mr-2" />
      There was encountered an error
    </h2>
    <p v-if="typeof error === 'string'" class="my-4">{{ error }}</p>
    <button type="button" @click="$emit('retry')">Try Again</button>
  </div>
</template>

<style scoped lang="scss">
.error-widget {
  @apply text-center border-[1px] border-red-400 p-6 rounded-md max-w-xl;

  &__title {
    @apply flex items-center justify-center text-red-500 text-2xl;
  }

  button {
    @apply border-gray-500
      duration-150
      border-2
      rounded-md
      p-2
      uppercase
      mt-4
      hover:border-sky-300
      hover:text-sky-300;
  }
}
</style>
