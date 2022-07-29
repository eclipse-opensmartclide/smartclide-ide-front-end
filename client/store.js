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
        context: "main",
        contextBars: [
           {
                name: 'main',
                categories: [
                    {
                        category: "root",
                        options: [
                            { title: 'Workflows', link: '/notImplemented' },
                            { title: 'Services', link: '/notImplemented' },
                            { title: 'Deployments', link: '/notImplemented' }
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
                            { title: 'Statistics', link: '/notImplemented' },
                            { title: 'Logs', link: '/notImplemented' },
                            { title: 'Appearance', link: '/notImplemented' },
                            { title: 'Help', link: '/notImplemented' },
                            { title: 'About', link: '/notImplemented' }
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
                            { title: 'Team', link: '/notImplemented' },
                            { title: 'Service Registries', link: '/notImplemented' },
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
                            { title: 'Close Project', link: '/' }
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
