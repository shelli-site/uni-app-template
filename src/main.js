import Vue from 'vue'
import uView from 'uview-ui'
import store from './store'
import filters from './filters'
import App from './App'

import '@/style/tailwind.css'
import '@/style/index.scss'
// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from './common/http.interceptor.js'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
  playing: false,
  playTime: 0,
  formatedPlayTime: '00:00:00',
}

App.mpType = 'app'
Vue.use(uView)
Vue.use(filters)

const app = new Vue({
  store,
  ...App,
})
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)
app.$mount()
