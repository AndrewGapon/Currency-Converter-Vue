import type { DOMWrapper, VueWrapper } from '@vue/test-utils'

const createSelector = (value: string): string => `[data-test="${value}"]`
export const DataTestIdPlugin = (wrapper: VueWrapper) => {
  function findByTestId(selector: string): DOMWrapper<Element> {
    return wrapper.find(createSelector(selector))
  }

  function getByTestId(selector: string): Omit<DOMWrapper<Element>, 'exists'> {
    return wrapper.get(createSelector(selector))
  }

  return {
    findByTestId,
    getByTestId,
  }
}
