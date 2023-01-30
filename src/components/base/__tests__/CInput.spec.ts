import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import CInput from '@/components/base/CInput.vue'

describe('CInput component', () => {
  const wrapperClass = 'wrapper-class'
  const fieldClass = 'field-class'
  const initialValue = 'test'
  const updatedValue = 'testtest'

  const wrapper = mount(CInput, {
    props: {
      wrapperClass,
      modelValue: initialValue,
      'onUpdate:modelValue': (e: string) => wrapper.setProps({ modelValue: e }),
    },
    attrs: {
      class: fieldClass,
    },
  })

  const wrapperWithSlots = mount(CInput, {
    slots: {
      prepend: 'prepend',
      append: 'append',
    },
  })

  test('should render proper classes', () => {
    expect(wrapper.classes()).toContain(wrapperClass)
    expect(wrapper.get('input').classes()).toContain(fieldClass)
  })

  test('should updated modelValue', async () => {
    expect(wrapper.get('input').element.value).toEqual(initialValue)
    await wrapper.get('input').setValue(updatedValue)
    expect(wrapper.props('modelValue')).toEqual(updatedValue)
  })

  test('should render slots if they are provided', () => {
    expect(wrapper.findByTestId('input-prepend').exists()).toBe(false)
    expect(wrapper.findByTestId('input-append').exists()).toBe(false)
    expect(wrapperWithSlots.getByTestId('input-prepend').text()).toContain('prepend')
    expect(wrapperWithSlots.getByTestId('input-append').text()).toContain('append')
  })
})
