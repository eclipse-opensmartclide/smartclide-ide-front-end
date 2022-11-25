export enum messageTypes {
    "TOKEN_INFO",
    "COMPONENT_HELLO",
    "TOKEN_REVOKE"
}

export function buildMessage(messageType: number, messageContent?: string): object;
