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
      <iframe id="jbpm-iframe" src="https://jbpm.dev.smartclide.eu/business-central/kie-wb.jsp"/>
    </div>
  </div>
</template>

<script>
  import router from "../../../../client/routes";
  import {messageTypes, buildMessage} from "@unparallel/smartclide-frontend-comm";

  export default {
    name: "Workflows",
    beforeMount(){
      this.auxWindow = window.open("https://jbpm.dev.smartclide.eu/business-central/kie-wb.jsp");

      setTimeout(() => {
        this.auxWindow.close();
        router.push("/workflows");
      }, 2000);
    },
    mounted(){
      this.$store.state.context = 'home';
      this.setupIframeCommunication();
    },
    data(){
      return{
        auxWindow: null,
        placeholder: null
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
  #jbpm-iframe{
    border: 0;
    height: 100%;
    width: 100%;
  }
</style>
