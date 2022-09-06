import { createRouter, createWebHistory } from 'vue-router'
import Rates from '../views/Rates.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Rates,
    },
    {
      path: '/convert',
      name: 'converter',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Converter.vue'),
    },
  ],
})

export default router
