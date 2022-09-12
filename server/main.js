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
    async getLatestWorkflows(){
        const connector = new Connector();

        return await connector.getMostRecentWorkflows();
    },
    async getLatestServices(){
        const connector = new Connector();

        return await connector.getMostRecentServices();
    },
    async getLatestDeployments(){
        const connector = new Connector();

        return await connector.getMostRecentDeployments();
    },
    async getWorkspaces(keycloakToken){
        const connector = new Connector();

        return await connector.getWorkspaces(keycloakToken);
    },
    async getLatestWorkspaces(keycloakToken, length){
        const connector = new Connector();

        return await connector.getLatestWorkspaces(keycloakToken, length);
    },
    async getWorkspace(keycloakToken, workspaceID){
        const connector = new Connector();

        return connector.getWorkspace(keycloakToken, workspaceID);
    },
    async startWorkspace(keycloakToken, workspaceID){
        const connector = new Connector();

        await connector.startWorkspace(keycloakToken, workspaceID);
    },
    async updateWorkspace(keycloakToken, workspaceID, data){
        const connector = new Connector();

        return await connector.updateWorkspace(keycloakToken, workspaceID, data);
    },
    async stopWorkspace(keycloakToken, workspaceID){
        const connector = new Connector();

        await connector.stopWorkspace(keycloakToken, workspaceID);
    },
    async request(configuration){
        let connector = await new SmartCLIDEBackendConnector("https://raw.githubusercontent.com/goncalorolo/swagger-json/main/smartCLIDE_DB_API_swagger.json");

        return await connector.call(configuration);
    },
    async exists(entity, id, keycloakToken){
        let connector = await new SmartCLIDEBackendConnector("https://raw.githubusercontent.com/goncalorolo/swagger-json/main/smartCLIDE_DB_API_swagger.json");

        return await connector.exists(entity, id, keycloakToken);
    }
});
