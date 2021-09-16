import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        context: "main",
        contextBars: [
            {
                name: 'main',
                options: [
                    { title: 'Workflows', link: '/workflows' },
                    { title: 'Services', link: '/services' },
                    { title: 'Deployments', link: '/deployments' }
                ]
            },
            {
                name: 'settings',
                options: [
                    { title: 'Statistics', link: '/statistics' },
                    { title: 'Logs', link: '/logs' },
                    { title: 'Appearance', link: '/appearance' },
                    { title: 'Help', link: '/help' }
                ]
            },
            {
                name: 'my-account',
                options: [
                    { title: 'Profile', link: '/profile' },
                    { title: 'Team', link: '/team' },
                    { title: 'Sources', link: '/sources' },
                    { title: 'Credentials', link: '/credentials' }
                ]
            },
        ]
    },
    getters: {
        getOptions: state => {
            return state.contextBars.filter(contextBar => contextBar.name === state.context)[0].options;
        }
    },
    mutations: {},
    actions: {}
})
