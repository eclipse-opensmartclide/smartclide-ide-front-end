import Vue from 'vue'

import '../imports/ui/plugins'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from '../imports/ui/App.vue'

Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  })
})
