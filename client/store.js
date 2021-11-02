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
                            // { title: 'Statistics', link: '/settings/statistics' },
                            // { title: 'Logs', link: '/settings/logs' },
                            // { title: 'Appearance', link: '/settings/appearance' },
                            // { title: 'Help', link: '/settings/help' },
                            // { title: 'About', link: '/settings/about' }
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
                            // { title: 'Profile', link: '/my-account/profile' },
                            // { title: 'Team', link: '/my-account/team' },
                            // { title: 'Sources', link: '/my-account/sources' },
                            // { title: 'Credentials', link: '/my-account/credentials' }
                            { title: 'Profile', link: '/notImplemented' },
                            { title: 'Team', link: '/notImplemented' },
                            { title: 'Sources', link: '/notImplemented' },
                            { title: 'Credentials', link: '/notImplemented' }
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
