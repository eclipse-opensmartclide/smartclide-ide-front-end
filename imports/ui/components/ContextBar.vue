<template>
  <div>
    <template v-if="this.$store.state.context === 'main'">
      <BNav class="nav bg-light" aria-orientation="vertical">
        <RouterLink class="nav_item" to="/workflows">Workflows</RouterLink>
        <RouterLink class="nav_item mt-3" to="/services">Services</RouterLink>
        <RouterLink class="nav_item mt-3" to="/deployments">Deployments</RouterLink>
      </BNav>
    </template>

    <template v-else-if="this.$store.state.context === 'settings'">
      <BNav class="nav bg-light" aria-orientation="vertical">
        <div class="nav_item">Statistics</div>
        <div class="nav_item mt-3">Logs</div>
        <div class="nav_item mt-3">Appearance</div>
        <div class="nav_item mt-3">Help</div>
      </BNav>
    </template>

    <template v-else-if="this.$store.state.context === 'my-account'">
      <BNav class="nav bg-light" aria-orientation="vertical">
        <div class="nav_item">Profile</div>
        <div class="nav_item mt-3">Team</div>
        <div class="nav_item mt-3">Sources</div>
        <div class="nav_item mt-3">Credentials</div>
      </BNav>
    </template>
  </div>
</template>

<script>
import Workflows from "./Workflows";
import Services from "./Services";
import Deployments from "./Deployments";

export default {
  name: "ContextBar",
  components: {
    Workflows,
    Services,
    Deployments
  }
}
</script>

<style scoped>
.nav{
  height: 100%;
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
