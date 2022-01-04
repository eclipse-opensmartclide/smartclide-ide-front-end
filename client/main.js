/********************************************************************************
 * Copyright (c) 2021 Unparallel Innovation, Lda
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/

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
