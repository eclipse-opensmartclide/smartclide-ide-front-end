/********************************************************************************
 * Copyright (c) 2021 Unparallel Innovation, Lda
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/

import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";
import { Connector } from '@unparallel/smartclide-che-rest-client';
import SmartCLIDEBackendConnector from "@unparallel/smartclide-backend-connector";

const users = [
    {
        username: 'Admin',
        password: 'Admin'
    }
];

Meteor.startup(() => {
    users.forEach(user => {
        if (!Accounts.findUserByUsername(user.username)) {
            Accounts.createUser(user);
        }
    });
});

Meteor.methods({
    async getWorkspaces(keycloak){
        const connector = new Connector();
        const workflows = await connector.getMostRecentWorkflows();
        const services = await connector.getMostRecentServices();
        const deployments = await connector.getMostRecentDeployments();
        const recent = await connector.getRecentWorkspaces(keycloak.token, 3);

        return { workflows, services, deployments, recent };
    },
    async getWorkspacesWithType(keycloak, type){
        const connector = new Connector();

        return connector.getWorkspacesWithType(keycloak.token, type);
    },
    async getWorkspace(keycloak, workspaceId){
        const connector = new Connector();

        return connector.getWorkspace(keycloak.token, workspaceId);
    },
    async startWorkspace(keycloak, workspaceId){
        const connector = new Connector();

        await connector.startWorkspace(keycloak.token, workspaceId);
    },
    async stopWorkspace(keycloak, workspaceId){
        const connector = new Connector();

        await connector.stopWorkspace(keycloak.token, workspaceId);
    },
    async request(configuration){
        let connector = await new SmartCLIDEBackendConnector("https://raw.githubusercontent.com/goncalorolo/swagger-json/main/smartCLIDE_DB_API_swagger.json");

        return await connector.call(configuration);
    },
    async exists(entity, id, token){
        let connector = await new SmartCLIDEBackendConnector("https://raw.githubusercontent.com/goncalorolo/swagger-json/main/smartCLIDE_DB_API_swagger.json");

        return await connector.exists(entity, id, token);
    }
});
