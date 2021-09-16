<template>
  <div>
    Profile
  </div>
</template>

<script>
export default {
  name: "Profile",
  mounted(){
    this.$store.state.context = 'my-account';
  }
}
</script>

<style scoped>

</style>
