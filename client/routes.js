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
import VueRouter from 'vue-router'
import Workflows from "../imports/ui/components/Workflows";
import Services from "../imports/ui/components/Services";
import Deployments from "../imports/ui/components/Deployments";
import Settings from "../imports/ui/components/Settings";
import Statistics from "../imports/ui/components/Settings/Statistics";
import Logs from "../imports/ui/components/Settings/Logs";
import Appearance from "../imports/ui/components/Settings/Appearance";
import Help from "../imports/ui/components/Settings/Help";
import About from "../imports/ui/components/Settings/About";
import MyAccount from "../imports/ui/components/MyAccount";
import Profile from "../imports/ui/components/MyAccount/Profile";
import Team from "../imports/ui/components/MyAccount/Team";
import ServiceRegistries from "../imports/ui/components/MyAccount/ServiceRegistries";
import Credentials from "../imports/ui/components/MyAccount/Credentials";
import Dashboard from "../imports/ui/components/Dashboard";
import Project from "../imports/ui/components/Project";
import NotImplemented from "../imports/ui/components/NotImplemented";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard
    },
    {
        path: "/notImplemented",
        name: "Not Implemented",
        component: NotImplemented
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
                path: "/statistics",
                name: 'Statistics',
                component: Statistics
            },
            {
                path: "/logs",
                name: 'Logs',
                component: Logs
            },
            {
                path: "/appearance",
                name: 'Appearance',
                component: Appearance
            },
            {
                path: "/help",
                name: 'Help',
                component: Help
            },
            {
                path: "/about",
                name: 'About',
                component: About
            }
        ]
    },
    {
        path: "/my-account",
        name: 'MyAccount',
        component: MyAccount,
        children: [
            {
                path: "/profile",
                name: 'Profile',
                component: Profile
            },
            {
                path: "/team",
                name: 'Team',
                component: Team
            },
            {
                path: "/service-registries",
                name: 'Service Registries',
                component: ServiceRegistries
            },
            {
                path: "/credentials",
                name: 'Credentials',
                component: Credentials
            },
        ]
    },
    {
        path: '/project/:id',
        name: 'Project',
        component: Project
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
