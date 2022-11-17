import { describe, it, test, expect } from 'vitest'
import { useRequestState } from '../useRequestState'

const mockSuccessRequest = (value: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(value), 500)
  })
}

const mockFailedRequest = (values: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('error')), 500)
  })
}

describe('useRequestState', async () => {
  test('Success case', () => {
    const { loading, data, error, request } = useRequestState(mockSuccessRequest)

    it('should have proper initial values', () => {
      expect(loading.value).toBe(false)
      expect(data.value).toBeUndefined()
      expect(error.value).toBeNull()
    })

    const args: [string] = ['Some value']
    request(...args).then(() => {
      it('should invoke the callback and set the result to the reactive data variable', function () {
        expect(mockSuccessRequest).toBeCalledWith(args)
        expect(data.value).toBeTruthy()
        expect(error.value).toBeNull()
        expect(loading.value).toBe(false)
      })
    })
    expect(loading.value).toBe(true)
  })

  test('Failed case', () => {
    const { error, request } = useRequestState(mockFailedRequest)

    it('should set the error object to the reactive error variable', () => {
      request('Some value').catch((err) => {
        expect(error.value).toBe(err)
      })
    })
    it('should clear error variable right before next call', () => {
      request('Some value')
      expect(error.value).toBeNull()
    })
  })
})
