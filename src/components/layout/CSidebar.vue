<script setup>
import { ref } from 'vue'
import { ArrowPathRoundedSquareIcon, ChartBarIcon } from '@heroicons/vue/24/outline'
import { RouteNames } from '@/router'

const isHidden = ref(false)
const toggleSidebar = () => {
  isHidden.value = !isHidden.value
}
</script>

<template>
  <aside class="c-sidebar">
    <nav class="c-sidebar__nav">
      <ul>
        <li class="c-sidebar__nav-item">
          <router-link class="c-sidebar__nav-link" :to="{ name: RouteNames.rates }">
            <chart-bar-icon />
            <span>Rates</span>
          </router-link>
        </li>
        <li class="c-sidebar__nav-item">
          <router-link class="c-sidebar__nav-link" :to="{ name: RouteNames.converter }">
            <arrow-path-rounded-square-icon />
            <span>Converter</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
.c-sidebar {
  @apply py-4
  border-r-gray-300
  border-r-[1px]
  font-medium;
  min-width: 200px;
  height: 100%;

  &__nav-link {
    --link-color: theme('colors.sky.400');
    --link-hover-color: theme('colors.sky.500');
    --link-active-color: theme('colors.sky.600');
    @apply flex
    items-center
    p-3
    gap-2
    transition;
    color: var(--link-color);

    &:hover {
      color: var(--link-hover-color);
    }

    &:active,
    &.router-link-active {
      color: var(--link-active-color);
    }

    svg {
      @apply w-6;
    }
  }
}
</style>
