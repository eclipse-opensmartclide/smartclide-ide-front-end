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
          <!-- create -->
          <BCol>
            <BRow class="create mb-2">Create New...</BRow>
            <BRow><RouterLink to="/createService">Service</RouterLink></BRow>
            <BRow><RouterLink to="/createWorkflow">Workflow</RouterLink></BRow>
            <BRow><RouterLink to="/createDeployment">Deployment</RouterLink></BRow>
          </BCol>

          <!-- recent -->
          <BCol>
            <BRow class="recent mb-2">Recent</BRow>

            <BRow v-for="project in recentProjects.slice(0,3)">
              <RouterLink class="project" :to="{ name: project.type, params: { ID: project.workspaceID }}">
                {{project.type}}: {{ project.name}}
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
      <smart-widget v-for="card in cards" :slot="card.i" :title="card.category">
        <template slot="toolbar">
          <div style="margin: 0 12px;">
            <BIconTrash class="widget-button" @click="remove(card.i)"/>
          </div>
        </template>
        <div class="layout-center">
          <BTable striped hover :items="items[card.category]" :fields="card.fields"></BTable>
        </div>
      </smart-widget>
    </smart-widget-grid>

  </div>
</template>

<script>
import workflows from "/public/workflows.json";
import services from "/public/services.json";
import deployments from "/public/deployments.json";
import recentProjects from "/public/mostRecentProjects.json"

export default {
  name: "Dashboard",
  data () {
    return {
      id: 3,
      cards: [
        { x: 0, y: 0, w: 6, h: 5, i: 0, category: 'Workflows', fields:  ["name", "template", "updatedAt"]},
        { x: 6, y: 0, w: 6, h: 5, i: 1, category: 'Services', fields: ["name", "licence", "updatedAt"]},
        { x: 0, y: 5, w: 12, h: 6, i: 2, category: 'Deployments', fields: ["name", "workflow_service", "version", "state", "updatedAt"]}
      ],
      items: {
        "Workflows": workflows,
        "Services": services,
        "Deployments": deployments
      },
      recentProjects: recentProjects
    }
  },
  methods: {
    remove(cardID) {
      let index = this.cards.map(card => card.i).indexOf(cardID);
      this.cards.splice(index, 1);
    },
    optionClicked(option){
      this.$store.state.context = option;
    }
  }
}
</script>

<style scoped>

.title{
  font-size: 20px;
}

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

.dashboard {
  position: relative;
  display: flex;
  justify-content: center;
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

.project{
  text-transform: capitalize;
}

.smartwidget{
  border-radius: 10px;
}

.remove{
  cursor: pointer;
}


</style>
