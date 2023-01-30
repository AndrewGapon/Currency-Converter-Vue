import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import CCheckbox from '@/components/base/CCheckbox.vue'

describe('CCheckbox component', () => {
  const wrapperClass = 'wrapper-class'
  const labelText = 'The Checkbox'
  const fieldClass = 'field-class'

  const wrapper = mount(CCheckbox, {
    props: {
      wrapperClass: wrapperClass,
      label: labelText,
      modelValue: false,
      'onUpdate:modelValue': (e: boolean) => wrapper.setProps({ modelValue: e }),
    },
    attrs: {
      class: fieldClass,
    },
  })

  test('should render proper classes', () => {
    expect(wrapper.classes()).toContain(wrapperClass)
    expect(wrapper.get('input').classes()).toContain(fieldClass)
  })

  test('should render label text if the prop is defined', async () => {
    const labelTestId = 'checkbox-label-text'
    expect(wrapper.getByTestId(labelTestId).text()).toEqual(labelText)
    await wrapper.setProps({ label: undefined })
    expect(wrapper.findByTestId(labelTestId).exists()).toBe(false)
  })

  test('should update modelValue', async () => {
    await wrapper.find('input').setValue(true)
    expect(wrapper.props('modelValue')).toBe(true)
  })
})
