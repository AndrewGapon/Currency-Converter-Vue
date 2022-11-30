import { createRouter, createWebHistory } from 'vue-router'
import Rates from '../views/Rates.vue'

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
    },
  ],
})

export default router
