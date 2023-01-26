<script>
export default {
  inheritAttrs: false,
}
</script>
<script setup>
import { watch } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  show: {
    type: Boolean,
    default: () => false,
  },
})
const emit = defineEmits(['close'])

watch(
  () => props.show,
  (value) => {
    document.body.classList.toggle('no-scroll', value)
  },
)

const triggerClose = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="#modals-container">
    <Transition name="fade">
      <div v-if="show" class="modal-overlay">
        <div v-outside-click="triggerClose" v-bind="$attrs" class="modal">
          <button class="modal__close-button" @click="triggerClose">
            <XMarkIcon />
          </button>
          <div v-if="$slots.header" class="modal__header">
            <slot name="header" :trigger-close="triggerClose"></slot>
          </div>
          <div v-if="$slots.default" class="modal__body">
            <slot :trigger-close="triggerClose"></slot>
          </div>
          <div v-if="$slots.footer" class="modal__footer">
            <slot name="footer" :trigger-close="triggerClose"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
@import 'src/assets/styles/mixins';

$outer-padding: 24px;

.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  @apply bg-gray-900/50;
}

.modal {
  position: relative;
  background: theme('colors.stone.50');
  border-radius: theme('borderRadius.md');
  width: 598px;
  max-height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;

  &__close-button {
    display: flex;
    position: absolute;
    top: $outer-padding + 4px;
    right: $outer-padding;
    @apply w-8;

    &:hover {
      color: theme('colors.red.500');
    }
  }

  &__header {
    padding: $outer-padding;
    border-bottom: 1px solid theme('colors.neutral.300');
  }

  &__body {
    @include custom-scroll(
      4px,
      theme('colors.slate.600'),
      theme('colors.slate.700'),
      theme('colors.slate.800'),
      theme('colors.slate.200'),
      16px
    );

    padding: 16px 14px 16px $outer-padding;
    margin-right: 6px;

    &:empty {
      display: none;
    }
  }

  &__footer {
    padding: $outer-padding;
    border-top: 1px solid theme('colors.neutral.300');
  }
}
</style>
