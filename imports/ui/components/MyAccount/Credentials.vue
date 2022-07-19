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
    <smart-widget-grid :draggable="false" :resizable="false" :layout.sync="cards" :margin="[25, 25]">
      <smart-widget class="title text-primary" v-for="card in cards" :slot="card.i" :title="card.category" :padding="[0,0]">
        <CustomTable :rows="items" :columns="Object.keys(items[0])"/>
      </smart-widget>
    </smart-widget-grid>
  </div>
</template>

<script>
import CustomTable from "../Utils/CustomTable";

export default {
  name: "Credentials",
  components: {CustomTable},
  data(){
    return {
      cards: [
        { x: 0, y: 0, w: 12, h: 5, i: 0, category: 'workflows'},
        { x: 0, y: 11, w: 12, h: 5, i: 1, category: 'services'},
        { x: 0, y: 24, w: 12, h: 5, i: 2, category: 'deployments'}
      ],
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    };
  },
  mounted(){
    this.$store.state.context = 'my-account';
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
