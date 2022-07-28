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
  <div class="d-flex flex-column mx-4 mt-4">
      <smart-widget
        class="title text-primary mb-4"
        v-for="(table, index) in tables"
        :slot="cards[index].i"
        :title="table.title"
        :padding="[0,0]"
      >
        <div class="d-flex flex-row">
          <b-form-input
            class="mt-1 ml-1 mb-1 bg-light"
            placeholder="Type to search..."
            type="search"
            v-model="table.filter"
            :disabled="!table.loaded"
          />
          <div class="d-flex align-items-center mx-2 ">
            <b-icon-plus-circle role="button" variant="primary" font-scale="1.5" @click="add"/>
          </div>
        </div>
        <div class="d-flex flex-row">
          <b-table
            class="custom-table mx-1 mb-0 text-center"
            bordered
            :items="table.content"
            :fields="table.fields"
            :filter="table.filter"
            :busy="!table.loaded"
            :per-page="table.perPage"
            :current-page="table.currentPage"
            @filtered="(filteredItems)=>(onFiltered(filteredItems, index))"
            :empty-text="`No ${table.title} credentials were configured yet.`"
            :empty-filtered-text="`No ${table.title} credentials matched your search criteria.`"
            show-empty
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                Loading...
              </div>
            </template>
            <template #cell(actions)="data">
              <div class="text-center">
                <b-icon-pencil style="cursor: pointer" variant="primary" class="mx-2" font-scale="1.2" @click="edit"/>
                <b-icon-trash style="cursor: pointer" variant="primary" class="mx-2" font-scale="1.2" @click="remove"/>
              </div>
            </template>
          </b-table>
        </div>
        <div>
          <b-pagination
            class="my-1"
            align="center"
            v-model="table.currentPage"
            :total-rows="table.totalRows"
            :per-page="table.perPage"
            :disabled="!table.loaded"
          />
        </div>
      </smart-widget>
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
          fields: ["type", "URL", "username", "actions"],
          content: [],
          loaded: false,
          filter: null,
          totalRows: null,
          perPage: 3,
          currentPage: 1
        },
        {
          title: "Service Registries",
          fields: ["type", "URL", "username", "actions"],
          content: [],
          loaded: false,
          filter: null,
          totalRows: null,
          perPage: 3,
          currentPage: 1
        },
        {
          title: "Deployment Platforms",
          fields: ["URL", "username", "actions"],
          content: [],
          loaded: false,
          filter: null,
          totalRows: null,
          perPage: 3,
          currentPage: 1
        },
        {
          title: "CI Managers",
          fields: ["type", "URL", "username", "actions"],
          content: [],
          loaded: false,
          filter: null,
          totalRows: null,
          perPage: 3,
          currentPage: 1
        }
      ]
    };
  },
  mounted(){
    this.$store.state.context = 'my-account';
    this.fetchContent();
  },
  methods: {
    fetchContent(){
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
              return { type: item.type, URL: item.url, username: item.username };
            });

            Object.assign(this.tables[0],{ loaded: true, content, totalRows: content.length });
          }
        }
      );
    },
    fetchServiceRegistriesCredentials(){
      Meteor.call("request", { operationId: "getServiceRegistries", token: this.$store.state.keycloak.token},
        (error, result) => {
          if(result){
            let content = result?.body.map((item) => {
              return { type: item.type, URL: item.url, username: item.username };
            });

            Object.assign(this.tables[1],{ loaded: true, content, totalRows: content.length });
          }
        }
      );
    },
    fetchDeploymentPlatformsCredentials(){
      Meteor.call("request", { operationId: "getDeploymentPlatforms", token: this.$store.state.keycloak.token},
        (error, result) => {
          if(result){
            let content = result?.body.map((item) => {
              return { URL: item.url, username: item.username };
            });

            Object.assign(this.tables[2],{ loaded: true, content, totalRows: content.length });
          }
        }
      );
    },
    fetchCIManagersCredentials(){
      Meteor.call("request", { operationId: "getCiManagers", token: this.$store.state.keycloak.token},
        (error, result) => {
          if(result){
            let content = result?.body.map((item) => {
              return { type: item.type, URL: item.url, username: item.username };
            });

            Object.assign(this.tables[3],{ loaded: true, content, totalRows: content.length });
          }
        }
      );
    },
    onFiltered(filteredItems, tableIndex){
      this.tables[tableIndex].totalRows = filteredItems.length;
      this.tables[tableIndex].currentPage = 1;
    },
    add(){
      console.log("Add");
    },
    edit(){
      console.log("Edit");
    },
    remove(){
      console.log("Remove");
    }
  }
}
</script>

<style scoped>
  .smartwidget{
    border-radius: 10px;
    height: fit-content;
  }

  /deep/ .widget-header{
    background: var(--light);
    height: 37px!important;
    line-height: 37px!important;
    padding-left: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  /deep/ .custom-table thead{
    background: var(--info);
    text-align: center;
    text-transform: capitalize;
  }
</style>
