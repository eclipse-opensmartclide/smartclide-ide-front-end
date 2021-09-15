import Vue from 'vue'
import Vuex from 'vuex'
import '../imports/ui/plugins'
import '../styles/variables.scss'
import {BootstrapVue, BootstrapVueIcons, ImagePlugin} from "bootstrap-vue"
import App from '../imports/ui/App.vue'

import router from './routes'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(ImagePlugin)

let store = new Vuex.Store({
  state: {
    context: "main"
  },
  getters: {},
  mutations: {},
  actions: {}
})

Meteor.startup(() => {
  new Vue({
    store,
    router,
    el: '#app',
    ...App
  })
})
