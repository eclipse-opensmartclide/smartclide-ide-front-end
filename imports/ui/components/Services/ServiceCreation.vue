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
            v-model="steps[currentStep-1].fields[field].values"
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
            sub_title: "Provide the input for the Architectural Pattern component",
            fields: {
              appDomain: {
                id: "Q1",
                label: "Please choose the domain of your application",
                formType: "radio",
                options: [
                  {
                    id: "Q1_1",
                    text: "Web-based systems"
                  },
                  {
                    id: "Q1_2",
                    text: "Web services"
                  },
                  {
                    id: "Q1_3",
                    text: "Service-based systems"
                  },
                  {
                    id: "Q1_4",
                    text: "Distributed systems"
                  },
                  {
                    id: "Q1_5",
                    text: "Cloud computing applications"
                  },
                  {
                    id: "Q1_6",
                    text: "Mobile applications"
                  },
                  {
                    id: "Q1_7",
                    text: "Compiler design"
                  },
                  {
                    id: "Q1_8",
                    text: "Case and related developer tools"
                  },
                  {
                    id: "Q1_9",
                    text: "Database systems"
                  },
                  {
                    id: "Q1_10",
                    text: "Context-aware systems"
                  },
                  {
                    id: "Q1_11",
                    text: "Adaptable systems"
                  },
                  {
                    id: "Q1_12",
                    text: "Enterprise application integration"
                  },
                  {
                    id: "Q1_13",
                    text: "Customer relationship management"
                  },
                  {
                    id: "Q1_14",
                    text: "Information management and decision support system"
                  },
                  {
                    id: "Q1_15",
                    text: "Transaction processing"
                  },
                  {
                    id: "Q1_16",
                    text: "None of the above"
                  }
                ],
                values: []
              },
              appType: {
                id: "Q2",
                label: "Please choose the type of your application",
                formType: "checkbox",
                options: [
                  {
                    id: "Q2_1",
                    text: "Web application / website with small components"
                  },
                  {
                    id: "Q2_2",
                    text: "Large scale web application like e-commerce or social website development"
                  },
                  {
                    id: "Q2_3",
                    text: "General desktop application"
                  },
                  {
                    id: "Q2_4",
                    text: "Application with a simply business logic that does not need to scale out"
                  },
                  {
                    id: "Q2_5",
                    text: "Enterprise or business application with traditional IT departments and processes"
                  },
                  {
                    id: "Q2_6",
                    text: "Application with a fixed set of core functionalities and a dynamic set of functionalities that need frequent updates"
                  },
                  {
                    id: "Q2_7",
                    text: "Large, complex, enterprise-wide systems that require integration with many heterogeneous applications and services"
                  },
                  {
                    id: "Q2_8",
                    text: "Application that has many shared components, particularly components across the enterprise"
                  },
                  {
                    id: "Q2_9",
                    text: "Application with immense and rapidly growing data systems"
                  },
                  {
                    id: "Q2_10",
                    text: "Application that requires strict standards of testability"
                  },
                  {
                    id: "Q2_11",
                    text: "None of the above"
                  }
                ],
                values: []
              },
              nonFunctionalReqs: {
                id: "Q3",
                label: "Please choose the most relevant non-functional requirements for your application",
                formType: "checkbox",
                options: [
                  {
                    id: "Q3_1",
                    text: "Maintainability (how easy the software system can be modified to correct faults, improve performance, or other attributes, or adapt to a changed environment)"
                  },
                  {
                    id: "Q3_2",
                    text: "Performance (amount of work accomplished by a system and the limiting factor in the end-usability of the system)"
                  },
                  {
                    id: "Q3_3",
                    text: "Portability (the degree in which the same architecture can be used in different environments)"
                  },
                  {
                    id: "Q3_4",
                    text: "Reliability (consistency in the anticipation of software operations - e.g., in terms of the number of software faults (bugs), expressed as faults per thousand lines of code)"
                  },
                  {
                    id: "Q3_5",
                    text: "Security (the ability to control who can perform what actions on particular resources)"
                  }
                ],
                values: []
              },
              appFeatures: {
                id: "Q4",
                label: "Please choose the desired features of your application for development and deployment",
                formType: "checkbox",
                options: [
                  {
                    id: "Q4_1",
                    text: "High ease of development / quick development with fewer developers"
                  },
                  {
                    id: "Q4_2",
                    text: "Easy to understand and modify the development"
                  },
                  {
                    id: "Q4_3",
                    text: "Easy to rewrite and update parts of the development"
                  },
                  {
                    id: "Q4_4",
                    text: "Development teams that are spread out"
                  },
                  {
                    id: "Q4_5",
                    text: "Special functionality to address without rewriting the original application"
                  },
                  {
                    id: "Q4_6",
                    text: "High ease of deployment"
                  },
                  {
                    id: "Q4_7",
                    text: "Rapid and frequent development and deployment"
                  },
                  {
                    id: "Q4_8",
                    text: "Independently deployable"
                  },
                  {
                    id: "Q4_9",
                    text: "High speed with creating and deploying new applications"
                  },
                  {
                    id: "Q4_10",
                    text: "Add new modules without making changes to the existing system"
                  },
                  {
                    id: "Q4_11",
                    text: "Quick response to a constantly changing environment"
                  },
                  {
                    id: "Q4_12",
                    text: "Reusability of integrations and component sharing"
                  }
                ],
                values: []
              },
              architecturalFeatures: {
                id: "Q5",
                label: "Please choose the desired features of your architecture",
                formType: "checkbox",
                options: [
                  {
                    id: "Q5_1",
                    text: "Asynchronous communication / data flow (information can be exchanged independent of time)"
                  },
                  {
                    id: "Q5_2",
                    text: "Asynchronous communication / data flow (information can be exchanged in real time)"
                  },
                  {
                    id: "Q5_3",
                    text: "Loose coupling (degree of dependency between components is very low)"
                  },
                  {
                    id: "Q5_4",
                    text: "Independent services (services can be developed and deployed independently of one another)"
                  },
                  {
                    id: "Q5_5",
                    text: "Separation of concerns (separating an application into distinct sections each of which address a separate concern)"
                  },
                  {
                    id: "Q5_6",
                    text: "Plug-in components (adding additional feature as plugins to the core application)"
                  },
                  {
                    id: "Q5_7",
                    text: "Dynamic (system components and connections can be created and destroyed during runtimes)"
                  },
                  {
                    id: "Q5_8",
                    text: "High volume data (size of the data sets to be processed larger than terabytes)"
                  }
                ],
                values: []
              }
            }
          }
        ],
        gitCredentials: [],
        currentStep: 1,
        totalSteps: 3,
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
      buildAPSResponsesArray(){
        let responses = [];

        for(const field of Object.keys(this.steps[2].fields))
          responses.push(...this.steps[2].fields[field].values);

        return responses;
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
            'repoUrl': this.receivedService.url.replace(".git", ""),
            'name': this.steps[1].fields.name.value,
            'visibility': this.steps[1].fields.visibility.value
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
