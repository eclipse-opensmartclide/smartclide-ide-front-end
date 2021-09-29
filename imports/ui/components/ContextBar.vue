<template>
  <div class="nav_container">
    <template v-if="this.$store.state.context === 'project'">
      <QuickAccess/>
    </template>
    <BNav class="nav bg-light" aria-orientation="vertical">
      <div v-for="category in this.$store.getters.getCategories">
        <div class="category p-2" v-if="category.category !== 'root'">
          {{category.category}}
        </div>
        <div class="p-2" v-for="option in category.options">
          <RouterLink class="nav_item" :to="option.link" v-on:click.native="click(option)">
            {{ option.title }}
          </RouterLink>
        </div>
      </div>
    </BNav>
  </div>
</template>

<script>
import QuickAccess from "./QuickAccess";
import Connector from "connector-smartclide";
export default {
  name: "ContextBar",
  components: {
    QuickAccess
  },
  created() {
    this.connector = new Connector();
  },
  methods: {
    click(option) {
      if(option.title === "Close Project"){
        this.closeWorkspace()
      }
    },
    async closeWorkspace(){
      const token = this.$store.state.keycloak.idToken
      const workspaceId = this.$store.state.currentWorkspace
      await this.connector.stopWorkspace(token, workspaceId)
      this.$store.state.currentWorkspace = undefined
    }
  }
}
</script>

<style scoped>

.nav_container{
  width: 200px;
}

.nav{
  height: 100%;
  display: flex;
  flex-direction: column;
}

.nav_item{
  color: black;
  text-decoration: none;
  margin-left: 8px;
}

.category{
  margin-left: 8px;
  font-weight: bold;
}

</style>
