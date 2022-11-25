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
    "TOKEN_INFO": 0,
    "COMPONENT_HELLO": 1,
    "TOKEN_REVOKE": 2
};

export function buildMessage(messageType, messageContent){
    let message = {
        type: messageType
    };

    switch (messageType){
        case messageTypes.TOKEN_INFO:
            if(!messageContent)
                throw new Error("Message type TOKEN_INFO requires non-null content");
            message.content = messageContent;
            break;
        case messageTypes.COMPONENT_HELLO:
            break;
        case messageTypes.TOKEN_REVOKE:
            break;
        default:
            throw new Error("Invalid message type");
    }

    return message;
}
