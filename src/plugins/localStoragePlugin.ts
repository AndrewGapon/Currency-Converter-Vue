import type { App } from 'vue'
import { inject, ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { CurrencyCodeObject } from '@/api/types'

export interface AppLocalStorage {
  baseCurrency?: string
  favoriteCurrencies?: Record<string, CurrencyCodeObject>
}

export class NoLocalStoragePluginError extends Error {
  constructor() {
    super('localStoragePlugin is not used in the app')
  }
}

export const localStorageKey = 'currencyApp'

export default {
  install: (app: App) => {
    const _localStorage = ref(JSON.parse(localStorage.getItem(localStorageKey) || '{}'))

    watch(_localStorage.value, (value) => {
      localStorage.setItem(localStorageKey, JSON.stringify(value))
    })

    app.provide<Ref<AppLocalStorage>>(localStorageKey, _localStorage)
  },
}

export const useLocalStorage = (): Ref<AppLocalStorage> => {
  const storage = inject<Ref<AppLocalStorage>>(localStorageKey)

  if (!storage) {
    throw new NoLocalStoragePluginError()
  }

  return storage
}
