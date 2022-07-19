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
  <div class="d-flex flex-column">
    <div class="name text-primary">{{this.name}}</div>

    <div class="d-flex h-100">
      <iframe id="iframe" :src="workspaceUrl"/>

      <div class="loading d-flex justify-content-center align-items-center flex-column">
        <b-spinner class="spinner-border text-primary" style="width: 5rem; height: 5rem;" role="status"/>
        <div class="text-primary">
          <br>Loading... Please wait
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "../utils"
import {messageTypes, buildMessage} from "@unparallel/smartclide-frontend-comm";

export default {
  name: "Project",
  mounted(){
    this.$store.state.context = 'project';
    this.$store.state.currentWorkspace = this.$route.params.id;
    this.getDetails();
    this.setupIframeCommunication();
  },
  data(){
    return{
      name: '',
      workspaceUrl: '',
      workspaceLoaded: undefined
    }
  },
  beforeRouteLeave(to, from, next){
    this.cancelIframeCommunication();
    next();
  },
  beforeDestroy () {
    clearInterval(this.workspaceLoaded);
  },
  methods:{
    async getDetails(){
      $(".loading").removeClass("d-none")
      $(".loading").addClass("d-flex")
      const keycloak = this.$store.state.keycloak
      const workspaceId = this.$store.state.currentWorkspace

      const ws = await utils.getWorkspace(keycloak, workspaceId)
      this.name = ws.devfile.metadata.name

      if (ws.status === "STOPPED") {
        await utils.startWorkspace(keycloak, workspaceId)
        await this.fetchWorkspaceUrl(keycloak, workspaceId)
      } else if (ws.status === "RUNNING") {
        const machines = ws.runtime.machines
        for (key in machines) {
          if (key.includes("theia-ide")) {
            this.workspaceUrl = machines[key].servers.theia.url
            $(".loading").removeClass("d-flex")
            $(".loading").addClass("d-none")
            break
          }
        }
      }
      else{
        await this.fetchWorkspaceUrl(keycloak, workspaceId)
      }
    },
    fetchWorkspaceUrl(keycloak, workspaceId){
      // wait until get the server theia url
      this.workspaceLoaded = setInterval( () => {
        utils.getWorkspace(keycloak, workspaceId).then(ws => {
          this.name = ws.devfile.metadata.name
          if(ws.status === "RUNNING"){
            const machines = ws.runtime.machines
            for(key in machines){
              if(key.includes("theia-ide")){
                this.workspaceUrl = machines[key].servers.theia.url
                $(".loading").removeClass("d-flex")
                $(".loading").addClass("d-none")
                break
              }
            }
            clearInterval(this.workspaceLoaded)
          }
        })
      }, 5000);
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
      }catch (e) {
        console.log(e);
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
    text-transform: capitalize;
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
    bottom: 28px;
  }
  .spinner-border{
    animation: 1.75s linear infinite spinner-border;
  }
</style>
