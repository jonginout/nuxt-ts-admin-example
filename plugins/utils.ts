import Vue from 'vue'
import qs from 'qs'
import { format } from 'date-fns'
import { popup } from '~/utils'

Vue.prototype.$qsUrl = (requestUrl: string, params: object): string => {
	if (!params) params = {}
	if (!requestUrl) return ''
	if (requestUrl[0] !== '/') requestUrl = `/${requestUrl}`
	return `${requestUrl}?${qs.stringify(params)}`
}

Vue.prototype.$qs = (params: object): string => {
	if (!params) return ''
	return qs.stringify(params)
}

Vue.prototype.$datetime = (datetime: string): string => {
	return format(new Date(datetime), 'yyyy-MM-dd HH:mm:ss')
}

Vue.prototype.$popupOpen = (url: string, width: number = 800, height: number = 800): void => {
	popup.open(url, width, height)
}

declare module 'vue/types/vue' {
  interface Vue {
    $qsUrl(requestUrl: string, params: object): string
	$qs(params: object): string
	$datetime(datetime: string): string
	$popupOpen(url: string, width: number, height: number): void
  }
}