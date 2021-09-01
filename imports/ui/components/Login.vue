
<template>
  <BContainer class="vh-100 d-flex justify-content-center align-items-center flex-column" >

    <BImg class="main-logo" src="/assets/SmartClideRGBColor.png"/>

    <BForm @submit.prevent="login">
      <!-- username -->
      <div class="icon-and-input">
        <div class="icon-container bg-primary">
          <BIconPerson class="icon p-1"/>
        </div>
        <BFormInput class="form-input" placeholder="Username" v-model="username" required/>
      </div>

      <!-- password -->
      <div class="icon-and-input mt-2">
        <div class="icon-container bg-primary">
          <BIconKey class="icon p-1"/>
        </div>
        <BFormInput class="form-input" type="password" placeholder="Password" v-model="password" required/>
      </div>

      <!--      <div class="sign-in-up">-->
      <!--        <BRow class="mt-2 ml-0">-->
      <!--          <BCol cols="8">-->
      <!--            <div class="register text">-->
      <!--              <div>Don't have an account?</div>-->
      <!--              <BLink to="/register" class="ml-1">Register</BLink>-->
      <!--            </div>-->

      <!--            <BLink class="recovery text" href="/recoveryPassword">Forgot your password?</BLink>-->
      <!--          </BCol>-->

      <!--          <BCol>-->
      <!--            <BButton class="float-right bg-primary text-white" type="submit">Log in</BButton>-->
      <!--          </BCol>-->
      <!--        </BRow>-->
      <!--      </div>-->

      <div class="login mt-2 d-flex justify-content-center">
        <BButton class="bg-primary text-white" name="login" type="submit">Log in</BButton>
      </div>
    </BForm>


    <BForm @submit.prevent="loginWithEclipseChe" class="mt-5">
      <BButton class="bg-secondary text-white" name="loginEclipseChe" type="submit">Log in with Eclipse CHE</BButton>
    </BForm>


  </BContainer>
</template>

<script>

import Keycloak from "keycloak-js";

export default {
  components: {

  },
  data(){
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function (ev){
      Meteor.loginWithPassword(this.username, this.password)
    },

    loginWithEclipseChe: function (ev){
      const keycloak = new Keycloak("http://localhost:8080/keycloak.json");
      keycloak.init({
        onLoad: 'login-required'
      }).then(function (authenticated){
        console.log(authenticated)
        alert(authenticated ? 'authenticated': 'not authenticated')
      }).catch(function (error){
        console.log(error)
        alert('failed to initialize')
      })
    }
  }
}

</script>

<style scoped>
.main-logo{
  width: 365px;
}

.icon-and-input{
  display: flex;
  flex-direction: row;
  width: 400px;
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
}

.sign-in-up{
  width: 400px;
}

.text{
  font-size: 14px;
}

.register{
  margin-left: -15px;
  margin-right: -15px;
  flex-direction: row;
  display: flex;
}

.recovery{
  margin-left: -15px;
  margin-right: -15px;
}

</style>

