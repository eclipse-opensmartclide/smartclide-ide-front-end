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
  <div class="mx-4 mt-4">
    <b-card no-body>
      <b-tabs
        card
        active-nav-item-class="bg-primary text-white"
      >
        <b-tab
          v-for="(table, index) in tables"
          :title="table.title"
        >
          <div class="d-flex flex-row align-items-center pb-3">
            <b-form-input
                class="search_bar"
                placeholder="Type to search..."
                type="search"
                v-model="table.filter"
                :disabled="!table.loaded"
            />
            <b-pagination
              class="mx-3 mb-0"
              size="sm"
              limit="3"
              v-model="table.currentPage"
              :total-rows="table.totalRows"
              :per-page="table.perPage"
              :disabled="table.disablePagination"
            />
            <b-icon-plus-circle role="button" variant="primary" font-scale="1.5" @click="add"/>
          </div>
          <div class="d-flex flex-row">
            <b-table
                class="custom-table text-center"
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
                  <b-icon-pencil role="button" variant="primary" class="mx-2" font-scale="1.2" @click="edit"/>
                  <b-icon-trash role="button" variant="primary" class="mx-2" font-scale="1.2" @click="remove"/>
                </div>
              </template>
            </b-table>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Credentials",
  data(){
    return {
      tables: [
        {
          title: "Git",
          fields: ["type", "URL", "username", "actions"],
          content: [],
          loaded: false,
          filter: null,
          totalRows: null,
          perPage: 10,
          currentPage: 1,
          disablePagination: null
        },
        {
          title: "Service Registries",
          fields: ["type", "URL", "username", "actions"],
          content: [],
          loaded: false,
          filter: null,
          totalRows: null,
          perPage: 10,
          currentPage: 1,
          disablePagination: null
        },
        {
          title: "Deployment Platforms",
          fields: ["URL", "username", "actions"],
          content: [],
          loaded: false,
          filter: null,
          totalRows: null,
          perPage: 10,
          currentPage: 1,
          disablePagination: null
        },
        {
          title: "CI Managers",
          fields: ["type", "URL", "username", "actions"],
          content: [],
          loaded: false,
          filter: null,
          totalRows: null,
          perPage: 10,
          currentPage: 1,
          disablePagination: null
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

            Object.assign(this.tables[0],{ loaded: true, content, totalRows: content.length, disablePagination: !content.length });
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

            Object.assign(this.tables[1],{ loaded: true, content, totalRows: content.length, disablePagination: !content.length });
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

            Object.assign(this.tables[2],{ loaded: true, content, totalRows: content.length, disablePagination: !content.length });
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

            Object.assign(this.tables[3],{ loaded: true, content, totalRows: content.length, disablePagination: !content.length });
          }
        }
      );
    },
    onFiltered(filteredItems, tableIndex){
      this.tables[tableIndex].disablePagination = !filteredItems.length;
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
  .search_bar{
    border-color: #dee2e6;
  }

  /deep/ .custom-table thead{
    background: var(--info);
    text-align: center;
    text-transform: capitalize;
  }
</style>
