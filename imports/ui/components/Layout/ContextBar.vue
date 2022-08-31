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
    <template v-if="$store.state.context === 'project'">
      <QuickAccess/>
    </template>
    <b-nav class="h-100 bg-light pt-2" vertical tabs>
      <div v-for="(category, categoryIdx) in $store.getters.getCategories">
        <div class="custom_inactive px-2 py-2" v-if="category.category !== 'root'">
          {{ category.category }}
        </div>
        <template v-if="category.category === 'root'">
          <div v-for="option in category.options">
            <b-nav-item
              link-classes="custom_inactive"
              active-class="custom_active"
              :to="option.link"
              @click="click(option)"
            >
              {{ option.title }}
            </b-nav-item>
          </div>
        </template>
        <template v-else>
          <div v-for="option in category.options" class="px-3 py-2">
            <router-link
              class="text-decoration-none"
              :to="option.link"
              @click.native="click(option)"
            >
              {{ option.title }}
            </router-link>
          </div>
        </template>
        <div v-if="categoryIdx !== $store.getters.getCategories.length - 1">
          <hr/>
        </div>
      </div>
    </b-nav>
  </div>
</template>

<script>
  import QuickAccess from "../QuickAccess";

  export default {
    name: "ContextBar",
    components: {
      QuickAccess
    },
    methods: {
      click(option) {
        if(option.title === "Close Project"){
          this.closeWorkspace();
        }
      },
      async closeWorkspace(){
        const keycloakToken = this.$store.state.keycloak.idToken;
        const workspaceId = this.$store.state.currentWorkspace;

        Meteor.call("getWorkspace", keycloakToken, workspaceId, (error, result) => {
          if(result){
            const status = result.status;

            if(status !== "STOPPING" && status !== "STOPPED")
              Meteor.call("stopWorkspace", keycloakToken, workspaceId);
          }
        });

        this.$store.state.currentWorkspace = undefined;
      }
    }
  }
</script>

<style scoped>
  .custom_inactive{
    color: gray!important;
  }
  .custom_active{
    color: var(--primary)!important;
  }
</style>
