<template>
  <div class="d-flex flex-column flex-grow-1" >
    <div class="d-flex flex-grow-1">
      <NavigationBar :keycloakToken="this.keycloakToken"/>
      <router-view class="flex-grow-1" />
    </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar';
import Footer from "./Footer";

export default {
  name: "Home",
  props: ["keycloakToken"],
  components: {
    Footer,
    NavigationBar
  },

}
</script>

<style scoped>

</style>
