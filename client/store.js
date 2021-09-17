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
                            { title: 'Statistics', link: '/settings/statistics' },
                            { title: 'Logs', link: '/settings/logs' },
                            { title: 'Appearance', link: '/settings/appearance' },
                            { title: 'Help', link: '/settings/help' }
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
                            { title: 'Profile', link: '/my-account/profile' },
                            { title: 'Team', link: '/my-account/team' },
                            { title: 'Sources', link: '/my-account/sources' },
                            { title: 'Credentials', link: '/my-account/credentials' }
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
    mutations: {},
    actions: {}
})
