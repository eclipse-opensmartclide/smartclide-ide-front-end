<template>
  <div>
    <BNav class="nav bg-light" aria-orientation="vertical">
      <div v-for="category in this.$store.getters.getCategories">
        <div v-if="category.category !== 'root'">
          {{category.category}}
        </div>
        <div v-for="option in category.options">
          <RouterLink class="nav_item mt-3" :to="option.link">
            {{ option.title }}
          </RouterLink>
        </div>
      </div>
    </BNav>
  </div>
</template>

<script>
export default {
  name: "ContextBar"
}
</script>

<style scoped>
.nav{
  height: 100%;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding-top: 23px;
}

.nav_item{
  color: black;
  text-decoration: none;
}
</style>
