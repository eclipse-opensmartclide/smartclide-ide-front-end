<template>
  <div>
    Credentials
  </div>
</template>

<script>
export default {
  name: "Credentials",
  mounted(){
    this.$store.state.context = 'my-account';
  }
}
</script>

<style scoped>

</style>
