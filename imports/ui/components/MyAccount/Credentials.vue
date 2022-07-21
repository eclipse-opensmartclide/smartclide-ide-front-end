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
  <div>
    <smart-widget-grid isStatic :layout.sync="cards" :margin="[25, 25]" autoSize>
      <smart-widget class="title text-primary" v-for="card in cards" :slot="card.i" :title="card.category" :loading="!items[card.category].loaded" :padding="[0,0]">
        <BTable class="custom_table" hover bordered :items="items[card.category].content"/>
      </smart-widget>
    </smart-widget-grid>
  </div>
</template>

<script>
export default {
  name: "Credentials",
  data(){
    return {
      cards: [
        { x: 0, y: 0, w: 12, h: 5, i: 0, category: 'Git'},
        { x: 0, y: 11, w: 12, h: 5, i: 1, category: 'Service Registries'},
        { x: 0, y: 24, w: 12, h: 5, i: 2, category: 'Deployment Platforms'},
        { x: 0, y: 36, w: 12, h: 5, i: 3, category: 'CI Managers'}
      ],
      items: {
        "Git": {
          loaded: false,
          content: []
        },
        "Service Registries": {
          loaded: false,
          content: []
        },
        "Deployment Platforms": {
          loaded: false,
          content: [],
        },
        "CI Managers": {
          loaded: false,
          content: []
        }
      }
    };
  },
  mounted(){
    this.$store.state.context = 'my-account';
    this.fetchCredentials();
  },
  methods: {
    async fetchCredentials(){
      this.fetchGitCredentials();
      this.fetchServiceRegistriesCredentials();
      this.fetchDeploymentPlatformsCredentials();
      this.fetchCIManagersCredentials();
    },
    fetchGitCredentials(){
      Meteor.call("request", { operationId: "getGitCredentials", token: this.$store.state.keycloak.token},
        (error, result) => {
          if(result){
            let content = result?.body.map((item) => {
              return { type: item.type, URL: item.url, username: item.username, token: "**********" };
            });

            if(content.length === 0)
              content = [{ type: null, URL: null, username: null, token: null }];

            this.items["Git"] = { loaded: true, content };
          }
        }
      );
    },
    fetchServiceRegistriesCredentials(){
      Meteor.call("request", { operationId: "getServiceRegistries", token: this.$store.state.keycloak.token},
        (error, result) => {
          if(result){
            let content = result?.body.map((item) => {
              return { type: item.type, URL: item.url, username: item.username, token: "**********" };
            });

            if(content.length === 0)
              content = [{ type: null, URL: null, username: null, token: null }];

            this.items["Service Registries"] = { loaded: true, content };
          }
        }
      );
    },
    fetchDeploymentPlatformsCredentials(){
      Meteor.call("request", { operationId: "getDeploymentPlatforms", token: this.$store.state.keycloak.token},
        (error, result) => {
          if(result){
            let content = result?.body.map((item) => {
              return { URL: item.url, username: item.username, token: "**********"};
            });

            if(content.length === 0)
              content = [{ URL: null, username: null, token: null }];

            this.items["Deployment Platforms"] = { loaded: true, content };
          }
        }
      );
    },
    fetchCIManagersCredentials(){
      Meteor.call("request", { operationId: "getCiManagers", token: this.$store.state.keycloak.token},
        (error, result) => {
          if(result){
            let content = result?.body.map((item) => {
              return { type: item.type, URL: item.url, username: item.username, token: "**********" };
            });

            if(content.length === 0)
              content = [{ type: null, URL: null, username: null, token: null }];

            this.items["CI Managers"] = { loaded: true, content };
          }
        }
      );
    }
  }
}
</script>

<style scoped>
  .title{
    text-transform: capitalize;
  }

  .smartwidget{
    border-radius: 10px;
    height: fit-content;
  }

  /deep/ .widget-header{
    background: #F8FAFB;
    height: 37px!important;
    line-height: 37px!important;
    padding-left: 10px;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  /deep/ .custom_table thead{
    background: #E5EEFD;
    text-align: center;
    text-transform: capitalize;
  }

  /deep/ .custom_table tbody{
    text-transform: none;
  }
</style>
