/********************************************************************************
 * Copyright (c) 2021 Unparallel Innovation, Lda
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/

import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        context: "home",
        contextBars: [
           {
                name: 'home',
                categories: [
                    {
                        category: "root",
                        options: [
                            { title: 'Dashboard', link: '/dashboard' },
                            { title: 'Workflows', link: '/workflows' },
                            { title: 'Services', link: '/services' },
                            { title: 'Deployments', link: '/deployments' }
                        ]
                    }
                ]
            },
            {
                name: 'settings',
                categories: [
                    {
                        category: "root",
                        options: [
                            { title: 'Statistics', link: '/statistics' },
                            { title: 'Logs', link: '/logs' },
                            { title: 'Appearance', link: '/appearance' },
                            { title: 'Help', link: '/help' },
                            { title: 'About', link: '/about' }
                        ]
                    }
                ]
            },
            {
                name: 'my-account',
                categories: [
                    {
                        category: "root",
                        options: [
                            { title: 'Profile', link: '/profile' },
                            { title: 'Team', link: '/team' },
                            { title: 'Service Registries', link: '/service-registries' },
                            { title: 'Credentials', link: '/credentials' }
                        ]
                    }
                ]
            },
            {
                name: 'project',
                categories: [
                    {
                        category: "Testing",
                        options: [
                            { title: 'New Test', link: '' },
                            { title: 'Define Pipelines', link: '' },
                            { title: 'Check Pipelines', link: '' },
                            { title: 'Check Security Analysis', link: '' }
                        ]
                    },
                    {
                        category: "Deployment",
                        options: [
                            { title: 'New Deployment', link: '' },
                            { title: 'Check Deployments', link: '' },
                            { title: 'Cost Calculator', link: '' }
                        ]
                    },
                    {
                        category: "Project",
                        options: [
                            { title: 'Edit Project Settings', link: '' },
                            { title: 'Close Project', link: '/dashboard' }
                        ]
                    }
                ]
            },
        ]
    },
    getters: {
        getCategories: state => {
            return state.contextBars.filter(contextBar => contextBar.name === state.context)[0].categories;
        }
    },
    actions: {}
})
