import type { Directive } from 'vue'

export const outsideClick: Directive = {
  beforeMount(el, binding) {
    el.outsideClickHandler = (event: MouseEvent) => {
      const path = (event.composedPath && event.composedPath()) || (event as any).path
      const isClickOutside = path ? path.indexOf(el) < 0 : !el.contains(event.target)

      if (isClickOutside) {
        if (binding.value instanceof Function) {
          queueMicrotask(() => binding.value())
        }
      }
    }

    requestAnimationFrame(() => document.addEventListener('click', el.outsideClickHandler))
  },
  unmounted(el) {
    document.removeEventListener('click', el.outsideClickHandler)
  },
}
