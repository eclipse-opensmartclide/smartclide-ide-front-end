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
      <iframe id="iframe" :src="workspaceURL"/>

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
      this.$store.state.context = 'project';
      this.$store.state.currentWorkspace = this.$route.params.id;
      this.openWorkspace();
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
      openWorkspace(){
        this.showLoading();
        const keycloakToken = this.$store.state.keycloak.idToken;
        const workspaceId = this.$store.state.currentWorkspace;

        if(workspaceId){
          Meteor.call("getWorkspace", keycloakToken, workspaceId, (error, result) => {
            if (result) {
              const workspace = result;
              const status = workspace.status;
              this.projectName = workspace?.devfile.metadata.name;

              switch (status) {
                case "STOPPED":
                  Meteor.call("startWorkspace", keycloakToken, workspaceId);
                  this.startWorkspaceTimeout = setTimeout(this.openWorkspace, 2000);
                  break;
                case "STOPPING":
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
                case "STARTING":
                  this.startWorkspaceTimeout = setTimeout(this.openWorkspace, 2000);
                  break;
                default:
                  break;
              }
            }
          });
        }
      },
      sendMessageToIframe(messageType){
        const iframe = document.getElementById("iframe");

        try {
          let message;

          switch (messageType){
            case messageTypes.TOKEN_INFO:
              const keycloak = this.$store.state.keycloak;
              message = buildMessage(messageType, keycloak.token);
              break;
            case messageTypes.TOKEN_REVOKE:
              message = buildMessage(messageType);
              break;
            default:
          }

          iframe.contentWindow.postMessage(message, "*");
          console.log("SENT", JSON.stringify(message, undefined, 4));
        }catch(error) {
          console.log(error);
        }
      },
      onReceiveMessage({data}){
        switch(data.type){
          case messageTypes.COMPONENT_HELLO:
            console.log("RECEIVED", JSON.stringify(data, undefined, 4));
            this.sendMessageToIframe(messageTypes.TOKEN_INFO);
            break;
          default:
            break;
        }
      },
      setupIframeCommunication(){
        window.addEventListener("message", this.onReceiveMessage);

        this.$store.state.keycloak.onAuthRefreshSuccess = () => {
          this.sendMessageToIframe(messageTypes.TOKEN_INFO);
        };
      },
      cancelIframeCommunication(){
        this.sendMessageToIframe(messageTypes.TOKEN_REVOKE)

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
  #iframe{
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
