<template>
  <div class="d-flex flex-grow-1">
    <NavigationBar/>
    <router-view class="flex-grow-1" />
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
