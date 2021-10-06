<template>
  <div>
    <div class="name text-primary">{{this.details.devfile.metadata.name}}</div>
    <iframe class="w-100 h-100" :src="workspaceUrl"/>
<!--    <iframe class="w-100 h-100" :src="https://server6g9ppv1s-jwtproxy-server-4402.che.smartclide.eu/"/>-->
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
    this.$store.state.currentWorkspace = this.$route.params.id
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
      const token = this.$store.state.keycloak.idToken
      const workspaceId = this.$store.state.currentWorkspace

      this.details = await this.connector.getWorkspace(token, workspaceId)

      this.workspaceUrl = "https://che-smartclide-che.che.smartclide.eu/dashboard/#/ide/" +
          this.$store.state.keycloak.tokenParsed.email + "/" +
          this.details.devfile.metadata.name
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
