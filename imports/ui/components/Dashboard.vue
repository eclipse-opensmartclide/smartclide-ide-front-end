<template>
  <div>
    <!-- Welcome / Get Started -->
    <div class="d-flex">
      <BCol>
        <BImg class="welcome" src="/assets/SmartCLIDE_welcome.png"/>
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
            <BRow><RouterLink to="/createWorkflow">Workflow</RouterLink></BRow>
            <BRow><RouterLink to="/createService">Service</RouterLink></BRow>
            <BRow><RouterLink to="/createDeployment">Deployment</RouterLink></BRow>
          </BCol>

          <!-- recent projects -->
          <BCol>
            <BRow class="recent mb-2">Recent</BRow>
            <BRow v-for="project in this.items.recent">
              <RouterLink class="project" :to="{ path: `/project/${project.workspaceID}`}">
                {{project.name}} ({{project.type}})
              </RouterLink>
            </BRow>
          </BCol>
        </BRow>
      </BCol>
      <div class="add">
        <BIconPlusCircle class="text-primary add-icon"/>
      </div>
    </div>

    <!-- Grid -->
    <smart-widget-grid class="mt-4" :layout="cards">
      <smart-widget class="title" v-for="card in cards" :slot="card.i" :title="card.category" :loading="!itemsLoaded">
        <template slot="toolbar">
          <div style="margin: 0 12px;">
            <BIconTrash class="widget-button" @click="remove(card.i)" style="cursor: pointer"/>
          </div>
        </template>
        <div class="layout-center">
          <BTable striped hover :items="items[card.category]" :fields="card.fields">
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
import Connector from 'connector-smartclide';
import moment from "moment";

export default {
  name: "Dashboard",
  created() {
    this.connector = new Connector();
  },
  mounted(){
    this.$store.state.context = 'main';
    this.getItems();
  },
  data () {
    return {
      cards: [
        { x: 0, y: 0, w: 6, h: 5, i: 0, category: 'workflows', fields: ["name", "template", "updatedAt"]},
        { x: 6, y: 0, w: 6, h: 5, i: 1, category: 'services', fields: ["name", "licence", "updatedAt"]},
        { x: 0, y: 5, w: 12, h: 6, i: 2, category: 'deployments', fields: ["name", "workflow_service", "version", "state", "updatedAt"]}
      ],
      items: {},
      itemsLoaded: false
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
    async getItems() {
      this.itemsLoaded = false;
      let workflows = await this.connector.getMostRecentWorkflows();
      let services = await this.connector.getMostRecentServices();
      let deployments = await this.connector.getMostRecentDeployments();
      let recent = await this.connector.getMostRecentProjects(3);

      this.items = {
        workflows,
        services,
        deployments,
        recent
      };
      this.itemsLoaded = true;
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
</style>
