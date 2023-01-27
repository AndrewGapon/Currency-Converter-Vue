import type { DOMWrapper } from '@vue/test-utils'

declare module '@vue/test-utils' {
  export class VueWrapper {
    findByTestId(selector: string): DOMWrapper<Element>
    getByTestId(selector: string): Omit<DOMWrapper<Element>, 'exists'>
  }
}
