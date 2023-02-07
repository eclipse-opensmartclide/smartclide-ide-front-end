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
  <b-modal
    id="modal-about"
    title="About SmartCLIDE"
    hide-footer
  >
    <b-img class="logo" src="/assets/SmartCLIDERGBColor.png"/>
  </b-modal>
</template>

<script>
  export default {
    name: "About"
  }
</script>

<style scoped>
  .logo-container{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo{
    width: 125px;
    padding: 4px;
  }
</style>
