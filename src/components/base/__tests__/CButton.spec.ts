import { describe, expect, test } from 'vitest'
import CButton from '@/components/base/CButton.vue'
import { mount } from '@vue/test-utils'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/20/solid'
import { h } from 'vue'

describe('CButton component', () => {
  const text = 'Click me'
  const wrapper = mount(CButton, {
    slots: {
      prependIcon: h(ArrowLeftIcon),
      default: text,
      appendIcon: h(ArrowRightIcon),
    },
  })

  test('render text', () => {
    expect(wrapper.text()).toEqual(text)
  })

  test('render icons', () => {
    expect(wrapper.getComponent(ArrowLeftIcon).isVisible()).toBe(true)
    expect(wrapper.getComponent(ArrowRightIcon).isVisible()).toBe(true)
  })

  test('loading state', async () => {
    const loaderSelector = 'button-loader'
    await wrapper.setProps({ loading: true })
    expect(wrapper.getByTestId(loaderSelector).isVisible()).toBe(true)
    await wrapper.setProps({ loading: false })
    expect(wrapper.findByTestId(loaderSelector).exists()).toBe(false)
  })
})
