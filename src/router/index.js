import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'

Vue.use(Router)

const Root = () => System.import('../pages/list.vue')
const Edit = () => System.import('../pages/edit.vue')
const User = () => System.import('../pages/users/index.vue')
const Location = () => System.import('../pages/location/list.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: App,
        children: [
          {
            path: '/',
            component: Root
          },
          {
            path: 'edit',
            component: Edit
          },
          {
            path: 'users',
            component: User
          },
          {
            path: 'location',
            component: Location
          }
        ]
      }
    ]
  })
}

