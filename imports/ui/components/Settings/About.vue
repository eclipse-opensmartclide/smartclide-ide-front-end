<template>
  <div>
    About
  </div>
</template>

<script>
export default {
  name: "About",
  mounted(){
    this.$store.state.context = 'settings';
  }
}
</script>

<style scoped>

</style>
