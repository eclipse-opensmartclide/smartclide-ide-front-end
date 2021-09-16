<template>
  <div>
    Help
  </div>
</template>

<script>
export default {
  name: "Help",
  mounted(){
    this.$store.state.context = 'settings';
  }
}
</script>

<style scoped>

</style>
