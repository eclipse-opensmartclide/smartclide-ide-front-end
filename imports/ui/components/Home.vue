<template>
  <div>
    <NavigationBar/>
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar';

export default {
  name: "Home",
  components: {
    NavigationBar
  }
}
</script>

<style scoped>

</style>
