<template>
  <div class="layout-center">
    <BTable class="custom_table" hover bordered :items="rows" :fields="columns"/>
  </div>
</template>

<script>
export default {
  name: "CustomTable",
  props: {
    rows: Array,
    columns: Array
  }
}
</script>

<style scoped>

</style>
