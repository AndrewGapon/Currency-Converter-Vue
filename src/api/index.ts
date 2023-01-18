import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'
import type { ApiResponsesData } from '@/api/endpoints'
import type { ApiError, ApiResponse } from '@/api/types'
import { endpoints } from '@/api/endpoints'

export interface ApiServiceError {
  status?: number
  type?: string
  data?: any
}

export interface ApiServiceSuccessResponse<R> {
  data?: R
}

export interface ApiServiceResponse<R> extends ApiServiceSuccessResponse<R> {
  error?: ApiServiceError
}

interface IApi {
  request<K extends keyof ApiResponsesData>(
    endpoint: K,
    params?: Record<string, any>,
  ): Promise<ApiServiceResponse<ApiResponsesData[K]>>
}

export class Api implements IApi {
  private instance: AxiosInstance

  constructor(options: AxiosRequestConfig) {
    this.instance = axios.create(options)
  }

  static replaceUrlParams(url: string, params: Record<string, string>) {
    let parsedUrl = url
    for (const key of Object.keys(params)) {
      const regex = new RegExp(`:${key}`, 'g')
      if (regex.test(url)) {
        parsedUrl = parsedUrl.replace(regex, params[key])
        delete params[key]
      }
    }
    return {
      url: parsedUrl,
      params: { ...params },
    }
  }

  request<K extends keyof ApiResponsesData>(
    endpoint: K,
    data?: Record<string, any>,
  ): Promise<ApiServiceResponse<ApiResponsesData[K]>> {
    const endpointConfig = endpoints[endpoint]
    const { url, params } = Api.replaceUrlParams(endpointConfig.url, data ?? {})
    return this.instance
      .request<ApiResponse<ApiResponsesData[K]>>({
        url,
        method: endpointConfig.httpMethod,
        params,
      })
      .then(Api.handleResponse)
      .catch(Api.handleError)
  }

  static handleResponse<R extends Record<string, any>>(response: AxiosResponse<ApiResponse<R>>) {
    if (response.data.result === 'error') {
      return {
        error: {
          type: response.data['error-type'],
        },
      } as ApiServiceError
    }
    return { data: response.data } as ApiServiceResponse<R>
  }

  static handleError(responseError: AxiosError<ApiError>) {
    const error = {
      status: responseError.response?.status,
      data: responseError.response?.data,
      type: responseError.response?.data['error-type'],
    }
    return Promise.reject({ error }) as ApiServiceError
  }
}

const apiUrl = import.meta.env.VITE_CURRENCY_API_URL
const apiKey = import.meta.env.VITE_CURRENCY_API_KEY

export const api = new Api({
  baseURL: `${apiUrl}/${apiKey}`,
})
