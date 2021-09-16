<template>
  <div>
    Sources
  </div>
</template>

<script>
export default {
  name: "Sources",
  mounted(){
    this.$store.state.context = 'my-account';
  }
}
</script>

<style scoped>

</style>
