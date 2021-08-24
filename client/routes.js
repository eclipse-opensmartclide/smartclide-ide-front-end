
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '/imports/ui/components/Home'
import Register from "../imports/ui/components/Register";
import Workflows from "../imports/ui/components/Workflows";
import Services from "../imports/ui/components/Services";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
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
    }
]

const router = new VueRouter({
    routes
})

export default router
