<template>
  <div>
    <div class="name text-primary">{{this.name}}</div>
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
    this.$store.state.currentWorkspace = this.$route.params.id
    this.getDetails()
  },
  data(){
    return{
      name: '',
      workspaceUrl: ''
    }
  },
  methods:{
    async getDetails(){
      const token = this.$store.state.keycloak.idToken
      const workspaceId = this.$store.state.currentWorkspace

      const ws = await this.connector.getWorkspace(token, workspaceId)
      this.name = ws.devfile.metadata.name

      this.workspaceUrl = "https://che-smartclide-che.che.smartclide.eu/dashboard/#/ide/" +
          this.$store.state.keycloak.tokenParsed.email + "/" +
          this.name
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
