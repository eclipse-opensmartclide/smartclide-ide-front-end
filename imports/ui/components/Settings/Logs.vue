<template>
  <div>
    Logs
  </div>
</template>

<script>
export default {
  name: "Logs",
  mounted(){
    this.$store.state.context = 'settings';
  }
}
</script>

<style scoped>

</style>
