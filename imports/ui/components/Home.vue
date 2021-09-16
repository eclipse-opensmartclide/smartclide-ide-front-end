<template>
  <div class="d-flex flex-column flex-grow-1" >
    <div class="d-flex flex-grow-1">
      <ContextBar />
      <router-view class="flex-grow-1" />
    </div>
  </div>
</template>

<script>
import ContextBar from './ContextBar';

export default {
  name: "Home",
  props: ["keycloakToken"],
  components: {
    ContextBar
  }
}
</script>
