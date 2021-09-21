import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from "../imports/ui/components/_old/Register";
import Workflows from "../imports/ui/components/Workflows";
import Services from "../imports/ui/components/Services";
import Deployments from "../imports/ui/components/Deployments";
import Settings from "../imports/ui/components/Settings";
import Statistics from "../imports/ui/components/Settings/Statistics";
import Logs from "../imports/ui/components/Settings/Logs";
import Appearance from "../imports/ui/components/Settings/Appearance";
import Help from "../imports/ui/components/Settings/Help";
import MyAccount from "../imports/ui/components/MyAccount";
import Profile from "../imports/ui/components/MyAccount/Profile";
import Team from "../imports/ui/components/MyAccount/Team";
import Sources from "../imports/ui/components/MyAccount/Sources";
import Credentials from "../imports/ui/components/MyAccount/Credentials";
import Dashboard from "../imports/ui/components/Dashboard";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard
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
    },
    {
        path: "/deployments",
        name: 'Deployments',
        component: Deployments
    },
    {
        path: "/settings",
        name: 'Settings',
        component: Settings,
        children: [
            {
                path: "statistics",
                name: 'Statistics',
                component: Statistics
            },
            {
                path: "logs",
                name: 'Logs',
                component: Logs
            },
            {
                path: "appearance",
                name: 'Appearance',
                component: Appearance
            },
            {
                path: "help",
                name: 'Help',
                component: Help
            }
        ]
    },
    {
        path: "/my-account",
        name: 'MyAccount',
        component: MyAccount,
        children: [
            {
                path: "profile",
                name: 'Profile',
                component: Profile
            },
            {
                path: "team",
                name: 'Team',
                component: Team
            },
            {
                path: "sources",
                name: 'Sources',
                component: Sources
            },
            {
                path: "credentials",
                name: 'Credentials',
                component: Credentials
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
