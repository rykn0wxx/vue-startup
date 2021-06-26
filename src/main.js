/**
 * Vue
 * @library
 */
// Lib imports
import Vue from 'vue'

// Application plugins
import { sync } from 'vuex-router-sync'
import store from 'v~/store'
import router from 'v~/router'
import VueAxios from 'v~/plugins/vue-axios/axios'
import VueMeta from 'v~/plugins/vue-meta/meta'
import ClickOutside from 'v~/directives/click-outside'
import FocusElm from './directives/focus-elm'

import 'v~/components/global'

// Application imports
import 'v~/sass/app.scss'
import 'v~/assets/tailwind.css'

import App from './App.vue'

// Application implementation
Vue.config.productionTip = false
Vue.use(VueAxios)
Vue.use(VueMeta)
Vue.use(ClickOutside)
Vue.use(FocusElm)
sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
