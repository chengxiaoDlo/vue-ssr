// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iview from 'iview'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

Vue.use(iview)

export function createApp () {
  const router = createRouter()
  const store = createStore()
  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}



