import type { App } from 'vue'
import { Api, api } from '@/api'
import { endpoints } from '@/api/endpoints'
import { inject } from 'vue'

interface AppApiPlugin {
  api: Api
  endpoints: typeof endpoints
}

const apiPluginKey = 'apiPlugin'

export default {
  install: (app: App) => {
    app.config.globalProperties.$api = api
    app.config.globalProperties.$endpoints = endpoints

    app.provide<AppApiPlugin>(apiPluginKey, { api, endpoints })
  }
}

export const useApi = (): AppApiPlugin => {
  const apiConfig = inject<AppApiPlugin>(apiPluginKey)

  return {
    api: apiConfig!.api,
    endpoints: apiConfig!.endpoints
  }
}
