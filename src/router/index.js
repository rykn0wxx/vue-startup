import Vue from 'vue'
import VueRouter from 'vue-router'

import { scrollBehavior, routeGenerator } from 'v~/services/utilities'
import paths from 'v~/router/paths'

const APP_ROUTES = paths.map(path => routeGenerator(path)).concat([{ path: '*', redirect: '/home' }])

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: APP_ROUTES,
  scrollBehavior,
  linkActiveClass: 'active-vue-route'
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.isPublic)
  const isSignedIn = router.app.$store.getters['user/signedIn'] || true
  const isProd = process.env.NODE_ENV === 'production'
  if (isProd) {
    if (!isPublic && !isSignedIn) {
      next({
        name: 'Signin',
        path: '/signin'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
