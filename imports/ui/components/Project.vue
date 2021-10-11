<template>
  <div>
    <div class="name text-primary">{{this.name}}</div>
    <iframe id="iframe" class="w-100 h-100" :src="workspaceUrl" sandbox="allow-scripts allow-same-origin"/>
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
      workspaceUrl: '',
      workspaceLoaded: undefined
    }
  },
  methods:{
    async getDetails(){
      const token = this.$store.state.keycloak.idToken
      const workspaceId = this.$store.state.currentWorkspace

      const ws = await this.connector.getWorkspace(token, workspaceId)
      this.name = ws.devfile.metadata.name

      if(ws.status === "RUNNING"){
        const machines = ws.runtime.machines
        for(key in machines){
          if(key.includes("theia-ide")){
            this.workspaceUrl = machines[key].servers.theia.url
            console.log(this.workspaceUrl)
            break
          }
        }
      }
      else{
        console.log(ws.status)
        await this.connector.startWorkspace(token, workspaceId)
        await this.fetchWorkspaceUrl(token, workspaceId)
      }
    },
    fetchWorkspaceUrl(token, workspaceId){
      this.workspaceLoaded = setInterval( () => {
        this.connector.getWorkspace(token, workspaceId).then(ws => {
          this.name = ws.devfile.metadata.name
          if(ws.status === "RUNNING"){
            const machines = ws.runtime.machines
            for(key in machines){
              if(key.includes("theia-ide")){
                this.workspaceUrl = machines[key].servers.theia.url
                break
              }
            }
            clearInterval(this.workspaceLoaded);
          }
        })
      }, 5000);
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
