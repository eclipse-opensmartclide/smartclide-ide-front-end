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
  beforeDestroy () {
    clearInterval(this.workspaceLoaded);
    this.cancelIframeCommunication();
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
    sendTokenToIframe(){
      const keycloak = this.$store.state.keycloak;
      const iframe = document.getElementById("iframe");

      try {
        const message = buildMessage(messageTypes.TOKEN_INFO, keycloak.idToken)
        iframe.contentWindow.postMessage(message, "*");
        console.log("SENT", message.content);
      }catch (e) {
        console.log(e);
      }
    },
    setupIframeCommunication(){
      window.addEventListener("message", ({data}) => {
        switch(data.type){
          case messageTypes.COMPONENT_HELLO:
            console.log(JSON.stringify(data, undefined, 4));
            this.sendTokenToIframe();
            break;
          default:
        }
      });

      this.$store.state.keycloak.onAuthRefreshSuccess = () => {
        this.sendTokenToIframe();
      };
    },
    cancelIframeCommunication(){
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
