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
    <b-card class="h-100" title="Devfile Editor" sub-title="Fine-tune the devfile of the workspace before starting it">
      <div class="devfile-editor mt-3">
        <div id="editor" class="monaco-editor"/>
      </div>
      <b-row class="my-3">
        <b-col>
          <b-button @click="resetButtonClicked" variant="danger">Reset</b-button>
        </b-col>
        <b-col class="text-right">
          <b-button @click="cancelButtonClicked">Cancel</b-button>
          <b-button @click="runButtonClicked" variant="primary">Run</b-button>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import monaco from "monaco-editor";
  import JSON_YAML from "json-to-pretty-yaml";
  import YAML_JSON from "yamljs";
  import router from "../../../../client/routes";

  export default {
    name: "Devfile",
    props: ["workspaceID", "devfile"],
    data(){
      return {
        devfileEditor: null,
        devfileYAML: JSON_YAML.stringify(this.devfile)
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
      cancelButtonClicked(){
        router.back();
      },
      resetButtonClicked(){
        this.devfileEditor.setValue(JSON_YAML.stringify(this.devfile));
      },
      runButtonClicked(){
        this.updateDevfile();
      },
      updateDevfile(){
        Meteor.call("getWorkspace", this.$store.state.keycloak.idToken, this.workspaceID, (error, result) => {
          if(result){
            let newDevfile = YAML_JSON.parse(this.devfileEditor.getValue());
            let workspace = result;

            workspace.devfile = newDevfile;

            Meteor.call("updateWorkspace", this.$store.state.keycloak.idToken, this.workspaceID, workspace,
              (error, result) => {
                if(result)
                  router.push(`/project/${this.workspaceID}`);
              }
            );
          }
        });
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
