<template>
  <div class="d-flex justify-content-center">
  <BNavbar class="d-block">
    <RouterLink to="/workflows">Workflows</RouterLink>
    <RouterLink to="/services">Services</RouterLink>
    <RouterLink to="/deployments">Deployments</RouterLink>
  </BNavbar>
  </div>
</template>

<script>
import Workflows from "./Workflows";
import Services from "./Services";
import Deployments from "./Deployments";

export default {
  name: "NavigationBar",
  components: {
    Workflows,
    Services,
    Deployments
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
