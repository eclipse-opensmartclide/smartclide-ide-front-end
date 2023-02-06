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
  <div class="d-flex flex-column h-100">
    <div class="d-flex h-100">
      <iframe id="docs-iframe" src="https://eclipse-opensmartclide.github.io/smartclide-docs/"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Help",
  mounted(){
    this.$store.state.context = 'settings';
  }
}
</script>

<style scoped>
#docs-iframe{
  border: 0;
  height: 100%;
  width: 100%;
}
</style>
