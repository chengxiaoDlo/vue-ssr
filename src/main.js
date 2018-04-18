// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iview from 'iview'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

Vue.use(iview)

sync(store, router)

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  render: h => h(App)
})

export { app, router, store }