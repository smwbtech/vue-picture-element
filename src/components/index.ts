import VuePictureElement from './VuePictureElement'
import { VueConstructor } from 'vue'

interface CustomComponent extends VueConstructor {
  installed: boolean
}

// eslint-disable-next-line
declare global {
  namespace NodeJS {
    interface Global {
      document: Document
      window: Window
      navigator: Navigator
      Vue: object
    }
  }
}

let GlobalVue: any

// Объявление функции установки, выполняемой Vue.use()
export function install(Vue: CustomComponent): void {
  if (install.installed) return
  install.installed = true
  Vue.component('VuePictureElement', VuePictureElement)
}

install.installed = false

// Создание значения модуля для Vue.use()
const plugin = {
  install
}

// Автоматическая установка, когда vue найден (например в браузере с помощью тега <script>)
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

// Экспорт компонента, для использования в качестве модуля (npm/webpack/etc.)
export default VuePictureElement
