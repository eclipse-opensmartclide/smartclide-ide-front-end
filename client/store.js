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
                            { title: 'Credentials', link: '/credentials' },
                            { title: 'Service Registries', link: '/service-registries' }
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
        ],
        apis: {
            backend: {
                endpoints: {
                    getUsers: {
                        operationID: "getusers"
                    },
                    addUsers: {
                        operationID: "postusers"
                    },
                    getUserByID: {
                        operationID: "getUserItem",
                        parameters: { userID: "userId" },
                    },
                    editUser: {
                        operationID: "patchUserItem",
                        parameters: { userID: "userId" }
                    },
                    deleteUser: {
                        operationID: "deleteUsertItem",
                        parameters: { userID: "userId" }
                    },

                    getTeams: {
                        operationID: "get_teams",
                        parameters: { userID: "user_id" }
                    },
                    addTeams: {
                        operationID: "post_teams"
                    },
                    getTeamByID: {
                        operationID: "getTeamItem",
                        parameters: { teamID: "teamId" }
                    },
                    editTeam: {
                        operationID: "patchTeamItem",
                        parameters: { teamID: "teamId" }
                    },
                    deleteTeam: {
                        operationID: "deleteTeamtItem",
                        parameters: { teamID: "teamId" }
                    },

                    getCIManagers: {
                        operationID: "getCiManagers",
                        parameters: { userID: "user_id" }
                    },
                    addCIManagers: {
                        operationID: "postCiManagers"
                    },
                    getCIManagerByID: {
                        operationID: "getCiManagerItem",
                        parameters: { ciManagerID: "ciManagerId" }
                    },
                    editCIManager: {
                        operationID: "patchCiManagerItem",
                        parameters: { ciManagerID: "ciManagerId" }
                    },
                    deleteCIManager: {
                        operationID: "deleteCiManagerItem",
                        parameters: { ciManagerID: "ciManagerId" }
                    },

                    getDeploymentPlatforms: {
                        operationID: "getDeploymentPlatforms",
                        parameters: { userID: "user_id" }
                    },
                    addDeploymentPlatforms: {
                        operationID: "postDeploymentPlatforms"
                    },
                    getDeploymentPlatformByID: {
                        operationID: "getDeploymentPlatform",
                        parameters: { deploymentPlatformID: "deploymentPlatformId" }
                    },
                    editDeploymentPlatform: {
                        operationID: "patchDeploymentPlatformItem",
                        parameters: { deploymentPlatformID: "deploymentPlatformId" }
                    },
                    deleteDeploymentPlatform: {
                        operationID: "deleteDeploymentPlatformItem",
                        parameters: { deploymentPlatformID: "deploymentPlatformId" }
                    },

                    getServiceRegistries: {
                        operationID: "getServiceRegistries",
                        parameters: { userID: "user_id" }
                    },
                    addServiceRegistries: {
                        operationID: "postServiceRegistries"
                    },
                    getServiceRegistryByID: {
                        operationID: "getServiceRegistry",
                        parameters: { serviceRegistryID: "serviceRegistryId" }
                    },
                    editServiceRegistry: {
                        operationID: "patchServiceRegistryItem",
                        parameters: { serviceRegistryID: "serviceRegistryId" }
                    },
                    deleteServiceRegistry: {
                        operationID: "deleteServiceRegistryItem",
                        parameters: { serviceRegistryID: "serviceRegistryId" }
                    },

                    getGitCredentials: {
                        operationID: "getGitCredentials",
                        parameters: { userID: "user_id" }
                    },
                    addGitCredentials: {
                        operationID: "postGitCredentials"
                    },
                    getGitCredentialByID: {
                        operationID: "getGitCredentialsItem",
                        parameters: { gitCredentialsID: "gitCredentialsId" }
                    },
                    editGitCredential: {
                        operationID: "patchGitCredentialsItem",
                        parameters: { gitCredentialsID: "gitCredentialsId" }
                    },
                    deleteGitCredential: {
                        operationID: "deleteGitCredentialsItem",
                        parameters: { gitCredentialsID: "gitCredentialsId" }
                    },

                    getServices: {
                        operationID: "getservices",
                        parameters: {
                            userID: "user_id",
                            registryID: "registry_id",
                            workspaceID: "workspace_id",
                            licence: "licence",
                            framework: "framework",
                            minStars: "min_stars",
                            maxStars: "max_stars",
                            minForks: "min_forks",
                            maxForks: "max_forks",
                            minWatchers: "min_watchers",
                            maxWatchers: "max_watchers",
                            URL: "url",
                            deployable: "deployable",
                            createdBefore: "created_before",
                            createdAfter: "created_after",
                            updatedBefore: "updated_before",
                            updatedAfter: "updated_after"
                        }
                    },
                    addServices: {
                        operationID: "postservices"
                    },
                    addServicesInBulk: {
                        operationID: "postServicesBulk"
                    },
                    getServiceByID: {
                        operationID: "getServiceItem",
                        parameters: { serviceID: "serviceId" }
                    },
                    editService: {
                        operationID: "patchServiceItem",
                        parameters: { serviceID: "serviceId" }
                    },
                    deleteService: {
                        operationID: "deleteServicetItem",
                        parameters: { serviceID: "serviceId" }
                    },

                    getWorkflows: {
                        operationID: "getWorkflows",
                        parameters: { userID: "user_id" }
                    },
                    addWorkflows: {
                        operationID: "postWorkflows"
                    },
                    getWorkflowByID: {
                        operationID: "getWorkflowItem",
                        parameters: { workflowID: "workflowId" }
                    },
                    editWorkflow: {
                        operationID: "patchWorkflowItem",
                        parameters: { workflowID: "workflowId" }
                    },
                    deleteWorkflow: {
                        operationID: "deleteWorkflowItem",
                        parameters: { workflowID: "workflowId" }
                    },

                    getDeployments: {
                        operationID: "getDeployments",
                        parameters: {
                            userID: "user_id",
                            serviceID: "service_id",
                            workflowID: "workflow_id"
                        }
                    },
                    addDeployments: {
                        operationID: "postDeployments"
                    },
                    getDeploymentByID: {
                        operationID: "getDeploymentItem",
                        parameters: { deploymentID: "deploymentId" }
                    },
                    editDeployment: {
                        operationID: "patchDeploymentItem",
                        parameters: { deploymentID: "deploymentId" }
                    },
                    deleteDeployment: {
                        operationID: "deleteDeploymentItem",
                        parameters: { deploymentID: "deploymentId" }
                    }
                }
            }
        }
    },
    getters: {
        getCategories: state => {
            return state.contextBars.filter(contextBar => contextBar.name === state.context)[0].categories;
        }
    },
    actions: {}
})
