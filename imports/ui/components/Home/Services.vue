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
        <b-icon-plus-circle
          role="button"
          variant="primary"
          font-scale="1.5"
          @click="plusIconClicked"
          v-b-tooltip.hover
          title="Add new"
        />
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
          <template #cell(createdAt)="data">
            {{ convertDate(data.value) }}
          </template>
          <template #cell(actions)="data">
            <div class="text-center">
              <b-icon-code-slash
                role="button"
                variant="primary"
                class="mx-2"
                font-scale="1.2"
                @click="developIconClicked(data.item)"
                v-b-tooltip.hover
                title="Develop"
              />
              <b-icon-pencil
                role="button"
                variant="primary"
                class="mx-2"
                font-scale="1.2"
                @click="pencilIconClicked(data.item)"
                v-b-tooltip.hover
                title="Edit"
              />
              <b-icon-trash
                role="button"
                variant="primary"
                class="mx-2"
                font-scale="1.2"
                @click="trashIconClicked(data.item)"
                v-b-tooltip.hover
                title="Delete"
              />
            </div>
          </template>
        </b-table>
      </div>
    </b-card>
  </div>
</template>

<script>
  import moment from "moment";
  import router from "../../../../client/routes";

  export default {
    name: "Services",
    data(){
      return {
        table: {
          title: "Services",
          fields: ["name", "description", "createdAt", "actions"],
          content: [],
          loaded: false,
          filter: null,
          totalRows: null,
          perPage: 10,
          currentPage: 1,
          disablePagination: null
        },
        stopWorkspaceTimeout: undefined
      };
    },
    mounted(){
      this.$store.state.context = 'home';
      this.fetchServices();
    },
    beforeRouteLeave(to, from, next){
      clearTimeout(this.stopWorkspaceTimeout);
      next();
    },
    methods: {
      fetchServices(){
        Meteor.call("request", {
            operationID: this.$store.state.apis.backend.endpoints.getServices.operationID,
            parameters: JSON.parse(`{
              "${this.$store.state.apis.backend.endpoints.getServices.parameters.userID}": "${this.$store.state.keycloak.subject}",
              "${this.$store.state.apis.backend.endpoints.getServices.parameters.registryID}": "internal"
            }`),
            token: this.$store.state.keycloak.idToken
          },
          (error, result) => {
            if(result){
              let content = result?.body.map((item) => {
                return {
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  createdAt: item["created"],
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
      convertDate(date){
        return moment(new Date(date)).format('DD-MMM-YYYY HH:mm');
      },
      plusIconClicked(){
        router.push("/services/serviceCreation");
      },
      developIconClicked(rowData){
        router.push(`/project/${rowData.workspaceID}`);
      },
      pencilIconClicked(rowData){
        // Meteor.call("getWorkspace", this.$store.state.keycloak.idToken, rowData.workspaceID, (error, result) => {
        //   if(result){
        //     router.push({
        //       name: "Devfile",
        //       params: {
        //         from: "Edit",
        //         workspaceID: rowData.workspaceID,
        //         devfile: result.devfile
        //       }
        //     });
        //   }
        // });
      },
      deleteService(rowData){
        this.table.loaded = false;

        Meteor.call("getWorkspace", this.$store.state.keycloak.token, rowData.workspaceID, (error, result) => {
          if(result){
            switch(result.status){
              case "STARTING":
              case "RUNNING":
                Meteor.call("stopWorkspace", this.$store.state.keycloak.token, rowData.workspaceID);
              case "STOPPING":
                this.stopWorkspaceTimeout = setTimeout(this.deleteService.bind(null, rowData), 2000);
                break;
              case "STOPPED":
                Meteor.call("request", {
                  operationID: this.$store.state.apis.backend.endpoints.deleteService.operationID,
                  parameters: JSON.parse(`{
                    "${this.$store.state.apis.backend.endpoints.deleteService.parameters.serviceID}": "${rowData.id}"
                  }`),
                  token: this.$store.state.keycloak.idToken
                }, () => {
                  Meteor.call("deleteWorkspace", this.$store.state.keycloak.idToken, rowData.workspaceID, () => {
                    this.fetchServices();
                  })
                });
                break;
              default:
                break;
            }
          }
        });
      },
      trashIconClicked(rowData){
        this.$bvModal.msgBoxConfirm('Are you sure you want to delete this service?', {
            okVariant: "danger",
            okTitle: "Delete"
          }
        )
        .then(value => {
          if(value)
            this.deleteService(rowData);
        })
        .catch(error => {
          throw new Error(error);
        });
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
