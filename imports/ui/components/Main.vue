<!-------------------------------------------------------------------------------
 - Copyright (c) 2021 Unparallel Innovation, Lda
 -
 - This program and the accompanying materials are made available under the
 - terms of the Eclipse Public License 2.0 which is available at
 - http://www.eclipse.org/legal/epl-2.0.
 -
 - SPDX-License-Identifier: EPL-2.0
 -------------------------------------------------------------------------------->

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
  z-index: 2;
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
  z-index: 1; /* for Quick Access navigation panel show above main content page */
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
