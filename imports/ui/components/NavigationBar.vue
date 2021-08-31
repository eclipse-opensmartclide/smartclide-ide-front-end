<template>
  <div>
    <div class="nav flex-column nav-pills" id="navbar" role="tablist" aria-orientation="vertical">
      <router-link to="/workflows">
        <a class="nav-link active" id="workflows-tab" data-toggle="pill" hrole="tab" aria-selected="true" @click="changeTab('workflows-tab')">
          Workflows
        </a>
      </router-link>
      <router-link to="/services">
        <a class="nav-link" id="services-tab" data-toggle="pill" role="tab" aria-selected="false" @click="changeTab('services-tab')">
          Services
        </a>
      </router-link>
      <router-link to="/deployments">
        <a class="nav-link" id="deployments-tab" data-toggle="pill" role="tab" aria-selected="false" @click="changeTab('deployments-tab')">
          Deployments
        </a>
      </router-link>
    </div>
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
    changeTab(elementID){
      let newOption = document.getElementById(elementID);
      let oldOption = document.getElementsByClassName('nav-link active')[0];

      oldOption.className = 'nav-link';
      oldOption.ariaSelected = 'false';
      newOption.className = 'nav-link active';
      newOption.ariaSelected = 'true';
    }
  }
}
</script>

<style scoped>

</style>
