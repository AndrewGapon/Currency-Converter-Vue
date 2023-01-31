<script setup lang="ts">
import type { CurrencyCodesDict } from '@/api/types'
import CModal from '@/components/base/CModal.vue'
import { XCircleIcon } from '@heroicons/vue/20/solid'

defineProps<{
  show: boolean
  items: CurrencyCodesDict
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'remove-favorite', currency: string): void
}>()
</script>

<template>
  <c-modal :show="show" @close="emit('close')">
    <template #header>
      <h3 class="text-3xl font-medium">Favorites</h3>
    </template>
    <div
      v-if="!Object.keys(items).length"
      data-test="empty-favorites-list"
      class="favorites-list favorites-list--empty"
    >
      <p>You haven't add any currencies to favorites</p>
    </div>
    <ul v-else data-test="favorites-list" class="favorites-list flex flex-col gap-2">
      <li v-for="(_, curr) in items" :key="curr" class="flex justify-between p-2 border-b-[1px] border-b-gray-500">
        <span>{{ curr }}</span>
        <button type="button" class="w-6 hover:text-sky-700 transition" @click="emit('remove-favorite', curr)">
          <XCircleIcon />
        </button>
      </li>
    </ul>
  </c-modal>
</template>
