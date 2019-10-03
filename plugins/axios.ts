import { AxiosStatic } from 'axios';
declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosStatic;
  }
}

export default function({ $axios }: { $axios: any }) {
  $axios.setHeader('Authorization', '123')
  $axios.setHeader(
    'Content-Type',
    'application/x-www-form-urlencoded;application/json'
  )
  $axios.onRequest((config: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Making request to ' + config.url)
    }
  })
  $axios.onError((error: any) => {
    console.log(error)
  })
}

