<template>
  <div>
    Workflows
  </div>
</template>

<script>
import Connector from 'connector-smartclide'

export default {
  name: "Workflows",
  created() {
    this.connector = new Connector()
    this.getInfo()
  },
  methods:{
    async getInfo() {
      // const token = this.$store.state.keycloakToken
      //
      // const list = await this.connector.getWorkspaces(token)
      // console.log(list)
      //
      // // stop running workspaces
      // const started = list.filter(el=>el.status === "RUNNING")
      // for(let i = 0; i < started.length; i++){
      //   await this.connector.stopWorkspace(token, started[i].id)
      // }

      //
      // const start = await this.connector.startWorkspace(token, "workspace4ktvem2me5pzhwr9")
      // console.log(start)





    }
  }
}
</script>
