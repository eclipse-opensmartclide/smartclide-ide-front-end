<template>
  <div>
    Settings
  </div>
</template>

<script>
export default {
  name: "Settings",
  mounted(){
    this.$store.state.context = 'settings';
  }
}
</script>
