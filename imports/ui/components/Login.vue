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
  <BContainer class="vh-100 d-flex justify-content-center align-items-center">
    <div class="login-container d-flex flex-column align-items-center">
      <BImg class="main-logo mb-5" src="/assets/SmartClideRGBColor.png"/>

      <BForm @submit.prevent="loginWithSmartCLIDE()">
        <BButton class="smartCLIDE bg-primary mt-4" name="login" type="submit">
          <BImg class="smartCLIDE_icon" src="/assets/icon_smartclide.png"/>
          <div class="btn-text">Username or Email</div>
        </BButton>
      </BForm>

      <BForm @submit.prevent="loginWithEclipseChe()">
        <BButton class="che mt-3" name="loginEclipseChe" type="submit">
          <BImg class="eclipse_icon" src="/assets/icon_eclipse.png"/>
          <div class="btn-text">SmartCLIDE Eclipse Che</div>
        </BButton>
      </BForm>
    </div>
  </BContainer>
</template>

<script>

export default {
  data(){
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    loginWithSmartCLIDE(){
      this.$emit("SmartCLIDELogin")
    },
    loginWithEclipseChe(){
      this.$store.state.keycloak.login()
    }
  }
}
</script>

<style scoped>
.login-container{
  background: #E5EEFD;
  width: 351px;
  height: 397px;
  border-radius: 10px;
  justify-content: center;
}

.main-logo{
  width: 274px;
}

.smartCLIDE{
  color: white;
  width: 234px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.che{
  background: #989EB5;
  color: white;
  width: 234px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.smartCLIDE_icon{
  width: 30px;
  height: 19px
}

.eclipse_icon{
  width: 24px;
  height: 26px
}

.btn-text{
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 14px;
}
</style>

