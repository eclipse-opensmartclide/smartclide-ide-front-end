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
import axios from "axios";

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
    // Che REST API
    async getLatestWorkflows(){
        const connector = new Connector(process.env.CHE_URL);

        return await connector.getMostRecentWorkflows();
    },
    async getLatestServices(){
        const connector = new Connector(process.env.CHE_URL);

        return await connector.getMostRecentServices();
    },
    async getLatestDeployments(){
        const connector = new Connector(process.env.CHE_URL);

        return await connector.getMostRecentDeployments();
    },
    async createWorkspace(keycloakToken, devfile){
        const connector = new Connector(process.env.CHE_URL);

        return await connector.createWorkspace(keycloakToken, devfile);
    },
    async getWorkspaces(keycloakToken){
        const connector = new Connector(process.env.CHE_URL);

        return await connector.getWorkspaces(keycloakToken);
    },
    async getLatestWorkspaces(keycloakToken, length){
        const connector = new Connector(process.env.CHE_URL);

        return await connector.getLatestWorkspaces(keycloakToken, length);
    },
    async getWorkspace(keycloakToken, workspaceID){
        const connector = new Connector(process.env.CHE_URL);

        return connector.getWorkspace(keycloakToken, workspaceID);
    },
    async startWorkspace(keycloakToken, workspaceID){
        const connector = new Connector(process.env.CHE_URL);

        await connector.startWorkspace(keycloakToken, workspaceID);
    },
    async updateWorkspace(keycloakToken, workspaceID, data){
        const connector = new Connector(process.env.CHE_URL);

        return await connector.updateWorkspace(keycloakToken, workspaceID, data);
    },
    async stopWorkspace(keycloakToken, workspaceID){
        const connector = new Connector(process.env.CHE_URL);

        await connector.stopWorkspace(keycloakToken, workspaceID);
    },
    async deleteWorkspace(keycloakToken, workspaceID){
        const connector = new Connector(process.env.CHE_URL);

        await connector.deleteWorkspace(keycloakToken, workspaceID);
    },
    // SmartCLIDE Backend APIs
    async request(configuration){
        let connector = await new SmartCLIDEBackendConnector("https://raw.githubusercontent.com/goncalorolo/swagger-json/main/smartCLIDE_DB_API_swagger.json");

        return await connector.call(configuration);
    },
    async exists(entity, id, keycloakToken){
        let connector = await new SmartCLIDEBackendConnector("https://raw.githubusercontent.com/goncalorolo/swagger-json/main/smartCLIDE_DB_API_swagger.json");

        return await connector.exists(entity, id, keycloakToken);
    },
    async createRepository(keycloakToken, inputHeaders, inputParameters){
        const configuration = {
            method: 'POST',
            url: `${process.env.SMARTCLIDE_BACKEND_URL}/service-creation/createStructure`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${keycloakToken}`
            }
        }

        Object.assign(configuration.headers, inputHeaders);

        try{
            const res = await axios(configuration);
            return res.data;
        } catch(e){
            throw e;
        }
    },
    async importRepository(keycloakToken, inputHeaders, inputParameters){
        const configuration = {
            method: 'POST',
            url: `${process.env.SMARTCLIDE_BACKEND_URL}/external-project-importer/importProject`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${keycloakToken}`
            },
            params: inputParameters
        }

        Object.assign(configuration.headers, inputHeaders);

        try{
            const res = await axios(configuration);
            return res.status;
        } catch(e){
            throw e;
        }
    },
    async getDevfile(keycloakToken, devfileURL){
        const configuration = {
            method: 'GET',
            url: devfileURL,
            headers: {
                'Accept': 'application/json'
            }
        }

        try{
            const res = await axios(configuration);
            return res.data;
        } catch(e){
            throw e;
        }
    },
    async evaluateAPSInput(keycloakToken, responsesArray){
        const url = `${process.env.SMARTCLIDE_BACKEND_URL}/architectural-patterns/evaluation`;

        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${keycloakToken}`,
            }
        };

        try{
            const res = await axios.post(url, responsesArray, config);
            return res.data;
        } catch(e){
            throw e;
        }
    },
    // Keycloak
    getKeycloakConfiguration(){
        return {
            url: process.env.KEYCLOAK_URL,
            realm: process.env.KEYCLOAK_REALM,
            clientId: process.env.KEYCLOAK_CLIENT_ID
        }
    }
});
