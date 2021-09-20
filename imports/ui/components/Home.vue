<template>
  <div class="d-flex flex-column flex-grow-1" >
    <div class="d-flex flex-grow-1">
      <ContextBar />
      <keep-alive>
        <router-view class="flex-grow-1" />
      </keep-alive>
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
