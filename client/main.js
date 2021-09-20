import Vue from 'vue'
import VueMeteorTracker from 'vue-meteor-tracker'
import VueSmartWidget from 'vue-smart-widget'
import {BootstrapVue, BootstrapVueIcons, ImagePlugin} from "bootstrap-vue"

import '../styles/variables.scss'
import App from '../imports/ui/App.vue'
import router from './routes'
import store from './store'

Vue.use(VueMeteorTracker)
Vue.use(VueSmartWidget)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(ImagePlugin)

Meteor.startup(() => {
  new Vue({
    store,
    router,
    el: '#app',
    ...App
  })
})
