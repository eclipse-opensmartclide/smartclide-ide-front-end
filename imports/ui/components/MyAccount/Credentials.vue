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
          content: [
            { type: "GitHub", url: 'https://github.com', username: 'userD', token: "**********" },
            { type: "GitLab", url: 'https://about.gitlab.com', username: 'userE', token: "**********" },
            { type: "Bitbucket", url: 'https://bitbucket.org', username: 'userF', token: "**********" },
            { type: "ProgrammableWeb", url: 'https://www.programmableweb.com', username: 'userG', token: "**********" },
            { type: "Docker", url: 'https://www.docker.com/', username: 'userH', token: "**********" }
          ]
        },
        "Deployment Platforms": {
          loaded: false,
          content: [
            { url: 'https://kubernetes.io', username: 'userI', token: "**********" }
          ],
        },
        "CI Managers": {
          loaded: false,
          content: [
            { type: "Jenkins", url: 'https://www.jenkins.io', username: 'userJ', token: "**********" },
            { type: "GitLab CI/CD", url: 'https://about.gitlab.com', username: 'userK', token: "**********" },
            { type: "GitHub Actions", url: 'https://github.com', username: 'userL', token: "**********" },
            { type: "Travis CI", url: 'https://www.travis-ci.com/', username: 'userM', token: "**********" }
          ]
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
            this.items["Git"].content = result?.body.map((item) => {
              return { type: item.type, url: item.url, username: item.username, token: "**********" };
            });
            this.items["Git"].loaded = true;
          }
        }
      );
    },
    fetchServiceRegistriesCredentials(){
      Meteor.call("request", { operationId: "getServiceRegistries", token: this.$store.state.keycloak.token},
        (error, result) => {
          if(result){
            this.items["Service Registries"].content = result?.body.map((item) => {
              return { type: item.type, url: item.url, username: item.username, token: "**********" };
            });
            this.items["Service Registries"].loaded = true;
          }
        }
      );
    },
    fetchDeploymentPlatformsCredentials(){
      Meteor.call("request", { operationId: "getDeploymentPlatforms", token: this.$store.state.keycloak.token},
        (error, result) => {
          if(result){
            this.items["Deployment Platforms"].content = result?.body.map((item) => {
              return { url: item.url, username: item.username, token: "**********" };
            });
            this.items["Deployment Platforms"].loaded = true;
          }
        }
      );
    },
    fetchCIManagersCredentials(){
      Meteor.call("request", { operationId: "getCiManagers", token: this.$store.state.keycloak.token},
        (error, result) => {
          if(result){
            this.items["CI Managers"].content = result?.body.map((item) => {
              return { type: item.type, url: item.url, username: item.username, token: "**********" };
            });
            this.items["CI Managers"].loaded = true;
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
    text-transform: uppercase;
  }

  /deep/ .custom_table tbody{
    text-transform: none;
  }
</style>
