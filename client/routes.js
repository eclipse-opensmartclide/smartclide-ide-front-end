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

import Dashboard from "../imports/ui/components/Home/Dashboard";
import Deployments from "../imports/ui/components/Home/Deployments";
import Services from "../imports/ui/components/Home/Services";
import ServiceCreation from "../imports/ui/components/Services/ServiceCreation";
// import Devfile from "../imports/ui/components/Services/Devfile";
import Workflows from "../imports/ui/components/Home/Workflows";

import CheTheia from "../imports/ui/components/CheTheia/CheTheia";

import Credentials from "../imports/ui/components/MyAccount/Credentials";
import Profile from "../imports/ui/components/MyAccount/Profile";
import ServiceRegistries from "../imports/ui/components/MyAccount/ServiceRegistries";
import Team from "../imports/ui/components/MyAccount/Team";

import About from "../imports/ui/components/Settings/About";
import Appearance from "../imports/ui/components/Settings/Appearance";
import Help from "../imports/ui/components/Settings/Help";
import Logs from "../imports/ui/components/Settings/Logs";
import Statistics from "../imports/ui/components/Settings/Statistics";

import NotImplemented from "../imports/ui/components/NotImplemented";

Vue.use(VueRouter)

const routes = [
    {
        path: "/notImplemented",
        name: "NotImplemented",
        component: NotImplemented
    },
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard
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
        path: "/services/serviceCreation",
        name: "ServiceCreation",
        component: ServiceCreation
    },
    {
        path: "/deployments",
        name: 'Deployments',
        component: Deployments
    },
    {
        path: '/project/:id',
        name: 'Project',
        component: CheTheia
    },
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
    },
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
        name: 'ServiceRegistries',
        component: ServiceRegistries
    },
    {
        path: "/credentials",
        name: 'Credentials',
        component: Credentials
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
