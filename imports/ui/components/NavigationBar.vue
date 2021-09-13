<template>
  <BNav class="nav bg-light" aria-orientation="vertical">
    <RouterLink class="nav_item" to="/workflows">Workflows</RouterLink>
    <RouterLink class="nav_item mt-3" to="/services">Services</RouterLink>
    <RouterLink class="nav_item mt-3" to="/deployments">Deployments</RouterLink>
  </BNav>
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

.nav{
  width: 200px;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding-top: 23px;
}

.nav_item{
  color: black;
  text-decoration: none;
}

</style>
