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
          class="w-50"
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
              {{option.text}}
            </b-form-select-option>
          </b-form-select>
          <b-form-textarea
            v-else-if="steps[currentStep-1].fields[field].formType === 'textarea'"
            v-model="steps[currentStep-1].fields[field].value"
            rows="3"
            no-resize
          ></b-form-textarea>
          <b-form-input
            v-else
            :type="steps[currentStep-1].fields[field].formType"
            v-model="steps[currentStep-1].fields[field].value"
            required
          />
        </b-form-group>

        <b-row>
          <b-col>
            <b-button @click="cancelButtonClicked">Cancel</b-button>
          </b-col>
          <b-col/>
          <b-col class="text-right">
            <b-button @click="previousButtonClicked" :hidden="currentStep === 1">Previous</b-button>
            <b-button type="submit" variant="primary">
              {{ this.currentStep < this.totalSteps ? "Next" : "Add" }}
            </b-button>
          </b-col>
        </b-row>
      </b-form>

      <div class="creating d-flex justify-content-center align-items-center flex-column bg-white">
        <template v-if="this.serviceCreated">
          <b-icon-check-circle class="text-primary" style="width: 5rem; height: 5rem;" role="status"/>
          <div class="text-primary">
            <br>Service created successfully!
          </div>
          <b-row class="mt-5">
            <b-col>
              <b-button class="text-nowrap" to="/services">Go to Services</b-button>
            </b-col>
            <b-col>
              <b-button class="text-nowrap" @click="this.developButtonClicked" variant="primary">
                <span>Develop</span>
                <span><b-icon-code-slash class="ml-2"/></span>
              </b-button>
            </b-col>
          </b-row>
        </template>
        <template v-else>
          <b-spinner class="spinner-border text-primary" style="width: 5rem; height: 5rem;" role="status"/>
          <div class="text-primary">
            <br>Setting the service up... Please wait
          </div>
        </template>
      </div>
    </b-card>
  </div>
</template>

