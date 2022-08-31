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
  <div>
    Coming soon: Team...
  </div>
</template>

<script>
  export default {
    name: "Team",
    mounted(){
      this.$store.state.context = 'my-account';
    }
  }
</script>

<style scoped>

</style>
