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
          <RouterLink class="nav_item text-primary" :to="option.link" v-on:click.native="click(option)">
            {{ option.title }}
          </RouterLink>
        </div>
      </div>
    </BNav>
  </div>
</template>

<script>
import QuickAccess from "./QuickAccess";
import utils from "../utils"

export default {
  name: "ContextBar",
  components: {
    QuickAccess
  },
  methods: {
    click(option) {
      if(option.title === "Close Project"){
        this.closeWorkspace()
      }
    },
    async closeWorkspace(){
      const keycloak = this.$store.state.keycloak
      const workspaceId = this.$store.state.currentWorkspace
      await utils.stopWorkspace(keycloak, workspaceId)
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
