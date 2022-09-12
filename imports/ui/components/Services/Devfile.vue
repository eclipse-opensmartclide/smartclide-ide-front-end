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
    <b-card class="h-100" title="Devfile Editor" sub-title="View the devfile of the workspace before starting it">
      <div class="devfile-editor mt-3">
        <div id="editor" class="monaco-editor"/>
      </div>
      <b-row class="my-3">
        <b-col>
          <b-button @click="backButtonClicked">Back</b-button>
        </b-col>
<!--        <b-col class="text-center">-->
<!--          <b-button @click="resetButtonClicked" variant="primary">Reset</b-button>-->
<!--        </b-col>-->
        <b-col class="text-right">
          <b-button @click="runButtonClicked" variant="primary">Run</b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import monaco from "monaco-editor";
  import YAML from "json-to-pretty-yaml";
  import router from "../../../../client/routes";

  export default {
    name: "Devfile",
    props: ["workspaceID", "devfile"],
    data(){
      return {
        devfileEditor: null,
        devfileYAML: YAML.stringify(this.devfile)
      }
    },
    mounted(){
      this.devfileEditor = monaco.editor.create(document.getElementById('editor'), {
        value: this.devfileYAML,
        language: 'yaml',
        scrollBeyondLastLine: false,
        readOnly: true
      });
    },
    methods: {
      backButtonClicked(){
        router.back();
      },
      resetButtonClicked(){
        this.devfileEditor.setValue(YAML.stringify(this.devfile));
      },
      runButtonClicked(){
        router.push(`/project/${this.workspaceID}`);
      }
    }
  }
</script>

<style scoped>
  .devfile-editor{
    position: relative;
    width: 100%;
    height: calc(100% - 120px);

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
