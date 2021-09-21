<template>
  <div>
    <div class="dashboard">
      <div class="title text-primary">Dashboard</div>
      <BIconPlusCircle class="text-primary add"/>
    </div>

    <!-- Welcome / Get Started -->
    <div class="d-flex mt-4">
      <BCol>
        <BImg class="welcome" src="/assets/SmartCLIDE_welcome.png"/>
      </BCol>
      <BCol>
        <div class="d-flex flex-column w-100">
          <div class="started text-primary">
            Get Started
          </div>
          <div class="d-flex w-100">
            <BRow class="w-100">
              <BCol>Create New...</BCol>
              <BCol>
                <RouterLink to="/project-page">
                  <div @click="optionClicked('project')">Recent</div>
                </RouterLink>
              </BCol>
            </BRow>
          </div>
        </div>
      </BCol>
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
<!--          <BTable striped hover :items="card.items" :fields="card.fields" :filter-function="filterFields"></BTable>-->
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
      }
    }
  },
  methods: {
    // REVER ESTE METODO
    filterFields(item, filter) {
      return this.items.Workflows.some( key => {
        return String(item[key]).indexOf(filter || '') > -1
      })
    },
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
  width: 20px;
  height: 20px;

  position: absolute;
  top: 10px;
  right: 100px;
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

.smartwidget{
  border-radius: 10px;
}

.remove{
  cursor: pointer;
}


</style>
