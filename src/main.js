// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import store from './store'

Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(router)
Vue.use(ElementUI)
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.isAuth)) {
    if (window.localStorage.token) {
      next()
    } else if (to.path !== '/login') {
      let token = window.localStorage.token
      if (token === 'null' || token === '' || token === undefined) {
        next({path: '/login'})
        ElementUI.Message.warning('检测到您还未登录,请登录后操作！')
        console.log('检测到您还未登录,请登录后操作！')
      }
    }
  } else {
    next(true)
  }
})
new Vue({
  el: '#app',
  router,
  axios,
  store: store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
