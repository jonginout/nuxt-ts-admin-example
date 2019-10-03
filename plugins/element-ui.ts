import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ko'
import 'element-ui/lib/theme-chalk/index.css'
import '../assets/scss/plugin-scss/element-ui.scss'

Vue.use(Element, { locale, size: 'mini' })

Vue.prototype.$notifySuccess = (message: string = '처리완료') => {
  Vue.prototype.$notify({ type: 'success', title: '성공', message })
}

Vue.prototype.$notifyError = (message: string = '에러 발생 TC팀에게 문의해주세요.') => {
  Vue.prototype.$notify({ type: 'error', title: '실패', message })
}

Vue.prototype.$messageBox = (message: string) => {
  Vue.prototype.$message({ message, center: true })
}

declare module 'vue/types/vue' {
  interface Vue {
    $notifySuccess(message: string): void
    $notifyError(message: string): void
    $messageBox(message: string): void
  }
}
