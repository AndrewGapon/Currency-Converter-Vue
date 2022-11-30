import { describe, expect, it } from 'vitest'
import apiPlugin, { NoApiPluginError, useApi } from '../apiPlugin'
import { defineComponent } from 'vue'
import { Api } from '../../api'
import { mount } from '@vue/test-utils'

describe('api', () => {
  it('should throw error if the plugin is not connected', () => {
    expect(() => useApi()).toThrowError(NoApiPluginError)
  })

  const TestComponent = defineComponent({
    setup() {
      const { api, endpoints } = useApi()

      it('should return proper Api instance from composable', () => {
        expect(api).toBeDefined()
        expect(api).toBeInstanceOf(Api)
        expect(endpoints).toBeDefined()
      })

      return {}
    }
  })

  const wrapper = mount(TestComponent, {
    global: {
      plugins: [apiPlugin],
    },
  })

  it('should have Api instance in global properties', () => {
    expect(wrapper.vm.$api).toBeDefined()
    expect(wrapper.vm.$api).toBeInstanceOf(Api)
    expect(wrapper.vm.$endpoints).toBeDefined()
  })
})
