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
  <div style="width: 200px">
    <template v-if="this.$store.state.context === 'project'">
      <QuickAccess/>
    </template>
    <b-nav class="navbar-nav h-100 bg-light" aria-orientation="vertical">
      <div v-for="category in this.$store.getters.getCategories">
        <div class="px-2 pt-3 font-weight-bold" v-if="category.category !== 'root'">
          {{category.category}}
        </div>
        <div class="px-3 py-2" v-for="option in category.options">
          <router-link class="text-decoration-none text-primary" :to="option.link" v-on:click.native="click(option)">
            {{ option.title }}
          </router-link>
        </div>
      </div>
    </b-nav>
  </div>
</template>

<script>
import QuickAccess from "./QuickAccess";

export default {
  name: "ContextBar",
  components: {
    QuickAccess
  },
  methods: {
    click(option) {
      if(option.title === "Close Project"){
        this.closeWorkspace()
      }
    },
    async closeWorkspace(){
      const keycloakToken = this.$store.state.keycloak.idToken;
      const workspaceId = this.$store.state.currentWorkspace;
      Meteor.call("stopWorkspace", keycloakToken, workspaceId);
      this.$store.state.currentWorkspace = undefined;
    }
  }
}
</script>

<style scoped>
.nav_container{
  width: 200px;
}
</style>
