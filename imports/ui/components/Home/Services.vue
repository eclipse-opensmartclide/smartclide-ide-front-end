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
    <b-card>
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
        <b-icon-plus-circle role="button" variant="primary" font-scale="1.5" @click="plusIconClicked"/>
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
            @filtered="onFiltered"
            :empty-text="`No ${table.title} were created yet.`"
            :empty-filtered-text="`No ${table.title} matched your search criteria.`"
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
              <b-icon-play role="button" variant="primary" class="mx-2" font-scale="1.2" @click="playIconClicked(data.item)"/>
              <b-icon-pencil role="button" variant="primary" class="mx-2" font-scale="1.2" @click="pencilIconClicked(data.item)"/>
              <b-icon-trash role="button" variant="primary" class="mx-2" font-scale="1.2" @click="trashIconClicked(data.item)"/>
            </div>
          </template>
        </b-table>
      </div>
    </b-card>
  </div>
</template>

<script>
  import router from "../../../../client/routes";

  export default {
    name: "Services",
    data(){
      return {
        table: {
          title: "Services",
          fields: ["name", "description", "licence", "updated_at", "actions"],
          content: [],
          loaded: false,
          filter: null,
          totalRows: null,
          perPage: 10,
          currentPage: 1,
          disablePagination: null,
          operationIds: {
            get: "getservices",
            add: "postservices",
            edit: "patchServiceItem",
            delete: "deleteServicetItem" // THIS OPERATION ID HAS A TYPO
          }
        },
        currentRowId: null
      };
    },
    mounted(){
      this.$store.state.context = 'home';
      this.fetchServices();
    },
    methods: {
      fetchServices(){
        Meteor.call("request", {
            operationId: this.table.operationIds.get,
            parameters: { user_id: this.$store.state.keycloak.subject, registry_id: "internal" },
            token: this.$store.state.keycloak.token
          },
          (error, result) => {
            if(result){
              let content = result?.body.map((item) => {
                return {
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  licence: item.licence,
                  updated_at: item["updated"],
                  workspaceID: item["workspace_id"]
                };
              });

              Object.assign(this.table,{ loaded: true, content, totalRows: content.length, disablePagination: !content.length });
            }
          }
        );
      },
      onFiltered(filteredItems){
        this.table.disablePagination = !filteredItems.length;
        this.table.totalRows = filteredItems.length;
        this.table.currentPage = 1;
      },
      plusIconClicked(){
        router.push("/services/serviceCreation");
      },
      playIconClicked(rowData){
        Meteor.call("getWorkspace", this.$store.state.keycloak.idToken, rowData.workspaceID, (error, result) => {
          if(result){
            router.push({
              name: "Devfile",
              params: {
                workspaceID: rowData.workspaceID,
                devfile: result.devfile
              }
            });
          }
        });
      },
      pencilIconClicked(rowData){
        this.currentRowId = rowData.id;
      },
      trashIconClicked(rowData){
        Meteor.call("request", {
          operationId: this.table.operationIds.delete,
          parameters: { serviceId: rowData.id },
          token: this.$store.state.keycloak.token
        }, () => {
          this.fetchServices();
        });

        this.currentRowId = null;
        this.table.loaded = false;
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
