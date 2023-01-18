import { computed, ref } from 'vue'

export const useRequestState = <C extends Promise<any>, A extends any[], R extends Awaited<Required<C>>>(
  callback: (...args: A) => C,
  mapCallback?: (response: Awaited<C>) => R,
) => {
  const loading = ref(false)
  const error = ref<any>(null)
  const data = ref<R>()

  async function request(...args: A) {
    loading.value = true
    error.value = null
    try {
      const response = await callback(...args)
      data.value = mapCallback ? mapCallback(response) : response
    } catch (err: any) {
      error.value = err.error || err
    }
    loading.value = false
  }

  return {
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    data: computed(() => data.value),
    request,
  }
}
