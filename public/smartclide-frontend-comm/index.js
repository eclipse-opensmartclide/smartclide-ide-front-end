/**
 * @license
 * Copyright (C) 2022 Unparallel Innovation
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

export const messageTypes = {
    "COMM_START": 0,
    "COMM_END": 1,
    "COMM_START_REPLY": 2,
    "KEYCLOAK_TOKEN": 3,
};

export function buildMessage(messageType, messageContent){
    let message = {
        type: messageType
    };

    switch (messageType){
        case messageTypes.COMM_START:
            break;
        case messageTypes.COMM_END:
            break;
        case messageTypes.COMM_START_REPLY:
            if(!messageContent.token || !messageContent.serviceID)
                throw new Error("Message type COMM_START_REPLY requires 'token' and 'serviceID' fields");
            message.content = messageContent;
            break;
        case messageTypes.KEYCLOAK_TOKEN:
            if(!messageContent.token)
                throw new Error("Message type TOKEN requires 'token' field");
            message.content = messageContent;
            break;
        default:
            throw new Error("Invalid message type");
    }

    return message;
}
