// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUi from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/index.css'
import Http from './plugins/http'

import App from './App'
import router from './router'

import moment from 'moment'

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(router)
Vue.use(Http)

// 处理日期格式的全局过滤器
Vue.filter('fmtDate',function(v) {
  return moment(v).format('YYYY-MM-DD')
});
// axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"
// Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
