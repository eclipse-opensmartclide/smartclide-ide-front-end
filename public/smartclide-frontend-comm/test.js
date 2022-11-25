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

import {messageTypes, buildMessage} from "./index.js";

try{
    let data = buildMessage(messageTypes.TOKEN_INFO, "token")
    console.log(JSON.stringify(data, undefined, 4))
}catch (e) {
    console.log(e)
}
