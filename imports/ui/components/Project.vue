<template>
  <div>
    <div class="name text-primary">{{details.name}} ({{details.type}})</div>
    <iframe class="w-100 h-100" :src="workspaceUrl"/>
  </div>
</template>

<script>
import Connector from "connector-smartclide";

export default {
  name: "Project",
  created() {
    this.connector = new Connector();
  },
  mounted(){
    this.$store.state.context = 'project';
    this.getDetails()
  },
  data(){
    return{
      details: {},
      workspaceUrl: ''
    }

  },
  methods:{
    async getDetails(){
      const projectId = this.$route.params.id
      this.details = await this.connector.getProjectDetails(projectId) // TODO will be replaced with correct method

      this.workspaceUrl = "https://che-smartclide-che.che.smartclide.eu/dashboard/#/ide/" +
          this.$store.state.keycloak.tokenParsed.email + "/" +
          this.details.name
    }
  }
}
</script>

<style scoped>
  .name {
    background: #E5EEFD;
    font-weight: bold;
    height: 28px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    text-transform: capitalize;
  }

</style>
