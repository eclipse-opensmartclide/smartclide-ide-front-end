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
  <div class="mx-4 my-4">
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
              {{option.text}}
            </b-form-select-option>
          </b-form-select>
          <b-form-input
              v-else-if="steps[currentStep-1].fields[field].formType === 'text'"
              :type="steps[currentStep-1].fields[field].formType"
              v-model="steps[currentStep-1].fields[field].value"
              :placeholder="steps[currentStep-1].fields[field].placeholder"
              required
          />
          <b-form-textarea
            v-else-if="steps[currentStep-1].fields[field].formType === 'textarea'"
            v-model="steps[currentStep-1].fields[field].value"
            :placeholder="steps[currentStep-1].fields[field].placeholder"
            rows="3"
            no-resize
            required
          />
          <b-form-radio-group
            v-else-if="steps[currentStep-1].fields[field].formType === 'radio'"
            v-model="steps[currentStep-1].fields[field].value"
            required
            stacked
          >
            <b-form-radio
              v-for="option in steps[currentStep-1].fields[field].options"
              :value="option.id"
            >
              {{option.text}}
            </b-form-radio>
          </b-form-radio-group>
          <b-form-checkbox-group
            v-else-if="steps[currentStep-1].fields[field].formType === 'checkbox'"
            v-model="steps[currentStep-1].fields[field].values"
            :required="steps[currentStep-1].fields[field].values.length === 0"
            stacked
          >
            <b-form-checkbox
              v-for="option in steps[currentStep-1].fields[field].options"
              :value="option.id"
            >
              {{option.text}}
            </b-form-checkbox>
          </b-form-checkbox-group>
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
                placeholder: "Provide the name of the service",
                value: null
              },
              description: {
                label: "Description",
                formType: "textarea",
                placeholder: "Provide a short description of the service",
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
                    value: "https://raw.githubusercontent.com/eclipse-opensmartclide/smartclide-ide-front-end/5f4cf858ab0fd0a689c70658986d64f9ad55b6df/public/templates/java-web-spring/devfile.yaml"
                  },
                  {
                    text: "Node.js",
                    value: "https://raw.githubusercontent.com/eclipse-opensmartclide/smartclide-ide-front-end/5f4cf858ab0fd0a689c70658986d64f9ad55b6df/public/templates/nodejs/devfile.yaml"
                  },
                  {
                    text: "Python",
                    value: "https://raw.githubusercontent.com/eclipse-opensmartclide/smartclide-ide-front-end/5f4cf858ab0fd0a689c70658986d64f9ad55b6df/public/templates/python/devfile.yaml"
                  }
                ],
                value: null
              }
            }
          },
          {
            title: "Architectural Pattern Selection",
            sub_title: "Choose the desired Architectural Pattern according to the recommendations",
            fields: {
              architecturalPattern: {
                label: "Please choose an Architectural Pattern",
                formType: "radio",
                options: [
                  {
                    id: "AP1",
                    text: "Service-oriented"
                  },
                  {
                    id: "AP2",
                    text: "Space-based"
                  },
                  {
                    id: "AP3",
                    text: "Microservices"
                  },
                  {
                    id: "AP4",
                    text: "Layered"
                  },
                  {
                    id: "AP5",
                    text: "Event-driven"
                  },
                  {
                    id: "AP6",
                    text: "Microkernel"
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

      this.fetchAPSSurvey();
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
      buildAPSResponsesArray(){
        let responses = [];
        const stepIndex = this.getStepIndex("Architectural Pattern Form");

        for(const field of Object.keys(this.steps[stepIndex].fields)){
          const values = this.steps[stepIndex].fields[field].values;
          values ? responses.push(...values) : responses.push(this.steps[stepIndex].fields[field].value);
        }

        return responses;
      },
      getAPSEvaluation(){
        Meteor.call("evaluateAPSInput", this.$store.state.keycloak.idToken, this.buildAPSResponsesArray(),
          (error, result) => {
            if(result){
              console.log(result);
              this.currentStep++;
            }
          }
        );
      },
      async nextButtonClicked(event){
        event.preventDefault();

        switch (this.currentStep) {
          case 1:
            this.currentStep++;
            break;
          case 2:
            // this.currentStep++;
            // break;
          // case 3:
          //   await this.getAPSEvaluation();
          //   break;
          default:
            this.showOverlay();
            this.setupProject();
        }
      },
      getStepIndex(stepTitle){
        for(let stepIndex = 0; stepIndex < this.steps.length; stepIndex++)
          if(this.steps[stepIndex].title === stepTitle)
            return stepIndex;
      },
      buildGitSystemOptions(){
        let credentialTypes = this.gitCredentials.map(gitCredential => gitCredential.type);
        let uniqueTypes = [...new Set(credentialTypes)].sort();
        const stepIndex = this.getStepIndex("Git Setup");

        uniqueTypes.forEach(type => this.steps[stepIndex].fields.gitSystem.options.push({ text: type, value: type }));
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
      changedGitSystem(){
        this.resetCredentialsOptions();

        let newOptions = [];
        const stepIndex = this.getStepIndex("Git Setup");

        this.gitCredentials.forEach(gitCredential => {
          if(gitCredential.type === this.steps[stepIndex].fields.gitSystem.value)
            newOptions.push({
              text: `${gitCredential.username}`,
              value: gitCredential
            });
        });

        this.steps[stepIndex].fields.credentials.options.push(...newOptions.sort());
      },
      resetCredentialsOptions(){
        const stepIndex = this.getStepIndex("Git Setup");
        this.steps[stepIndex].fields.credentials.options.splice(1);
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
        const stepIndex = this.getStepIndex("Service Details");
        this.steps[stepIndex].fields.name.value = this.receivedService.name;
        this.steps[stepIndex].fields.description.value = this.receivedService.description;
      },
      fetchAPSSurvey(){
        Meteor.call("getAPSSurvey", this.$store.state.keycloak.idToken, (error, result) => {
          if(result){
            for(const field of Object.keys(result.fields))
              if(result.fields[field].formType === "radio")
                result.fields[field].value = null;
              else if(result.fields[field].formType === "checkbox")
                result.fields[field].values = [];

            this.steps.splice(2, 0, result);
          }
        });
      },
      setupProject(){
        let createRepositoryMethod;
        let parameters = {};
        let headers = {};
        const gitStepIndex = this.getStepIndex("Git Setup");
        const detailsStepIndex = this.getStepIndex("Service Details");

        if(Object.keys(this.$route.query).length !== 0){
          createRepositoryMethod = "importRepository";
          parameters = {
            'repoUrl': this.receivedService.url.replace(".git", ""),
            'name': this.steps[detailsStepIndex].fields.name.value,
            'visibility': this.steps[detailsStepIndex].fields.visibility.value
          };
          headers = {
            'gitLabServerURL': this.steps[gitStepIndex].fields.credentials.value.url,
            'gitlabToken': this.steps[gitStepIndex].fields.credentials.value.token
          };
        }
        else{
          createRepositoryMethod = "createRepository";
          headers = {
            'projectName': this.steps[detailsStepIndex].fields.name.value,
            'projVisibility': this.steps[detailsStepIndex].fields.visibility.value,
            'projDescription': this.steps[detailsStepIndex].fields.description.value,
            'gitLabServerURL': this.steps[gitStepIndex].fields.credentials.value.url,
            'gitlabToken': this.steps[gitStepIndex].fields.credentials.value.token
          };
        }

        Meteor.call(createRepositoryMethod, this.$store.state.keycloak.idToken, headers, parameters, (error, result) => {
          if(result){
            if(result.status === 0 || (Object.keys(this.$route.query).length !== 0 && result === 201)){
              const repositoryURL = Object.keys(this.$route.query).length !== 0 ? parameters.repoUrl : result.message;
              const devfileURL = this.steps[detailsStepIndex].fields.framework.value;

              Meteor.call("getDevfile", devfileURL, (error, result) => {
                if(result){
                  const devfile = this.fillDevfileTemplate(YAML_JSON.parse(result), repositoryURL);

                  Meteor.call("createWorkspace", this.$store.state.keycloak.idToken, devfile, (error, result) => {
                    if(result){
                      const workspaceID = result.id

                      Meteor.call("request", {
                        operationID: this.$store.state.apis.backend.endpoints.addServices.operationID,
                        requestBody: {
                          name: this.steps[detailsStepIndex].fields.name.value,
                          user_id: this.$store.state.keycloak.subject,
                          registry_id: "internal",
                          workspace_id: workspaceID,
                          url: repositoryURL,
                          description: this.steps[detailsStepIndex].fields.description.value,
                          framework: this.getSelectedFrameworkName(),
                          updated: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
                          deployable: false,
                          is_public: this.steps[detailsStepIndex].fields.visibility.value === 0
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
        const stepIndex = this.getStepIndex("Service Details");
        devfile.metadata.name = `${this.steps[stepIndex].fields.name.value}-${(+new Date).toString(36)}`;
        devfile.projects = [{
          name: this.steps[stepIndex].fields.name.value,
          source: { location: repositoryURL, type: "git" }
        }];

        return devfile;
      },
      getSelectedFrameworkName(){
        const stepIndex = this.getStepIndex("Service Details");
        const selectedOption = this.steps[stepIndex].fields.framework.options.filter(option => option.value === this.steps[stepIndex].fields.framework.value)[0];

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
