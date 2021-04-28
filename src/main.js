import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'

// import './assets/font/iconfont.css'
// import './components/login/font/iconfont.css'
import './assets/font/font_2504959_5z467ze72gm.css'

Vue.config.productionTip = false

// axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
