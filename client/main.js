import Vue from 'vue'
import '../imports/ui/plugins'
import '../styles/variables.scss'
import {BootstrapVue, BootstrapVueIcons, ImagePlugin} from "bootstrap-vue"

import App from '../imports/ui/App.vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(ImagePlugin)

Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  })
})
