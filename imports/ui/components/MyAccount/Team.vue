<template>
  <div>
    Team
  </div>
</template>

<script>
export default {
  name: "Team",
  mounted(){
    this.$store.state.context = 'my-account';
  }
}
</script>

<style scoped>

</style>
