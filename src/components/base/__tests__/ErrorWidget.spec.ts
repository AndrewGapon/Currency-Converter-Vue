import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorWidget from '@/components/base/ErrorWidget.vue'

describe('ErrorWidget component', () => {
  const errorStr = 'Something went wrong'
  const wrapper = mount(ErrorWidget, {
    props: {
      error: errorStr,
    },
  })

  test('should render error message', () => {
    expect(wrapper.getByTestId('error-message').text()).toEqual(errorStr)
  })

  test('should emit retry event', async () => {
    await wrapper.getByTestId('retry-btn').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('retry')
  })
})
