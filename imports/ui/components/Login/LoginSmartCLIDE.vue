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
  <b-container class="vh-100 d-flex justify-content-center align-items-center" >
    <div class="login-container d-flex flex-column align-items-center">

      <b-row class="h-50">
        <b-img class="main-logo" src="/assets/SmartCLIDERGBColor.png"/>
      </b-row>

      <b-row class="h-50">
        <b-form @submit.prevent="login">
          <!-- Username -->
          <div class="icon-and-input mt-4">
            <div class="icon-container bg-primary">
              <b-icon-person class="icon p-1"/>
            </div>
            <b-form-input class="form-input" placeholder="Username" v-model="username" required/>
          </div>
          <!-- Password -->
          <div class="icon-and-input mt-3">
            <div class="icon-container bg-primary">
              <b-icon-key class="icon p-1"/>
            </div>
            <b-form-input class="form-input" type="password" placeholder="Password" v-model="password" required/>
          </div>
          <!-- Button -->
          <div class="login mt-3 d-flex justify-content-center">
            <b-button class="bg-primary text-white" name="login" type="submit">Log in</b-button>
          </div>
        </b-form>
      </b-row>
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
      login(){
        Meteor.loginWithPassword(this.username, this.password)
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
    object-fit: contain;
  }

  .icon-and-input{
    display: flex;
    flex-direction: row;
    width: 298px;
  }

  .icon-container{
    display: flex;
    align-content: center;
    height: 38px;
    width: 38px;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }

  .icon{
    color: white;
    width: 100%;
    height: 100%;
  }

  .form-input{
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    font-size: 14px;
    height: 38px;
  }
</style>

