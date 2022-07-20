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
      <BCol>
        <BImg class="welcome" src="/assets/cartao_welcome.png"/>
      </BCol>
      <BCol>
        <BRow>
          <div class="started text-primary">
            Get Started
          </div>
        </BRow>

        <BRow class="mt-2">
          <!-- create new -->
          <BCol>
            <BRow class="create mb-2">Create New...</BRow>
            <BRow><RouterLink to="/notImplemented">Workflow</RouterLink></BRow>
            <BRow><RouterLink to="/notImplemented">Service</RouterLink></BRow>
            <BRow><RouterLink to="/notImplemented">Deployment</RouterLink></BRow>
          </BCol>

          <!-- recent projects -->
          <BCol>
            <BRow class="recent mb-2">Recent</BRow>
            <BRow v-for="project in this.items.recent">
              <RouterLink class="project" :to="{ path: `/project/${project.id}`}">
                {{project.devfile.metadata.name}}
              </RouterLink>
            </BRow>
          </BCol>
        </BRow>
      </BCol>
      <div class="add">
        <BIconPlusCircle class="text-primary add-icon" @click="addWidget"/>
      </div>
    </div>

    <!-- Grid -->
    <smart-widget-grid :layout.sync="cards" @resized="cardResized" @container-resized="cardResized" :margin="[25, 25]">
      <smart-widget class="title text-primary" v-for="card in cards" :slot="card.i" :title="card.category" :padding="[0,0]" :loading="!itemsLoaded">
        <template slot="toolbar">
          <div style="margin: 0 12px;">
            <BIconTrash class="widget-button" @click="remove(card.i)" style="cursor: pointer"/>
          </div>
        </template>
        <div class="layout-center">
          <BTable class="custom_table" bordered :items="items[card.category]" :fields="card.fields" >
            <!-- format date -->
            <template #cell(updatedAt)="data">
              {{convertDate(new Date(data.value))}}
            </template>
          </BTable>
        </div>
      </smart-widget>
    </smart-widget-grid>
  </div>
</template>

<script>
import moment from "moment";
import utils from "./Utils/utils"

export default {
  name: "Dashboard",
  mounted(){
    this.$store.state.context = 'main';
    this.getItems()
  },
  data () {
    return {
      cards: [
        { x: 0, y: 0, w: 6, h: 4, i: 0, category: 'workflows', fields: ["name", "template", "updatedAt"]},
        { x: 6, y: 0, w: 6, h: 4, i: 1, category: 'services', fields: ["name", "licence", "updatedAt"]},
        { x: 0, y: 5, w: 12, h: 5, i: 2, category: 'deployments', fields: ["name", "workflow_service", "version", "state", "updatedAt"]}
      ],
      items: {},
      itemsLoaded: true
    }
  },
  methods: {
    remove(cardID){
      let index = this.cards.map(card => card.i).indexOf(cardID);
      this.cards.splice(index, 1);
    },
    convertDate: function (date) {
      return moment(date).format('DD-MMM-YYYY HH:mm');
    },
    async getItems(){
      const keycloak = this.$store.state.keycloak
      this.itemsLoaded = false;
      this.items = await utils.getWorkspaces(keycloak)
      this.itemsLoaded = true;
    },
    cardResized(card){

    },
    addWidget(){
      alert("Not implemented")
    }
  }
}
</script>

<style scoped>

.add{
  position: relative;
}

.add-icon{
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  bottom: 0;
  cursor: pointer
}

.welcome{
  width: 100%;
}

.started{
  font-size: 40px;
}

.create{
  font-size: 20px;
}

.recent{
  font-size: 20px;
}

.title{
  text-transform: capitalize;
}

.project{
  text-transform: capitalize;
}

.smartwidget{
  border-radius: 10px;
}

/deep/ .widget-header{
  background: #F8FAFB;
  height: 37px!important;
  line-height: 37px!important;
  padding-left: 10px;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

/deep/ .custom_table thead{
  background: #E5EEFD;
  text-align: center;
}

</style>
