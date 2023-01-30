<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script setup lang="ts">
defineProps<{
  wrapperClass?: string
  label?: string
  modelValue?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function handleChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>

<template>
  <label :class="['c-checkbox', wrapperClass]">
    <input
      v-bind="$attrs"
      type="checkbox"
      :class="['c-checkbox-field', $attrs.class]"
      :value="modelValue"
      @change="handleChange"
    />
    <span v-if="label" data-test="checkbox-label-text" class="c-checkbox__label">{{ label }}</span>
  </label>
</template>

<style scoped lang="scss">
@import '@/assets/styles/_mixins.scss';

.c-checkbox {
  @apply inline-flex items-center gap-1.5 cursor-pointer;

  &-field {
    @apply cursor-pointer outline-0 rounded transition-colors;

    &:focus {
      @include focus-shadow();
    }
  }

  &__label {
    @apply cursor-pointer;
  }
}
</style>
