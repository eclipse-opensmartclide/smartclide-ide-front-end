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
  <div class="footer">
    <div class="d-flex h-100 align-items-center ml-4 mr-4">
      <BImg height="34" width="54" src="/assets/EU_flag.png" />
      <div class="ml-3 flex-grow-1">
        <div class="text d-inline-block" >
          SmartCLIDE has received funding from the European Union&apos;s Horizon 2020
          research and innovation programme under grant agreement no. 871177
        </div>
      </div>
      <div class="privacy ml-3 mr-4 float-right">Privacy Policy</div>
      <BImg height="34" width="54" src="/assets/SmartClideRGBColor.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.footer{
  height: 80px;
  background: #EDEDED;
}
.text{
  font-size: 11px;
  max-width: 400px;
  color: #666666;
}
.privacy{
  font-size: 11px;
  color: #666666
}
</style>
