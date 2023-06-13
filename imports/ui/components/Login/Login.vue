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
  <b-container class="vh-100 d-flex justify-content-center align-items-center">
    <div class="login-container d-flex flex-column align-items-center">
      <b-img class="main-logo mb-5" :src="$store.state.theme.images.ideLogo"/>

<!--      <b-form @submit.prevent="loginWithSmartCLIDE()">-->
<!--        <b-button class="smartCLIDE bg-primary mt-4" name="login" type="submit">-->
<!--          <b-img class="SmartCLIDEIcon" src="/assets/default/ideIcon.png"/>-->
<!--          <div class="btn-text">Username or Email</div>-->
<!--        </b-button>-->
<!--      </b-form>-->

      <b-form @submit.prevent="loginWithEclipseChe()">
        <b-button class="che mt-3" name="loginEclipseChe" type="submit">
          <b-img class="eclipse_icon" :src="$store.state.theme.images.eclipseIcon"/>
          <div class="btn-text">SmartCLIDE Eclipse Che</div>
        </b-button>
      </b-form>
    </div>
  </b-container>
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

