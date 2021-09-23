<template>
  <div>
    <div class="name text-primary">{{details.name}} ({{details.type}})</div>
    <BImg class="main-logo w-100" src="/assets/EclipseTheiaInstance.png"/>
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
      details: {}
    }

  },
  methods:{
    async getDetails(){
      const projectId = this.$route.params.id
      this.details = await this.connector.getProjectDetails(projectId)
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
