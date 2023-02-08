# Overview

This module builds a message according to the protocol established for the communication between the SmartCLIDE IDE
frontend and its components, with the following structure:

```json
{
  "type": "...",
  "content": {
    "key1": "value1",
    ...
  }
}
```

The current version provides:

- Object with the supported types of messages 

| Message Type | Direction | Description |
|--------------|-------------------------|-------------|
| COMM_START | Component -> Frontend | Message used to inform the SmartCLIDE IDE frontend that a new component was loaded |
| COMM_END | Frontend -> Component| Message used to inform the components that no further requests will be accepted |
| COMM_START_REPLY | Frontend -> Component | Reply to the _COMM_START_ message with the information that needs to be sent on startup (_token_ and _serviceID_ fields) |
| KEYCLOAK_TOKEN | Frontend -> Component | Used to send a token to the iframe, in the _token_ field of the message's content |

- Method to build the message with the given type and content

The upcoming features will include:

- Support to new types of messages

# How to use?

## Add as a dependency to the package.json

```json
{
  "dependencies": {
    "@unparallel/smartclide-frontend-comm": "latest"
  }
}
```

## Install dependencies

```shell
npm install
```

## Import the module

```javascript
import {messageTypes, buildMessage} from "@unparallel/smartclide-frontend-comm";
```

## Build the message

```javascript
// To inform the SmartCLIDE IDE frontend that a new component was loaded
let componentLoadedMessage = buildMessage(messageTypes.COMM_START);

// To inform the components that the communication channel will be closed
let cancelCommunicationMessage = buildMessage(messageTypes.COMM_END);

// To reply to the COMM_START message
let replyToStartMessage = buildMessage(messageTypes.COMM_START_REPLY, { token: "...", serviceID: "..." });

// To send a token to the iframe
let sendTokenMessage = buildMessage(messageTypes.KEYCLOAK_TOKEN, { token: "..." });
```

## Example with window.postMessage()

### Sender (Component)
```javascript
let message = buildMessage(messageTypes.COMM_START);

// Send the message to the parent
window.parent.postMessage(message, "*");
```

### Receiver (Frontend)
```javascript
// When the parent receives the message
window.addEventListener("message", ({data}) => {
    switch(data.type){
        case messageTypes.COMM_START:
            // Reply with a COMM_START_REPLY type message
            break;
        // ...
    }
});
```

# License
[Eclipse Public License 2.0](https://choosealicense.com/licenses/epl-2.0/)
