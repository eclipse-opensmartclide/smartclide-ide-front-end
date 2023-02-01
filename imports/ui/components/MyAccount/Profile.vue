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
  <div class="d-flex h-100">
    <iframe class="border-0 w-100" :src="keycloakPageURL"/>
  </div>
</template>

<script>
  export default {
    name: "Profile",
    data(){
      return {
        keycloakPageURL: null, // https://keycloak-smartclide-che.che.smartclide.eu/auth/realms/che/account
      }
    },
    mounted(){
      this.$store.state.context = 'my-account';
      this.getKeycloakPageURL();
    },
    methods: {
      getKeycloakPageURL(){
        Meteor.call("getKeycloakConfiguration", (error, result) => {
          if(result)
            this.keycloakPageURL = `${result["auth-server-url"]}/realms/${result.realm}/account`;
        });
      }
    }
  }
</script>

<style scoped>

</style>
