import { ref, watch } from 'vue'

const _localStorage = ref(JSON.parse(localStorage.getItem('currencyApp') || '{}'))

watch(_localStorage.value, (value) => {
  localStorage.setItem('currencyApp', JSON.stringify(value))
})

export const useLocalStorage = () => {
  return _localStorage
}
