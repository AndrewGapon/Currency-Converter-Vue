<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import CLoader from '@/components/base/CLoader.vue'
import type { ButtonAppearance, ButtonSize } from '@/components/base/types'
import type { RouteLocationRaw } from 'vue-router'
import { ComponentPropsError } from '@/errors/component-errors'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    appearance?: ButtonAppearance
    size?: ButtonSize
    rounded?: boolean
    onlyIcon?: boolean
    loading?: boolean
    to?: RouteLocationRaw
  }>(),
  {
    appearance: 'filled',
    size: 'normal',
    rounded: false,
    onlyIcon: false,
    loading: false,
  },
)

const attrs = useAttrs()

if (props.to && attrs.href) {
  throw new ComponentPropsError('CButton component cannot have "to" and "href" props at the same time')
}

const buttonType = computed(() => attrs.type ?? 'button')
</script>

<template>
  <component
    :is="to ? RouterLink : $attrs.href ? 'a' : 'button'"
    :to="to"
    :class="[
      'c-button',
      $attrs.class,
      appearance,
      size,
      {
        rounded,
        loading,
        'only-icon': onlyIcon,
      },
    ]"
    :type="!$attrs.href && !to ? buttonType : undefined"
  >
    <c-loader v-if="loading" data-test="button-loader" :weight="3" :size="40" />
    <slot name="prependIcon"></slot>
    <slot></slot>
    <slot name="appendIcon"></slot>
  </component>
</template>

<style scoped lang="scss">
@import '@/assets/styles/_mixins.scss';

.c-button {
  position: relative;
  display: inline-flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
  border: 2px solid;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.4px;
  transition: 0.2s linear;
  outline: none;

  &.loading {
    opacity: 0.5;

    .c-loader {
      position: absolute;
      inset: 0;
      margin: auto;
    }
  }

  &:disabled {
    cursor: default;
  }

  &:focus {
    @include focus-shadow();
  }

  &.filled {
    color: var(--c-btn-filled-color);
    background-color: var(--c-btn-filled-bg-color);
    border-color: var(--c-btn-filled-bg-color);

    &:hover {
      border-color: var(--c-btn-filled-bg-color-hover);
      background-color: var(--c-btn-filled-bg-color-hover);
    }

    &:active {
      border-color: var(--c-btn-filled-bg-color-active);
      background-color: var(--c-btn-filled-bg-color-active);
    }

    &:disabled {
      color: var(--c-btn-filled-color-disabled);
      border-color: var(--c-btn-filled-bg-color-disabled);
      background-color: var(--c-btn-filled-bg-color-disabled);
    }
  }

  &.text,
  &.outline {
    color: var(--c-btn-outline-color);

    &:hover {
      color: var(--c-btn-outline-color-hover);
    }

    &:active {
      color: var(--c-btn-outline-color-active);
    }

    &:disabled {
      color: var(--c-btn-outline-color-disabled);
    }
  }

  &.text {
    border: none;
  }

  &.outline {
    background-color: var(--c-btn-outline-bg-color);
    border-color: currentColor;

    &:hover,
    &:active {
      background-color: var(--c-btn-outline-bg-color-hover);
    }
  }

  &.rounded {
    border-radius: 22.5rem;
  }

  &.only-icon {
    padding: 0.5rem 0.5rem;
  }

  &.large {
    font-size: 1.25rem;
  }

  &.normal {
    font-size: 1rem;
  }

  &.small {
    font-size: 0.75rem;
  }

  :slotted(svg) {
    width: calc(1em + 4px);
    height: calc(1em + 4px);

    path {
      fill: currentColor;
    }
  }
}
</style>
