<!-------------------------------------------------------------------------------
 - Copyright (c) 2021 Unparallel Innovation, Lda
 -
 - This program and the accompanying materials are made available under the
 - terms of the Eclipse Public License 2.0 which is available at
 - http://www.eclipse.org/legal/epl-2.0.
 -
 - SPDX-License-Identifier: EPL-2.0
 -------------------------------------------------------------------------------->

<template>
  <div class="d-flex flex-column h-100">
    <div class="name text-primary">{{projectName}}</div>

    <div class="d-flex h-100">
      <iframe id="che-theia-iframe" :src="workspaceURL"/>

      <div class="loading d-flex justify-content-center align-items-center flex-column bg-white">
        <b-spinner class="spinner-border text-primary" style="width: 5rem; height: 5rem;" role="status"/>
        <div class="text-primary">
          <br>Loading... Please wait
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {messageTypes, buildMessage} from "@unparallel/smartclide-frontend-comm";

  export default {
    name: "Project",
    mounted(){
      this.$store.state.context = "project";
      this.$store.state.currentWorkspace = this.$route.params.id;
      this.openWorkspace();
      this.fetchOtherWorkspaces();
      this.setupIframeCommunication();
    },
    data(){
      return{
        projectName: '',
        workspaceURL: '',
        startWorkspaceTimeout: undefined,
      }
    },
    beforeRouteLeave(to, from, next){
      clearTimeout(this.startWorkspaceTimeout);
      this.cancelIframeCommunication();
      this.cleanOtherWorkspaces();
      next();
    },
    methods:{
      showLoading(){
        $(".loading").removeClass("d-none");
        $(".loading").addClass("d-flex");
      },
      hideLoading(){
        $(".loading").removeClass("d-flex");
        $(".loading").addClass("d-none");
      },
      fetchOtherWorkspaces(){
        Meteor.call("getLatestWorkspaces", this.$store.state.keycloak.idToken, 5, (error, result) => {
          if(result){
            const contextBarIndex = this.$store.state.contextBars.findIndex(bar => bar.name === "project");
            const categoryIndex = this.$store.state.contextBars[contextBarIndex].categories.findIndex(cat => cat.name === "Other workspaces");

            this.$store.state.contextBars[contextBarIndex].categories[categoryIndex].options = [];

            result.forEach(workspace => {
              if(workspace.id !== this.$store.state.currentWorkspace)
                this.$store.state.contextBars[contextBarIndex].categories[categoryIndex].options.push({
                  title: workspace.devfile.metadata.name,
                  link: `/project/${workspace.id}`
                });
            });
          }
        });
      },
      cleanOtherWorkspaces(){
        const contextBarIndex = this.$store.state.contextBars.findIndex(bar => bar.name === "project");
        const categoryIndex = this.$store.state.contextBars[contextBarIndex].categories.findIndex(cat => cat.name === "Other workspaces");

        this.$store.state.contextBars[contextBarIndex].categories[categoryIndex].options = [];
      },
      openWorkspace(){
        this.showLoading();
        const keycloakToken = this.$store.state.keycloak.idToken;
        const workspaceId = this.$store.state.currentWorkspace;

        if(workspaceId){
          Meteor.call("getWorkspace", keycloakToken, workspaceId, (error, result) => {
            if(result){
              const workspace = result;
              const status = workspace.status;
              this.projectName = workspace?.devfile.metadata.name;

              switch(status){
                case "STOPPED":
                  Meteor.call("startWorkspace", keycloakToken, workspaceId);
                case "STOPPING":
                case "STARTING":
                  this.startWorkspaceTimeout = setTimeout(this.openWorkspace, 2000);
                  break;
                case "RUNNING":
                  const machines = workspace.runtime.machines;
                  Object.keys(machines).forEach(key => {
                    if (key.includes("theia-ide")) {
                      this.workspaceURL = machines[key].servers.theia.url;
                      this.hideLoading();
                    }
                  });
                  break;
                default:
                  break;
              }
            }
          });
        }
      },
      sendMessageToIframe(messageType){
        const iframe = document.getElementById("che-theia-iframe");

        try {
          let message;

          switch (messageType){
            case messageTypes.COMM_START_REPLY:
              Meteor.call("request", {
                  operationID: this.$store.state.apis.backend.endpoints.getServices.operationID,
                  parameters: JSON.parse(`{
                    "${this.$store.state.apis.backend.endpoints.getServices.parameters.workspaceID}": "${this.$store.state.currentWorkspace}"
                  }`),
                  token: this.$store.state.keycloak.idToken
                },
                (error, result) => {
                  if(result){
                    message = buildMessage(messageType, {
                      token: this.$store.state.keycloak.token,
                      serviceID: result?.body[0].id
                    });
                    iframe.contentWindow.postMessage(message, "*");
                    // console.log("SENT", JSON.stringify(message, undefined, 4));
                  }
                }
              );
              break;
            case messageTypes.KEYCLOAK_TOKEN:
              message = buildMessage(messageType, {
                token: this.$store.state.keycloak.token
              });
              iframe.contentWindow.postMessage(message, "*");
              // console.log("SENT", JSON.stringify(message, undefined, 4));
              break;
            case messageTypes.COMM_END:
              message = buildMessage(messageType);
              iframe.contentWindow.postMessage(message, "*");
              // console.log("SENT", JSON.stringify(message, undefined, 4));
              break;
            default:
          }
        }catch(error) {
          console.log(error);
        }
      },
      onReceiveMessage({data}){
        switch(data.type){
          case messageTypes.COMM_START:
            // console.log("RECEIVED", JSON.stringify(data, undefined, 4));
            this.sendMessageToIframe(messageTypes.COMM_START_REPLY);
            break;
          default:
            break;
        }
      },
      setupIframeCommunication(){
        window.addEventListener("message", this.onReceiveMessage);

        this.$store.state.keycloak.onAuthRefreshSuccess = () => {
          this.sendMessageToIframe(messageTypes.KEYCLOAK_TOKEN);
        };
      },
      cancelIframeCommunication(){
        this.sendMessageToIframe(messageTypes.COMM_END)

        window.removeEventListener("message", this.onReceiveMessage);

        this.$store.state.keycloak.onAuthRefreshSuccess = null;
      }
    }
  }
</script>

<style scoped>
  .name {
    background: #E5EEFD;
    font-weight: bold;
    height: 28px;
    display: flex;
    align-items: center;
    padding-left: 15px;
  }

  #che-theia-iframe{
    border: 0;
    height: 100%;
    width: 100%;
  }

  .loading {
    z-index: 9;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }

  .spinner-border{
    animation: 1.75s linear infinite spinner-border;
  }
</style>
