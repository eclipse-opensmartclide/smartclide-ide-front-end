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
    <div class="d-flex h-100">
      <iframe id="jbpm-iframe" :src="jBPMURL"/>
    </div>
  </div>
</template>

<script>
  import {messageTypes, buildMessage} from "@unparallel/smartclide-frontend-comm";

  export default {
    name: "Workflows",
    mounted(){
      this.$store.state.context = "home";
      this.setupIframeCommunication();
    },
    data(){
      return{
        jBPMURL: Meteor.settings.public.JBPM_URL
      }
    },
    beforeRouteLeave(to, from, next){
      this.cancelIframeCommunication();
      next();
    },
    methods:{
      sendMessageToIframe(messageType){
        const iframe = document.getElementById("jbpm-iframe");

        try {
          let message;

          switch (messageType){
            case messageTypes.COMM_START_REPLY:
              message = buildMessage(messageType, {
                token: keycloak.token
              });
              break;
            case messageTypes.KEYCLOAK_TOKEN:
              const keycloak = this.$store.state.keycloak;
              message = buildMessage(messageType, {
                token: keycloak.token
              });
              break;
            case messageTypes.COMM_END:
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
          case messageTypes.COMM_START:
            console.log("RECEIVED", JSON.stringify(data, undefined, 4));
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
  #jbpm-iframe{
    border: 0;
    height: 100%;
    width: 100%;
  }
</style>
