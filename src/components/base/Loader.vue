<script setup lang="ts">
import { computed } from 'vue'
import { getCSSSize } from '@/utils/styles'

const props = defineProps<{
  size?: string | number
  weight?: string | number
}>()

const computedSize = computed(
  () => !props.size
    ? '80px'
    : getCSSSize(props.size)
)

const computedWeight = computed(
  () => !props.weight
    ? '8px'
    : getCSSSize(props.weight)
)
</script>

<template>
  <div class="c-loader"><div></div><div></div><div></div><div></div></div>
</template>

<style scoped lang="scss">
.c-loader {
  --loader-size: v-bind(computedSize);
  --loader-weight: v-bind(computedWeight);
  --loader-color: theme('colors.sky.400');

  display: inline-block;
  position: relative;
  width: var(--loader-size);
  height: var(--loader-size);
}
.c-loader div {
  $inner-width: calc(var(--loader-size) - 2 * var(--loader-weight));
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: $inner-width;
  height: $inner-width;
  margin: var(--loader-weight);
  border: var(--loader-weight) solid var(--loader-color);
  border-radius: 50%;
  animation: c-loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--loader-color) transparent transparent transparent;
}
.c-loader div:nth-child(1) {
  animation-delay: -0.45s;
}
.c-loader div:nth-child(2) {
  animation-delay: -0.3s;
}
.c-loader div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes c-loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