<script>
  import router from "../../../../client/routes";
  import YAML_JSON from "yamljs";
  import moment from "moment";

  export default {
    name: "ServiceCreation",
    data(){
      return {
        steps: [
          {
            title: "Git Setup",
            sub_title: "Please select which set of Git credentials to use",
            fields: {
              gitSystem: {
                label: "Git System",
                formType: "select",
                options: [
                  {
                    text: "Please select a Git System",
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
                    text: "Please select a set of credentials",
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
                formType: "textarea",
                value: null
              },
              visibility: {
                label: "Visibility",
                formType: "select",
                options: [
                  {
                    text: "Please select the project's visibility",
                    value: null
                  },
                  {
                    text: "Private",
                    value: 2, // According to the service-creation extension
                  },
                  {
                    text: "Public",
                    value: 0 // According to the service-creation extension
                  }
                ],
                value: null
              },
              framework: {
                label: "Framework",
                formType: "select",
                options: [
                  {
                    text: "Please select a framework",
                    value: null
                  },
                  {
                    text: "Java with Spring Boot and MySQL",
                    value: "https://raw.githubusercontent.com/eclipse-researchlabs/smartclide-devfiles/main/templates/java-web-spring/devfile.yaml"
                  },
                  {
                    text: "Node.js",
                    value: "https://raw.githubusercontent.com/eclipse-researchlabs/smartclide-devfiles/main/templates/nodejs/devfile.yaml"
                  },
                  {
                    text: "Python",
                    value: "https://raw.githubusercontent.com/eclipse-researchlabs/smartclide-devfiles/main/templates/python/devfile.yaml"
                  }
                ],
                value: null
              }
            }
          }
        ],
        gitCredentials: [],
        currentStep: 1,
        totalSteps: 2,
        receivedService: {},
        serviceCreated: false
      }
    },
    mounted(){
      this.hideOverlay();
      this.fetchGitCredentials();

      if(this.$route.query.serviceID)
        this.fetchService();
    },
    methods: {
      showOverlay(){
        $(".creating").removeClass("d-none");
        $(".creating").addClass("d-flex");
      },
      hideOverlay(){
        $(".creating").removeClass("d-flex");
        $(".creating").addClass("d-none");
      },
      cancelButtonClicked(){
        if(Object.keys(this.$route.query).length !== 0)
          router.push("/services");
        else
          router.back();
      },
      previousButtonClicked(){
        this.currentStep--;
      },
      nextButtonClicked(event){
        event.preventDefault();

        if(this.currentStep < this.totalSteps)
          this.currentStep++;
        else{
          this.showOverlay();
          this.setupProject();
        }
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

        uniqueTypes.forEach(type => this.steps[0].fields.gitSystem.options.push({ text: type, value: type }));
      },
      changedGitSystem(){
        this.resetCredentialsOptions();

        let newOptions = [];

        this.gitCredentials.forEach(gitCredential => {
          if(gitCredential.type === this.steps[0].fields.gitSystem.value)
            newOptions.push({
              text: `${gitCredential.username}`,
              value: gitCredential
            });
        });

        this.steps[0].fields.credentials.options.push(...newOptions.sort());
      },
      resetCredentialsOptions(){
        this.steps[0].fields.credentials.options.splice(1);
      },
      fetchService(){
        Meteor.call("request", {
          operationID: this.$store.state.apis.backend.endpoints.getServiceByID.operationID,
          parameters: JSON.parse(`{
            "${this.$store.state.apis.backend.endpoints.getServiceByID.parameters.serviceID}": "${this.$route.query.serviceID}"
          }`),
          token: this.$store.state.keycloak.idToken
        }, (error, result) => {
          if(result){
            this.receivedService = result.body;
            this.fillFormIn();
          }
        });
      },
      fillFormIn(){
        this.steps[1].fields.name.value = this.receivedService.name;
        this.steps[1].fields.description.value = this.receivedService.description;
      },
      setupProject(){
        let createRepositoryMethod;
        let parameters = {};
        let headers = {};

        if(Object.keys(this.$route.query).length !== 0){
          createRepositoryMethod = "importRepository";
          parameters = {
            'repoUrl': this.receivedService.url.replace(".git", "")
          };
          headers = {
            'gitLabServerURL': this.steps[0].fields.credentials.value.url,
            'gitlabToken': this.steps[0].fields.credentials.value.token
          };
        }
        else{
          createRepositoryMethod = "createRepository";
          headers = {
            'projectName': this.steps[1].fields.name.value,
            'projVisibility': this.steps[1].fields.visibility.value,
            'projDescription': this.steps[1].fields.description.value,
            'gitLabServerURL': this.steps[0].fields.credentials.value.url,
            'gitlabToken': this.steps[0].fields.credentials.value.token
          };
        }

        Meteor.call(createRepositoryMethod, this.$store.state.keycloak.idToken, headers, parameters, (error, result) => {
          if(result){
            if(result.status === 0 || (Object.keys(this.$route.query).length !== 0 && result === 201)){
              const repositoryURL = Object.keys(this.$route.query).length !== 0 ? parameters.repoUrl : result.message;
              const devfileURL = this.steps[1].fields.framework.value;

              Meteor.call("getDevfile", this.$store.state.keycloak.idToken, devfileURL, (error, result) => {
                if(result){
                  const devfile = this.fillDevfileTemplate(YAML_JSON.parse(result), repositoryURL);

                  Meteor.call("createWorkspace", this.$store.state.keycloak.idToken, devfile, (error, result) => {
                    if(result){
                      const workspaceID = result.id

                      Meteor.call("request", {
                        operationID: this.$store.state.apis.backend.endpoints.addServices.operationID,
                        requestBody: {
                          name: this.steps[1].fields.name.value,
                          user_id: this.$store.state.keycloak.subject,
                          registry_id: "internal",
                          workspace_id: workspaceID,
                          url: repositoryURL,
                          description: this.steps[1].fields.description.value,
                          framework: this.getSelectedFrameworkName(),
                          updated: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                          deployable: false,
                          is_public: this.steps[1].fields.visibility.value === 0
                        },
                        token: this.$store.state.keycloak.idToken
                      }, (error, result) => {
                        if(result){
                          this.serviceCreated = workspaceID;
                        } else if(error){
                          this.serviceCreationError("Service was not added to the DB.");
                        }
                      });
                    } else if(error){
                      this.serviceCreationError("Workspace could not be created.");
                    }
                  });
                }
                else if(error){
                  this.serviceCreationError("Devfile could not be fetched.")
                }
              });
            }
            else if(result.status === 1){
              this.serviceCreationError(result.message);
            }
          }
          else if(error){
            this.serviceCreationError("Repository creation failed.");
          }
        });
      },
      serviceCreationError(message){
        this.hideOverlay();
        alert(message);
      },
      fillDevfileTemplate(devfile, repositoryURL){
        devfile.metadata.name = `${this.steps[1].fields.name.value}-${(+new Date).toString(36)}`;
        devfile.projects = [{
          name: this.steps[1].fields.name.value,
          source: { location: repositoryURL, type: "git" }
        }];

        return devfile;
      },
      getSelectedFrameworkName(){
        const selectedOption = this.steps[1].fields.framework.options.filter(option => option.value === this.steps[1].fields.framework.value)[0];

        return selectedOption.text;
      },
      developButtonClicked(){
        router.push(`/project/${this.serviceCreated}`);
      }
    }
  }
</script>

<style scoped>
  .creating{
    z-index: 9;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    bottom: 0px;
    border-radius: 10px;
  }

  .spinner-border{
    animation: 1.75s linear infinite spinner-border;
  }
</style>
