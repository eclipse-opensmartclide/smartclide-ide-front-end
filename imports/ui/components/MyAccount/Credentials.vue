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
  <div style="margin: 10px">
    <smart-widget-grid
      :colNum="1"
      :maxRows="4"
      :layout.sync="cards"
      :margin="[25, 25]"
      autoSize
      isStatic
    >
      <smart-widget
        class="title text-primary"
        v-for="(table, index) in tables"
        :slot="cards[index].i"
        :title="table.title"
        :loading="!table.loaded"
        :padding="[10,10]"
      >
        <BTable
          class="custom_table"
          :items="table.content"
          :fields="table.fields"
        />
        <BButton class="add_button">Add new</BButton>
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
        { i: 0, x: 0, y: 0, w: 12, h: 5 },
        { i: 1, x: 0, y: 11, w: 12, h: 5 },
        { i: 2, x: 0, y: 24, w: 12, h: 5 },
        { i: 3, x: 0, y: 36, w: 12, h: 5 }
      ],
      tables: [
        {
          title: "Git",
          fields: ["type", "URL", "username", "token"],
          content: [],
          loaded: false
        },
        {
          title: "Service Registries",
          fields: ["type", "URL", "username", "token"],
          content: [],
          loaded: false
        },
        {
          title: "Deployment Platforms",
          fields: ["URL", "username", "token"],
          content: [],
          loaded: false
        },
        {
          title: "CI Managers",
          fields: ["type", "URL", "username", "token"],
          content: [],
          loaded: false
        }
      ]
    };
  },
  mounted(){
    this.$store.state.context = 'my-account';
    this.fetchCredentials();
  },
  methods: {
    fetchCredentials(){
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

            Object.assign(this.tables[0],{ loaded: true, content });
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

            Object.assign(this.tables[1],{ loaded: true, content });
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

            Object.assign(this.tables[2],{ loaded: true, content });
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

            Object.assign(this.tables[3],{ loaded: true, content });
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

  /deep/ .custom_table{
    margin-bottom: 10px;
  }

  /deep/ .custom_table thead{
    background: #E5EEFD;
    text-align: center;
    text-transform: capitalize;
  }

  /deep/ .custom_table tbody{
    text-transform: none;
  }

  .add_button{
    float: right;
  }
</style>
