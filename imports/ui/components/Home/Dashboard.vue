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
  <div>
    <!-- Welcome / Get Started -->
    <div class="d-flex">
      <b-col>
        <b-img class="w-100" :src="this.$store.state.theme.images.welcomeCard"/>
      </b-col>

      <b-col class="pt-5">
        <b-row>
          <div class="h3 text-primary">
            Get Started
          </div>
        </b-row>

        <b-row class="mt-2">
          <!-- Create New -->
          <b-col>
            <b-row class="h5 mb-2">Create New...</b-row>
<!--            <b-row><router-link to="/notImplemented">Workflow</router-link></b-row>-->
            <b-row><router-link to="/services/serviceCreation">Service</router-link></b-row>
<!--            <b-row><router-link to="/notImplemented">Deployment</router-link></b-row>-->
          </b-col>

          <!-- Recent Projects -->
          <b-col>
            <b-row class="h5 mb-2">Recent</b-row>
            <b-row v-for="project in latestWorkspaces">
              <router-link :to="{ path: `/project/${project.id}` }">
                {{project.devfile.projects[0].name}}
              </router-link>
            </b-row>
          </b-col>
        </b-row>
      </b-col>

<!--      <div class="position-relative">-->
<!--        <b-icon-plus-circle-->
<!--          role="button"-->
<!--          class="add-icon position-absolute"-->
<!--          variant="primary"-->
<!--          font-scale="1.2"-->
<!--          @click="addWidget"-->
<!--          v-b-tooltip.hover-->
<!--          title="Add new"-->
<!--        />-->
<!--      </div>-->
    </div>

    <!-- Grid -->
    <smart-widget-grid
      :layout.sync="cards"
      :margin="[25, 25]"
    >
      <smart-widget
        class="card text-primary"
        v-for="(table, index) in tables"
        :slot="cards[index].i"
        :title="table.title"
        :padding="[0,0]"
      >
<!--        <template slot="toolbar">-->
<!--          <div class="mx-2">-->
<!--            <b-icon-trash-->
<!--              role="button"-->
<!--              class="widget-button"-->
<!--              @click="remove(index)"-->
<!--              v-b-tooltip.hover-->
<!--              title="Delete"-->
<!--            />-->
<!--          </div>-->
<!--        </template>-->
        <div class="d-flex flex-row">
          <b-table
              class="custom_table mx-1 mb-0 text-center"
              bordered
              :items="table.content"
              :fields="table.fields"
              :busy="!table.loaded"
              :empty-text="`No ${table.title} were created yet.`"
              show-empty
          >
            <template #table-busy>
              <div class="text-center text-primary my-2">
                <b-spinner class="align-middle"></b-spinner>
                Loading...
              </div>
            </template>
            <template #cell(creationDate)="data">
              {{ convertDate(data.value) }}
            </template>
            <template #cell(updatedAt)="data">
              {{ convertDate(data.value) }}
            </template>
          </b-table>
        </div>
      </smart-widget>
    </smart-widget-grid>
  </div>
</template>

<script>
  import moment from "moment";

  export default {
    name: "Dashboard",
    data () {
      return {
        latestWorkspaces: [],
        cards: [
          { i: 0, x: 0, y: 0, w: 6, h: 4 },
          { i: 1, x: 6, y: 0, w: 6, h: 4 }
          // { i: 2, x: 0, y: 5, w: 12, h: 5 }
        ],
        tables: [
          {
            title: "Workflows",
            fields: ["name", "template", "updatedAt"],
            content: [],
            loaded: false
          },
          {
            title: "Services",
            fields: ["name", "creationDate"],
            content: [],
            loaded: false
          }
          // {
          //   title: "Deployments",
          //   fields: ["name", "workflow_service", "version", "state", "updatedAt"],
          //   content: [],
          //   loaded: false
          // }
        ]
      }
    },
    mounted(){
      this.$store.state.context = "home";
      this.fetchContent();
    },
    methods: {
      fetchContent(){
        this.fetchLatestWorkspaces();
        this.fetchLatestWorkflows();
        this.fetchLatestServices();
        // this.fetchLatestDeployments();
      },
      fetchLatestWorkspaces(){
        Meteor.call("getLatestWorkspaces", this.$store.state.keycloak.idToken, 3, (error, result) => {
          this.latestWorkspaces = result;
        });
      },
      fetchLatestWorkflows(){
        Meteor.call("getLatestWorkflows", (error, result) => {
          Object.assign(this.tables[0],{ loaded: true, content: result || [] });
        });
      },
      fetchLatestServices(){
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
                    licence: item.licence,
                    creationDate: item["created"],
                    updateDate: item["updated"]
                  };
                });

                Object.assign(this.tables[1],{ loaded: true, content: this.sortByCreationDate(content) });
              }
            }
        );
      },
      fetchLatestDeployments(){
        Meteor.call("getLatestDeployments", (error, result) => {
          Object.assign(this.tables[2],{ loaded: true, content: result || [] });
        });
      },
      sortByCreationDate(elements){
        return elements.sort(function(a,b){
          return new Date(b.creationDate) - new Date(a.creationDate);
        }).slice(0, 3);
      },
      convertDate(date){
        return moment(new Date(date)).format('DD-MMM-YYYY HH:mm');
      }
      // remove(cardID){
      //   let index = this.cards.map(card => card.i).indexOf(cardID);
      //   this.cards.splice(index, 1);
      // },
      // addWidget(){
      //   alert("Not implemented")
      // }
    }
  }
</script>

<style scoped>
  .add-icon{
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
    bottom: 0;
  }

  /deep/ .widget-header{
    background: var(--light);
    height: 37px!important;
    line-height: 37px!important;
    padding-left: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  /deep/ .custom_table thead{
    background: var(--info);
    text-align: center;
    text-transform: capitalize;
  }
</style>
