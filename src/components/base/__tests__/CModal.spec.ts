import { beforeEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import CModal from '@/components/base/CModal.vue'
import ModalWrapper from '@/components/base/ModalWrapper.vue'
import { outsideClick } from '../../../directives/outsideClick'
import { XMarkIcon } from '@heroicons/vue/24/outline'

describe('CModal component', () => {
  const target = document.createElement('div')
  target.id = 'modals-container'
  document.body.appendChild(target)

  const WrapComponent = {
    data: () => ({
      show: false,
    }),
    template: `
      <div>
      <c-modal data-test="modal" :show="show" @close="show = false">
        <template #header="{ triggerClose }">
          Header
          <button @click="triggerClose">close</button>
        </template>
        Body
      </c-modal>
      </div>
    `,
  }

  const wrapper = mount(WrapComponent, {
    global: {
      directives: {
        'outside-click': outsideClick,
      },
      components: {
        XMarkIcon,
        CModal,
        ModalWrapper,
      },
    },
  })

  const getModalWrapper = () => wrapper.getComponent(ModalWrapper)

  beforeEach(async () => {
    await wrapper.setData({ show: true })
  })

  const isModalExists = () => getModalWrapper().findByTestId('modal').exists()

  test('should disable scroll when the modal is shown', () => {
    expect(document.body.classList.toString()).toContain('no-scroll')
  })

  test('should be shown or hidden depending on props', async () => {
    expect(getModalWrapper().getByTestId('modal').isVisible()).toBe(true)
    await wrapper.setData({ show: false })
    expect(isModalExists()).toBe(false)
  })

  test('should render slots if they are provided', () => {
    expect(getModalWrapper().getByTestId('modal-header').html()).toContain('header')
    expect(getModalWrapper().getByTestId('modal-body').html()).toContain('body')
    expect(getModalWrapper().findByTestId('modal-footer').exists()).toBe(false)
  })

  test('should be hidden after click on close icon', async () => {
    await getModalWrapper().getByTestId('modal-close-btn').trigger('click')
    expect(isModalExists()).toBe(false)
  })

  test('should be able to hide modal from inside of slot', async () => {
    await getModalWrapper().getByTestId('modal-header').get('button').trigger('click')
    expect(isModalExists()).toBe(false)
  })
})
