<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script setup lang="ts">
defineProps<{
  modelValue?: string
}>()
defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>

<template>
  <div class="c-input">
    <div v-if="$slots.prepend" class="c-input__prepend">
      <slot name="prepend"></slot>
    </div>
    <input
      v-bind="$attrs"
      :class="['c-input-field', $attrs.class]"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="$slots.append" class="c-input__append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/_mixins.scss";

.c-input {
  @apply flex gap-1.5 rounded-lg border-[1px] border-gray-300 p-2.5;
  outline: 2px solid transparent;
  outline-offset: 2px;

  &:focus-within {
    @apply border-indigo-300;
    @include focus-shadow();
  }

  .c-input-field {
    appearance: none;
    border: none;
    border-radius: 0;
    outline: none;
    box-shadow: none;
    flex-grow: 1;

    &:focus {
      border: none;
      box-shadow: none;
    }
  }
}
</style>
