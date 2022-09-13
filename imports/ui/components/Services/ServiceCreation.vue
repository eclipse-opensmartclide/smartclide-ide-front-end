<!-------------------------------------------------------------------------------
 - Copyright (c) 2022 Unparallel Innovation, Lda
 -
 - This program and the accompanying materials are made available under the
 - terms of the Eclipse Public License 2.0 which is available at
 - http://www.eclipse.org/legal/epl-2.0.
 -
 - SPDX-License-Identifier: EPL-2.0
 -------------------------------------------------------------------------------->

<template>
  <div class="mx-4 mt-4">
    <b-card
      :title="`[Step ${currentStep}/${totalSteps}] ${steps[currentStep-1].title}`"
      :sub-title="steps[currentStep-1].sub_title"
    >
      <b-form class="mt-4" @submit="nextButtonClicked">
        <b-form-group
          v-for="field in Object.keys(steps[currentStep-1].fields)"
          :label="steps[currentStep-1].fields[field].label"
        >
          <b-form-select
            v-if="steps[currentStep-1].fields[field].formType === 'select'"
            v-model="steps[currentStep-1].fields[field].value"
            @change="changedGitSystem"
            required
          >
            <b-form-select-option
              v-for="option in steps[currentStep-1].fields[field].options"
              v-model="option.value"
              :disabled="option.value === null"
            >
              {{option.label}}
            </b-form-select-option>
          </b-form-select>
          <b-form-input
            v-else
            :type="steps[currentStep-1].fields[field].formType"
            v-model="steps[currentStep-1].fields[field].value"
            required
          />
        </b-form-group>

        <b-row class="">
          <b-col>
            <b-button @click="cancelButtonClicked">Cancel</b-button>
          </b-col>
          <b-col/>
          <b-col class="text-right">
            <b-button @click="previousButtonClicked" :hidden="currentStep === 1">Previous</b-button>
            <b-button type="submit" variant="primary">Next</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
  import router from "../../../../client/routes";

  export default {
    name: "ServiceCreation",
    data(){
      return {
        steps: [
          {
            title: "Git Setup",
            sub_title: "Choose which set of Git credentials to use",
            fields: {
              gitSystem: {
                label: "Git System",
                formType: "select",
                options: [
                  {
                    label: "Please select a Git System",
                    value: null
                  }
                ],
                value: null
              },
              credentials: {
                label: "Credentials",
                formType: "select",
                options: [
                  {
                    label: "Please select a set of credentials",
                    value: null
                  }
                ],
                value: null
              },
            }
          },
          {
            title: "Service Details",
            sub_title: "Provide the details of the new service",
            fields: {
              name: {
                label: "Name",
                formType: "text",
                value: null
              },
              description: {
                label: "Description",
                formType: "text",
                value: null
              },
              visibility: {
                label: "Visibility",
                formType: "select",
                options: [
                  {
                    label: "Please select the project's visibility",
                    value: null
                  },
                  {
                    label: "Private",
                    value: false,
                  },
                  {
                    label: "Public",
                    value: true
                  }
                ]
              },
              // licence: {
              //
              // },
              // framework: {
              //
              // }
            }
          }
        ],
        gitCredentials: [],
        currentStep: 1,
        totalSteps: 3
      }
    },
    mounted(){
      this.fetchGitCredentials();
    },
    methods: {
      cancelButtonClicked(){
        router.back();
      },
      previousButtonClicked(){
        this.currentStep--;
      },
      nextButtonClicked(event){
        event.preventDefault();

        if(this.currentStep < this.totalSteps - 1)
          this.currentStep++;
        // else
        //   router.push({
        //     name: "Devfile",
        //     params: {
        //       workspaceID: rowData.workspaceID,
        //       devfile: result.devfile
        //     }
        //   });
      },
      fetchGitCredentials(){
        Meteor.call("request", {
            operationID: this.$store.state.apis.backend.endpoints.getGitCredentials.operationID,
            parameters: JSON.parse(`{
              "${this.$store.state.apis.backend.endpoints.getGitCredentials.parameters.userID}": "${this.$store.state.keycloak.subject}"
            }`),
            token: this.$store.state.keycloak.token
          },
          (error, result) => {
            if(result){
              this.gitCredentials = result.body;

              this.buildGitSystemOptions();
            }
          }
        );
      },
      buildGitSystemOptions(){
        let credentialTypes = this.gitCredentials.map(gitCredential => gitCredential.type);
        let uniqueTypes = [...new Set(credentialTypes)].sort();

        uniqueTypes.forEach(type => this.steps[0].fields.gitSystem.options.push({ label: type, value: type }));
      },
      changedGitSystem(){
        this.resetCredentialsOptions();

        let newOptions = [];

        this.gitCredentials.forEach(gitCredential => {
          if(gitCredential.type === this.steps[0].fields.gitSystem.value)
            newOptions.push({
              label: `${gitCredential.username}`,
              value: `${gitCredential.id}`
            });
        });

        this.steps[0].fields.credentials.options.push(...newOptions.sort());
      },
      resetCredentialsOptions(){
        this.steps[0].fields.credentials.options.splice(1);
      }
    }
  }
</script>

<style scoped>

</style>
