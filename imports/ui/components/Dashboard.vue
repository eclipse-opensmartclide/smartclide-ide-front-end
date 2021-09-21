<template>
  <div class="d-flex flex-column">
<!--    <div class="dashboard">-->
<!--      <div class="title text-primary">Dashboard</div>-->
<!--      <BIconPlusCircle class="text-primary add"/>-->
<!--    </div>-->

    <!-- Welcome / Get Started -->
    <div class="d-flex mt-4">
      <BCol>
        <BImg class="welcome"  src="/assets/SmartCLIDE_welcome.png"/>
      </BCol>
      <BCol>
        <div class="d-flex flex-column w-100">

          <div class="started text-primary">
            Get Started
          </div>
          <div class="d-flex w-100">
            <BRow class="w-100">
              <BCol>Create New..</BCol>
              <BCol>Recent</BCol>
            </BRow>
          </div>
        </div>
        <div class="add">
          <BIconPlusCircle class="text-primary add-icon"/>
        </div>

      </BCol>


    </div>


    <!-- Grid -->
    <smart-widget-grid class="grid" :layout="layout">
      <smart-widget slot="0" title="Workflows">
        <template slot="toolbar">
          <div style="margin: 0 12px;">
            <BIconTrash class="widget-button" @click="remove"/>
          </div>
        </template>
        <div class="layout-center">
          <BTable striped hover :items="workflows" :fields="wk_fields" :filter-function="wk_filter"></BTable>
        </div>
      </smart-widget>
      <smart-widget slot="1" title="Deployments">
        <template slot="toolbar">
          <div style="margin: 0 12px;">
            <BIconTrash class="widget-button" @click="remove"/>
          </div>
        </template>
        <div class="layout-center">
          <BTable striped hover :items="deployments" :fields="deploy_fields" :filter-function="deploy_filter"></BTable>
        </div>
      </smart-widget>
      <smart-widget slot="2" title="Services">
        <template slot="toolbar">
          <div style="margin: 0 12px;">
            <BIconTrash class="widget-button" @click="remove"/>
          </div>
        </template>
        <div class="layout-center">
          <BTable striped hover :items="services" :fields="serv_fields" :filter-function="serv_filter"></BTable>
        </div>
      </smart-widget>
    </smart-widget-grid>

  </div>
</template>

<script>
import workflows from "/public/workflows.json";
import deployments from "/public/deployments.json";
import services from "/public/services.json";
export default {
  name: "Dashboard",
  data () {
    return {
      layout: [
        { x: 0, y: 0, w: 4, h: 6, i: '0' , static: true},
        { x: 4, y: 0, w: 8, h: 6, i: '1', static: true},
        { x: 0, y: 0, w: 4, h: 6, i: '2' },
      ],
      workflows: workflows,
      deployments: deployments,
      services: services,
      wk_fields: ["name", "template", "updatedAt"],
      deploy_fields: ["name", "workflow_service", "version", "state", "updatedAt"],
      serv_fields: ["name", "licence", "updatedAt"],
    }
  },
  methods: {
    wk_filter(item, filter) {
      return this.deployments.some( key => {
        return String(item[key]).indexOf(filter || '') > -1
      })
    },
    deploy_filter(item, filter) {
      return this.deployments.some( key => {
        return String(item[key]).indexOf(filter || '') > -1
      })
    },
    serv_filter(item, filter) {
      return this.services.some( key => {
        return String(item[key]).indexOf(filter || '') > -1
      })
    },
    remove(item) {
      console.log("Remove table: " + item)
    }
  }
}
</script>

<style scoped>

.title{
  font-size: 20px;
}

.add{

}

.add-icon{
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
  flex-direction: column;
  align-items: center;
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

.grid{
  margin: 15px;
}

</style>
