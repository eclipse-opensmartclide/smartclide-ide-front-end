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
          <RouterLink class="nav_item" :to="option.link">
            <span @click="optionClicked(option.title)">
              {{ option.title }}
            </span>
          </RouterLink>
        </div>
      </div>
    </BNav>
  </div>
</template>

<script>
import QuickAccess from "./QuickAccess";
export default {
  name: "ContextBar",
  components: {
    QuickAccess
  },
  methods: {
    optionClicked(option){
      if(option === 'Close Project')
        this.$store.state.context = 'main';
    }
  }
}
</script>

<style scoped>

.nav_container{
  width: 250px;
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
