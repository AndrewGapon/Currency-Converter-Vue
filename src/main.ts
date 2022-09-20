import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import apiPlugin from '@/plugins/api'
import { outsideClick } from '@/directives/outsideClick'

import '@/assets/styles/index.scss'

const app = createApp(App)

app.use(apiPlugin)
app.use(createPinia())
app.use(router)
app.directive('outside-click', outsideClick)

app.mount('#app')
