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
    async request(configuration){
        let connector = await new SmartCLIDEBackendConnector("https://raw.githubusercontent.com/goncalorolo/swagger-json/main/smartCLIDE_DB_API_swagger.json");

        return await connector.call(configuration);
    },
    async exists(entity, id, token){
        let connector = await new SmartCLIDEBackendConnector("https://raw.githubusercontent.com/goncalorolo/swagger-json/main/smartCLIDE_DB_API_swagger.json");

        return await connector.exists(entity, id, token);
    }
});
