import { beforeEach, describe, expect, test, vi } from 'vitest'
import { DOMWrapper, mount } from '@vue/test-utils'
import FavoritesModal from '@/components/common/FavoritesModal.vue'
import ModalWrapper from '@/components/base/ModalWrapper.vue'
import CModal from '@/components/base/CModal.vue'
import { outsideClick } from '../../../directives/outsideClick'
import { nextTick } from 'vue'

describe('FavoritesModal component', () => {
  const target = document.createElement('div')
  target.id = 'modals-container'
  document.body.appendChild(target)

  const mockHandler = vi.fn().mockImplementation((...args: any[]) => args)
  const mockedCurrencies = {
    UAH: {
      code: 'UAH',
      name: 'Ukrainian Hryvnia',
    },
    USD: {
      code: 'USD',
      name: 'United States Dollar',
    },
    EUR: {
      code: 'EUR',
      name: 'Euro',
    },
  }

  const ParentComponent = {
    data: () => ({
      show: true,
      items: {},
    }),
    methods: {
      mockHandler,
    },
    template: `
      <div>
        <favorites-modal 
          show="show"
          :items="items"
          @close="show = false"
          @remove-favorite="mockHandler"
        />
      </div>
    `,
  }

  const parent = mount(ParentComponent, {
    global: {
      components: {
        CModal,
        ModalWrapper,
        FavoritesModal,
      },
      directives: {
        'outside-click': outsideClick,
      },
    },
  })

  const getModalWrapper = () => parent.getComponent(ModalWrapper)

  test('should render empty list thumb', () => {
    expect(getModalWrapper().getByTestId('empty-favorites-list').isVisible()).toBe(true)
    expect(getModalWrapper().findByTestId('favorites-list').exists()).toBe(false)
  })

  describe('setting a list of currencies', () => {
    beforeEach(async () => {
      await parent.setData({
        items: mockedCurrencies,
      })
    })

    test('should render a list', () => {
      expect(getModalWrapper().getByTestId('favorites-list').isVisible()).toBe(true)
      expect(getModalWrapper().findByTestId('empty-favorites-list').exists()).toBe(false)
    })

    test.each(Object.keys(mockedCurrencies))('should render the currency item', (curr) => {
      expect(getModalWrapper().getByTestId('favorites-list').html()).toContain(curr)
    })

    test('should emit event', async () => {
      const getItem = (nth: number) => getModalWrapper().getByTestId('favorites-list').get(`li:nth-child(${nth})`)
      const getCurr = (item: Omit<DOMWrapper<Element>, 'exists'>) => item.get('span').text()

      let listItem = getItem(1)
      let curr = getCurr(listItem)

      await listItem.get('button').trigger('click')
      expect(mockHandler).toHaveBeenCalledTimes(1)
      expect(mockHandler).toHaveBeenLastCalledWith(curr)

      listItem = getItem(2)
      curr = getCurr(listItem)

      await listItem.get('button').trigger('click')
      expect(mockHandler).toHaveBeenCalledTimes(2)
      expect(mockHandler).toHaveBeenLastCalledWith(curr)
    })
  })
})
