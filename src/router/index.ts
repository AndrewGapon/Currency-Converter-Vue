import { createRouter, createWebHistory } from 'vue-router'
import Rates from '../views/Rates.vue'
import { _localStorage } from '@/composables/useLocalStorage'

export enum RouteNames {
  'rates' = 'rates',
  'converter' = 'converter'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.rates,
      component: Rates,
    },
    {
      path: '/convert',
      name: RouteNames.converter,
      component: () => import('../views/Converter.vue'),
      beforeEnter: (to, from, next) => {
        if (!to.query.from) {
          return next({
            ...to,
            query: {
              ...to.query,
              from: _localStorage.value.baseCurrency
            }
          })
        }
        return next()
      },
    },
  ],
})

export default router
