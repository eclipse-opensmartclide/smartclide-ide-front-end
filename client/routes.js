
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '/imports/ui/components/Home'
import Register from "../imports/ui/components/Register";
import Workflows from "../imports/ui/components/Workflows";
import Services from "../imports/ui/components/Services";
import Deployments from "../imports/ui/components/Deployments";

const routes = [
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/workflows",
        name: "Workflows",
        component: Workflows
    },
    {
        path: "/services",
        name: 'Services',
        component: Services
    },
    {
        path: "/deployments",
        name: 'Deployments',
        component: Deployments
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
