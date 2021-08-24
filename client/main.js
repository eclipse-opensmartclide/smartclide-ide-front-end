import Vue from 'vue'
import '../imports/ui/plugins'
import '../styles/variables.scss'
import {BootstrapVue, BootstrapVueIcons, ImagePlugin} from "bootstrap-vue"
import App from '../imports/ui/App.vue'
import Home from '../imports/ui/components/Home'

import router from './routes'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(ImagePlugin)


// Meteor.startup(() => {
//   new Vue({
//     router,
//     render: (h) => h(App),
//   }).$mount('#app');
// });
Meteor.startup(() => {
  new Vue({
    router,
    el: '#app',
    ...App
  })
})
