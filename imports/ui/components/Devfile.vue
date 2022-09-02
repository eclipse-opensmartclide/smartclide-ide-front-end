<!-------------------------------------------------------------------------------
 - Copyright (c) 2022 Unparallel Innovation, Lda
 -
 - This program and the accompanying materials are made available under the
 - terms of the Eclipse Public License 2.0 which is available at
 - http://www.eclipse.org/legal/epl-2.0.
 -
 - SPDX-License-Identifier: EPL-2.0
 -------------------------------------------------------------------------------->

<template>
  <div class="m-4 h-75">
    <b-card class="h-100">
      <div id="editor"/>
    </b-card>
  </div>
</template>

<script>
  import * as monaco from "monaco-editor";
  import * as YAML from "json-to-pretty-yaml";

  export default {
    name: "Devfile",
    data(){
      return {
        devfileYAML: "",
        devfileJSON: {
          "schemaVersion": "2.1.0",
          "metadata": {
            "name": "java-lombok"
          },
          "components": [
            {
              "name": "tools",
              "container": {
                "image": "quay.io/devfile/universal-developer-image:ubi8-0e189d9",
                "memoryLimit": "3Gi",
                "endpoints": [
                  {
                    "exposure": "none",
                    "name": "debug",
                    "protocol": "tcp",
                    "targetPort": 5005
                  }
                ],
                "volumeMounts": [
                  {
                    "name": "m2",
                    "path": "/home/user/.m2"
                  }
                ]
              }
            },
            {
              "name": "m2",
              "volume": {
                "size": "1G"
              }
            }
          ],
          "commands": [
            {
              "id": "maven-build",
              "exec": {
                "component": "tools",
                "workingDir": "${PROJECT_SOURCE}",
                "commandLine": "mvn clean install",
                "group": {
                  "kind": "build",
                  "isDefault": true
                }
              }
            }
          ]
        }
      }
    },
    mounted(){
      monaco.editor.create(document.getElementById('editor'), {
        value: YAML.stringify(this.devfileJSON),
        language: 'yaml'
      });
    }
  }
</script>

<style scoped>
  #editor {
    position: absolute;
    top: 20px;
    right: 20px;
    bottom: 20px;
    left: 20px;
  }
</style>
