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
      <div class="devfile-editor">
        <div id="editor" class="monaco-editor"/>
      </div>
      <div class="my-3 float-right">
        <b-button @click="clicked">Next</b-button>
      </div>
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
        language: 'yaml',
        scrollBeyondLastLine: false
      });
    },
    methods: {
      clicked(){

      }
    }
  }
</script>

<style scoped>
  .devfile-editor{
    position: relative;
    width: 100%;
    height: calc(100% - 50px);
  }

  .monaco-editor {
    border: 1px solid #dee2e6;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
