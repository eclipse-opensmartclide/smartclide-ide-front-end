export enum messageTypes {
    "COMM_START",
    "COMM_END",
    "COMM_START_REPLY",
    "KEYCLOAK_TOKEN"
}

export function buildMessage(messageType: number, messageContent?: string): object;
