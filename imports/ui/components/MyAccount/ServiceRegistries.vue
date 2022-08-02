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
        <b-icon-plus-circle role="button" variant="primary" font-scale="1.5" @click="plusIconClicked" v-b-modal.modal-add-edit/>
        <b-modal
          id="modal-add-edit"
          :title="this.modalType + ' Service Registry'"
          @hidden="resetModal"
          hide-footer
        >
          <b-form
            @submit="modalSubmitted"
          >
            <b-form-group
              v-for="field in Object.keys(table.modalFields)"
              :label="table.modalFields[field].label"
            >
              <b-form-select
                v-if="table.modalFields[field].formType === 'select'"
                v-model="table.modalFields[field].value"
                required
              >
                <b-form-select-option
                  v-for="option in table.modalFields[field].options"
                  v-model="option.value"
                  :disabled="option.value === null"
                >
                  {{option.label}}
                </b-form-select-option>
              </b-form-select>
              <b-form-input
                v-else
                :type="table.modalFields[field].formType"
                v-model="table.modalFields[field].value"
                required
              />
            </b-form-group>
            <b-button class="float-right" type="submit" variant="primary">{{ this.modalType === 'Add' ? 'Add' : 'Save' }}</b-button>
        </b-form>
      </b-modal>
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
              <b-icon-pencil role="button" variant="primary" class="mx-2" font-scale="1.2" @click="pencilIconClicked(data.item)" v-b-modal.modal-add-edit/>
              <b-icon-trash role="button" variant="primary" class="mx-2" font-scale="1.2" @click="trashIconClicked(data.item)"/>
            </div>
          </template>
        </b-table>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ServiceRegistries",
  data(){
    return {
      table: {
        title: "Service Registries",
        fields: ["type", "URL", "username", "actions"],
        content: [],
        loaded: false,
        filter: null,
        totalRows: null,
        perPage: 10,
        currentPage: 1,
        disablePagination: null,
        modalFields: {
          type: {
            label: "Type",
            formType: "select",
            options: [
              {
                label: "Please select a type of service registry",
                value: null
              },
              {
                label: "GitHub",
                value: "GitHub"
              },
              {
                label: "GitLab",
                value: "GitLab"
              },
              {
                label: "Bitbucket",
                value: "Bitbucket"
              },
              {
                label: "ProgrammableWeb",
                value: "ProgrammableWeb"
              },
              {
                label: "Docker",
                value: "Docker"
              },
              {
                label: "IoT-Catalogue",
                value: "IoT-Catalogue"
              }
            ],
            value: null
          },
          url: {
            label: "URL",
            formType: "url",
            value: null
          },
          username: {
            label: "Username",
            formType: "text",
            value: null
          },
          token: {
            label: "Token",
            formType: "password",
            value: null
          }
        }
      },
      modalType: null,
      currentRowId: null,
    };
  },
  mounted(){
    this.$store.state.context = 'my-account';
    this.fetchContent();
  },
  methods: {
    fetchContent(){
      Meteor.call("request", { operationId: "getServiceRegistries", token: this.$store.state.keycloak.token},
          (error, result) => {
            if(result){
              let content = result?.body.map((item) => {
                return { id: item.id, type: item.type, URL: item.url, username: item.username };
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
      this.modalType = "Add";
    },
    resetModal(){
      Object.keys(this.table.modalFields).forEach(field => this.table.modalFields[field].value = null);
      this.modalType = null;
      this.currentRowId = null;
    },
    closeModal(){
      this.$nextTick(() => {
        this.$bvModal.hide('modal-add-edit')
      });
    },
    pencilIconClicked(rowData){
      this.modalType = "Edit";
      this.currentRowId = rowData.id;
      this.table.modalFields.type.value = rowData.type;
      this.table.modalFields.url.value = rowData.URL;
      this.table.modalFields.username.value = rowData.username;
    },
    modalSubmitted(event){
      event.preventDefault();

      let args = {
        operationId: this.modalType === "Add" ? "postServiceRegistries" : "patchServiceRegistryItem",
        parameters: { serviceRegistryId: this.currentRowId },
        requestBody: {
          user_id: this.$store.state.keycloak.subject,
          type: this.table.modalFields.type.value,
          url: this.table.modalFields.url.value,
          username: this.table.modalFields.username.value,
          token: this.table.modalFields.token.value
        },
        token: this.$store.state.keycloak.token
      };

      Meteor.call("request", args);

      this.closeModal();
      this.table.loaded = false;
      setTimeout(() => this.fetchContent(), 100);
    },
    trashIconClicked(rowData){
      this.currentRowId = rowData.id;

      Meteor.call("request", {
        operationId: "deleteServiceRegistryItem",
        parameters: { serviceRegistryId: this.currentRowId },
        token: this.$store.state.keycloak.token
      });

      this.currentRowId = null;
      this.table.loaded = false;
      setTimeout(() => this.fetchContent(), 100);
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
