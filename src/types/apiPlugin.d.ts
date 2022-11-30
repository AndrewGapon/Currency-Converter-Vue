declare module 'vue' {
  import { Api } from '@/api'
  import { endpoints } from '@/api/endpoints'

  interface ComponentCustomProperties {
    $api: Api
    $endpoints: typeof endpoints
  }
}

export {}
