# Overview

This module builds a message according to the protocol established for the communication between the SmartCLIDE IDE
frontend and its components, with the following structure:

```json
{
  "type": "...",
  "content": "..."
}
```

The current version provides:

- Object with the supported types of messages 

| Message Type | Direction | Description |
|--------------|-------------------------|-------------|
| TOKEN_INFO | Frontend -> Component | Used to send a token to the iframe, in the message's content |
| COMPONENT_HELLO | Component -> Frontend | Message used to inform the SmartCLIDE IDE frontend that a new component was loaded |
| TOKEN_REVOKE | Frontend -> Component| Message used to inform the components that no further requests will be accepted |

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
// To send a token to the iframe
let sendTokenMessage = buildMessage(messageTypes.TOKEN_INFO, messageContent);

// To inform the SmartCLIDE IDE frontend that a new component was loaded
let componentLoadedMessage = buildMessage(messageTypes.COMPONENT_HELLO);

// To inform the components that the communication channel will be closed
let cancelCommunicationMessage = buildMessage(messageTypes.TOKEN_REVOKE);
```

## Example with window.postMessage()

### Sender (Component)
```javascript
let message = buildMessage(messageTypes.COMPONENT_HELLO);

// Send the message to the parent
window.parent.postMessage(message, "*");
```

### Receiver (Frontend)
```javascript
// When the parent receives the message
window.addEventListener("message", ({data}) => {
    switch(data.type){
        case messageTypes.COMPONENT_HELLO:
            // Reply with the token
            break;
        // ...
    }
});
```

# License
[Eclipse Public License 2.0](https://choosealicense.com/licenses/epl-2.0/)
