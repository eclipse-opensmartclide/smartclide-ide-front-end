<template>
  <div>
    <BImg class="main-logo" src="/assets/EclipseTheiaInstance.png"/>
  </div>
</template>

<script>
export default {
  name: "Project",
  mounted(){
    this.$store.state.context = 'project';
  }
}
</script>
