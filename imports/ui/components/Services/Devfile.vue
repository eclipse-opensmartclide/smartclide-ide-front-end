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
    <b-card class="h-100" title="Devfile Editor" sub-title="Fine-tune the development environment of the service">
      <div class="devfile-editor mt-3">
        <div id="editor" class="monaco-editor"/>
      </div>
      <b-row class="my-3">
        <b-col>
          <b-button @click="resetButtonClicked" variant="danger">Reset</b-button>
        </b-col>
        <b-col class="text-right">
          <b-button @click="cancelButtonClicked">Cancel</b-button>
          <b-button @click="nextButtonClicked" variant="primary">
            {{ from === "Add" ? "Run" : from === "Edit" ? "Save" : "" }}
          </b-button>
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
    props: ["from", "workspaceID", "devfile"],
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
        // readOnly: true
      });
    },
    methods: {
      cancelButtonClicked(){
        router.push("/services");
      },
      resetButtonClicked(){
        this.devfileEditor.setValue(JSON_YAML.stringify(this.devfile));
      },
      nextButtonClicked(){
        if(this.devfileChanged())
          this.updateDevfile();
        else
            if(this.from === "Add")
              router.push(`/project/${this.workspaceID}`);
            else
              if(this.from === "Edit")
                router.push("/services");
      },
      devfileChanged(){
        return this.devfileEditor.getValue() !== this.devfileYAML;
      },
      updateDevfile(){
        Meteor.call("getWorkspace", this.$store.state.keycloak.idToken, this.workspaceID, (error, result) => {
          if(result){
            let status = result.status;
            let newDevfile = YAML_JSON.parse(this.devfileEditor.getValue());
            let workspace = result;
            workspace.devfile = newDevfile;

            Meteor.call("updateWorkspace", this.$store.state.keycloak.idToken, this.workspaceID, workspace,
                (error, result) => {
                  if(result){
                    if(status !== "STOPPING" && status !== "STOPPED")
                      Meteor.call("stopWorkspace", this.$store.state.keycloak.idToken, this.workspaceID);

                    if(this.from === "Add")
                      router.push(`/project/${this.workspaceID}`);
                    else
                      if(this.from === "Edit")
                        router.push("/services");
                  }
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
