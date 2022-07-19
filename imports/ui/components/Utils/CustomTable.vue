<template>
  <div>
    <smart-widget-grid :draggable="false" :resizable="false" :layout.sync="cards" :margin="[25, 25]">
      <smart-widget class="title text-primary" v-for="card in cards" :slot="card.i" :title="card.category" :padding="[0,0]">
        <div class="layout-center">
          <BTable class="custom_table" hover bordered :items="rows" :fields="columns"/>
        </div>
      </smart-widget>
    </smart-widget-grid>
  </div>
</template>

<script>
export default {
  name: "CustomTable",
  props: {
    rows: Array,
    columns: Array
  },
  data() {
    return {
      cards: [
        { x: 0, y: 0, w: 12, h: 5, i: 0, category: 'workflows', fields: ["name", "template", "updatedAt"]},
        { x: 0, y: 11, w: 12, h: 5, i: 1, category: 'services', fields: ["name", "licence", "updatedAt"]},
        { x: 0, y: 24, w: 12, h: 5, i: 2, category: 'deployments', fields: ["name", "workflow_service", "version", "state", "updatedAt"]}
      ]
    };
  }
}
</script>

<style scoped>
  .title{
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
