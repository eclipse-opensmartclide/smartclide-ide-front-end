<template>
  <div>
    <BNav class="nav bg-light" aria-orientation="vertical">
      <RouterLink class="nav_item mt-3" v-for="option in this.$store.getters.getOptions" :to="option.link">
        {{ option.title }}
      </RouterLink>
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
