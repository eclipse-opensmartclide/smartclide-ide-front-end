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
        v-model="currentModal.currentTabId"
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
            <b-icon-plus-circle role="button" variant="primary" font-scale="1.5" @click="plusIconClicked" v-b-modal="`modal-add-edit-${index}`"/>
            <b-modal
              :id="`modal-add-edit-${index}`"
              :title="`${currentModal.type} ${table.title} Credentials`"
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
                <b-button class="float-right" type="submit" variant="primary">{{ currentModal.type === 'Add' ? 'Add' : 'Save' }}</b-button>
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
                  <b-icon-pencil role="button" variant="primary" class="mx-2" font-scale="1.2" @click="pencilIconClicked(data.item)" v-b-modal="`modal-add-edit-${index}`"/>
                  <b-icon-trash role="button" variant="primary" class="mx-2" font-scale="1.2" @click="trashIconClicked(data.item)"/>
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
            fields: ["type", { key: "url", label: "URL" }, "username", "actions"],
            content: [],
            loaded: false,
            filter: null,
            totalRows: null,
            perPage: 10,
            currentPage: 1,
            disablePagination: true,
            modalFields: {
              type: {
                label: "Type",
                formType: "select",
                options: [
                  {
                    label: "Please select a type of Git platform",
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
            },
            endpoints: {
              get: {
                operationId: "getGitCredentials",
              },
              add: {
                operationId: "postGitCredentials",
              },
              edit: {
                operationId: "patchGitCredentialsItem",
                parameter: "gitCredentialsId"
              },
              delete: {
                operationId: "deleteGitCredentialsItem",
                parameter: "gitCredentialsId"
              }
            }
          },
          {
            title: "Deployment Platforms",
            fields: [{ key: "url", label: "URL" }, "username", "actions"],
            content: [],
            loaded: false,
            filter: null,
            totalRows: null,
            perPage: 10,
            currentPage: 1,
            disablePagination: true,
            modalFields: {
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
            },
            endpoints: {
              get: {
                operationId: "getDeploymentPlatforms",
              },
              add: {
                operationId: "postDeploymentPlatforms",
              },
              edit: {
                operationId: "patchDeploymentPlatformItem",
                parameter: "deploymentPlatformId"
              },
              delete: {
                operationId: "deleteDeploymentPlatformItem",
                parameter: "deploymentPlatformId"
              }
            }
          },
          {
            title: "CI Managers",
            fields: ["type", { key: "url", label: "URL" }, "username", "actions"],
            content: [],
            loaded: false,
            filter: null,
            totalRows: null,
            perPage: 10,
            currentPage: 1,
            disablePagination: true,
            modalFields: {
              type: {
                label: "Type",
                formType: "select",
                options: [
                  {
                    label: "Please select a type of CI Manager",
                    value: null
                  },
                  {
                    label: "Jenkins",
                    value: "Jenkins"
                  },
                  {
                    label: "GitLab CI/CD",
                    value: "GitLab CI/CD"
                  },
                  {
                    label: "GitHub Actions",
                    value: "GitHub Actions"
                  },
                  {
                    label: "Travis",
                    value: "Travis"
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
            },
            endpoints: {
              get: {
                operationId: "getCiManagers"
              },
              add: {
                operationId: "postCiManagers"
              },
              edit: {
                operationId: "patchCiManagerItem",
                parameter: "ciManagerId"
              },
              delete: {
                operationId: "deleteCiManagerItem",
                parameter: "ciManagerId"
              }
            }
          }
        ],
        currentModal: {
          type: null,
          currentTabId: null,
          currentRowId: null
        }
      };
    },
    mounted(){
      this.$store.state.context = 'my-account';
      this.fetchContent();
    },
    methods: {
      fetchContent(){
        this.fetchGitCredentials();
        this.fetchDeploymentPlatformsCredentials();
        this.fetchCIManagersCredentials();
      },
      fetchGitCredentials(){
        Meteor.call("request", {
            operationId: this.tables[0].endpoints.get.operationId,
            parameters: { user_id: this.$store.state.keycloak.subject },
            token: this.$store.state.keycloak.token
          },
          (error, result) => {
            if(result){
              let content = result?.body.map((item) => {
                return { id: item.id, type: item.type, url: item.url, username: item.username };
              });

              Object.assign(this.tables[0],{ loaded: true, content, totalRows: content.length, disablePagination: !content.length });
            }
          }
        );
      },
      fetchDeploymentPlatformsCredentials(){
        Meteor.call("request", {
            operationId: this.tables[1].endpoints.get.operationId,
            parameters: { user_id: this.$store.state.keycloak.subject },
            token: this.$store.state.keycloak.token
          },
          (error, result) => {
            if(result){
              let content = result?.body.map((item) => {
                return { id: item.id, url: item.url, username: item.username };
              });

              Object.assign(this.tables[1],{ loaded: true, content, totalRows: content.length, disablePagination: !content.length });
            }
          }
        );
      },
      fetchCIManagersCredentials(){
        Meteor.call("request", {
            operationId: this.tables[2].endpoints.get.operationId,
            parameters: { user_id: this.$store.state.keycloak.subject },
            token: this.$store.state.keycloak.token
          },
          (error, result) => {
            if(result){
              let content = result?.body.map((item) => {
                return { id: item.id, type: item.type, url: item.url, username: item.username };
              });

              Object.assign(this.tables[2],{ loaded: true, content, totalRows: content.length, disablePagination: !content.length });
            }
          }
        );
      },
      onFiltered(filteredItems){
        this.tables[this.currentModal.currentTabId].disablePagination = !filteredItems.length;
        this.tables[this.currentModal.currentTabId].totalRows = filteredItems.length;
        this.tables[this.currentModal.currentTabId].currentPage = 1;
      },
      plusIconClicked(){
        this.currentModal.type = "Add";
      },
      resetModal(){
        Object.keys(this.tables[this.currentModal.currentTabId].modalFields).forEach(field => {
          this.tables[this.currentModal.currentTabId].modalFields[field].value = null;
        });
        this.currentModal.type = null;
        this.currentModal.currentRowId = null;
      },
      closeModal(){
        this.$nextTick(() => {
          this.$bvModal.hide(`modal-add-edit-${this.currentModal.currentTabId}`);
        });
      },
      pencilIconClicked(rowData){
        this.currentModal.type = "Edit";
        this.currentModal.currentRowId = rowData.id;
        Object.keys(this.tables[this.currentModal.currentTabId].modalFields).forEach(field => {
          this.tables[this.currentModal.currentTabId].modalFields[field].value = rowData[field];
        });
      },
      modalSubmitted(event){
        event.preventDefault();

        let currentTable = this.tables[this.currentModal.currentTabId];
        let endpoint = this.currentModal.type === "Add" ? currentTable.endpoints.add: currentTable.endpoints.edit;

        Meteor.call("request", {
          operationId: endpoint.operationId,
          parameters: JSON.parse(`{ "${endpoint.parameter}": "${this.currentModal.currentRowId}" }`),
          requestBody: {
            user_id: this.$store.state.keycloak.subject,
            type: this.currentModal.currentTabId !== 1 ? currentTable.modalFields.type.value : null,
            url: currentTable.modalFields.url.value,
            username: currentTable.modalFields.username.value,
            token: currentTable.modalFields.token.value
          },
          token: this.$store.state.keycloak.token
        }, () => {
          this.fetchContent();
        });

        this.closeModal();
        this.tables[this.currentModal.currentTabId].loaded = false;
      },
      trashIconClicked(rowData){
        let currentTable = this.tables[this.currentModal.currentTabId];
        let endpoint = currentTable.endpoints.delete;

        Meteor.call("request", {
          operationId: endpoint.operationId,
          parameters: JSON.parse(`{ "${endpoint.parameter}": "${rowData.id}" }`),
          token: this.$store.state.keycloak.token
        }, () => {
          this.fetchContent();
        });

        this.currentModal.currentRowId = null;
        this.tables[this.currentModal.currentTabId].loaded = false;
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

  /deep/ .card-header{
    background-color: white;
  }
</style>
