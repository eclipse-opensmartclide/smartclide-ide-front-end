<template>
  <div class="d-flex flex-column">
    <Header class="header" :meteorUser="meteorUser" :eclipseCheUser="eclipseCheUser"/>

    <div class="main">
      <ContextBar class="context"/>
      <Content class="content"/>
    </div>
  </div>

</template>

<script>
import Header from "./Header";
import ContextBar from "./ContextBar";
import Content from "./Content";

export default {
  name: "Main",
  components: {Header, ContextBar, Content},
  props: ["meteorUser", "eclipseCheUser"],
}
</script>

<style scoped>
.header{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 4000;
}

.main{
  overflow-y: hidden;
}

.context{
  margin-top: 60px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}

.content{
  margin-top: 60px;
  position: fixed;
  top: 0;
  right: 0;
  left: 200px;
  bottom: 0;
  overflow-y: auto;
}
</style>
