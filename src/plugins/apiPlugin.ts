import type { App } from 'vue'
import { Api, api } from '@/api'
import { endpoints } from '@/api/endpoints'
import { inject } from 'vue'

interface AppApiPlugin {
  api: Api
  endpoints: typeof endpoints
}

export class NoApiPluginError extends Error {
  constructor() {
    super('apiPlugin is not used in the app')
  }
}

const apiPluginKey = 'apiPlugin'

export default {
  install: (app: App) => {
    app.config.globalProperties.$api = api
    app.config.globalProperties.$endpoints = endpoints

    app.provide<AppApiPlugin>(apiPluginKey, { api, endpoints })
  },
}

export const useApi = (): AppApiPlugin => {
  const apiConfig = inject<AppApiPlugin>(apiPluginKey)

  if (!apiConfig) {
    throw new NoApiPluginError()
  }

  return {
    api: apiConfig.api,
    endpoints: apiConfig.endpoints,
  }
}
