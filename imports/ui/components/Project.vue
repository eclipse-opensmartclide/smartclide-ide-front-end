<template>
  <div class="d-flex flex-column">
    <div class="name text-primary">{{this.name}}</div>

    <div class="d-flex h-100">
      <iframe id="iframe" :src="workspaceUrl" />
      
      <div class="loading d-flex justify-content-center align-items-center flex-column">
        <b-spinner class="spinner-border text-primary" style="width: 5rem; height: 5rem;" role="status"/>
        <div class="text-primary">
          <br>Loading... Please wait
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "../utils"

export default {
  name: "Project",
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
  beforeDestroy () {
    clearInterval(this.workspaceLoaded)
  },
  methods:{
    async getDetails(){
      $(".loading").removeClass("d-none")
      $(".loading").addClass("d-flex")
      const keycloak = this.$store.state.keycloak
      const workspaceId = this.$store.state.currentWorkspace

      const ws = await utils.getWorkspace(keycloak, workspaceId)
      this.name = ws.devfile.metadata.name
      console.log("Status: " + ws.status)

      if (ws.status === "STOPPED") {
        await utils.startWorkspace(keycloak, workspaceId)
        await this.fetchWorkspaceUrl(keycloak, workspaceId)
      } else if (ws.status === "RUNNING") {
        const machines = ws.runtime.machines
        for (key in machines) {
          if (key.includes("theia-ide")) {
            this.workspaceUrl = machines[key].servers.theia.url
            $(".loading").removeClass("d-flex")
            $(".loading").addClass("d-none")
            break
          }
        }
      }
      else{
        await this.fetchWorkspaceUrl(keycloak, workspaceId)
      }
    },
    fetchWorkspaceUrl(keycloak, workspaceId){
      this.workspaceLoaded = setInterval( () => {
        utils.getWorkspace(keycloak, workspaceId).then(ws => {
          this.name = ws.devfile.metadata.name
          if(ws.status === "RUNNING"){
            const machines = ws.runtime.machines
            for(key in machines){
              if(key.includes("theia-ide")){
                this.workspaceUrl = machines[key].servers.theia.url
                $(".loading").removeClass("d-flex")
                $(".loading").addClass("d-none")
                break
              }
            }
            clearInterval(this.workspaceLoaded)
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
  #iframe{
    border: 0;
    height: 100%;
    width: 100%;
  }
  .loading {
    z-index: 9;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 28px;
  }
  .spinner-border{
    animation: 1.75s linear infinite spinner-border;
  }
</style>
