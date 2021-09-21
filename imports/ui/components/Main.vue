<template>
  <div class="d-flex flex-column">
    <Header class="header" :keycloak="this.keycloak" :meteorUser="meteorUser" :eclipseCheUser="eclipseCheUser"/>

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
import Footer from "./Footer";

export default {
  name: "Main",
  components: {Footer, Content, ContextBar, Header},
  props: ["meteorUser", "eclipseCheUser", "keycloak"],
}
</script>

<style scoped>

.header{
  position: fixed;
  width: 100%;
  z-index: 4000;
}

.main{
  display: flex;
  margin-top: 80px;
  position: fixed;
  width: 100%;
  height: calc(100% - 80px);
  overflow-y: auto;
  bottom: 0;
  top: 0;
}

.context{
  position: sticky;
  top: 0;
}

.content{
  width: calc(100% - 250px);
  margin-bottom: 90px;
}

</style>
