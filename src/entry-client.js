import 'es6-promise/auto'
import { app, store, router } from './main'

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  console.log('iiin')
  router.beforeResolve((to, from, next) => {
    console.log('in')
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    store.commit('toggleLoading')
    console.log('loading')
    Promise.all(activated.map(c => {
      if (c.preFetch) {
        return c.preFetch(store)
      }
    })).then(() => {
      store.commit('toggleLoading')
      next()
    }).catch(next)
  })
  app.$mount('#app')
})