<template>
  <div class="d-flex flex-grow-1">
    <ContextBar :context="this.context"/>
    <router-view class="flex-grow-1" />
  </div>
</template>

<script>
import ContextBar from './ContextBar';

export default {
  name: "Home",
  props: ["context"],
  components: {
    ContextBar
  }
}
</script>

<style scoped>

</style>
