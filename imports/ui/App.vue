<template>

  <div class="main vh-100 d-flex flex-column">
    <template v-if="meteorUser|| this.eclipseCheUser">
      <Main/>
    </template>

    <template v-else-if="this.smartCLIDE_login">
      <LoginSmartCLIDE />
      <Footer/>
    </template>

    <template v-else>
      <Login :keycloak="this.keycloak" @login_clicked="login_clicked"/>
      <Footer/>
    </template>

  </div>

</template>

<script>
import Keycloak from "keycloak-js";
import Login from "./components/Login";
import Header from "./components/Header";
import LoginSmartCLIDE from "./components/LoginSmartCLIDE";
import Vue from "vue";
import Footer from "./components/Footer";
import QuickAccess from "./components/QuickAccess";
import Main from "./components/Main";

export default {
  components: {
    Main,
    QuickAccess,
    Footer,
    LoginSmartCLIDE,
    Header,
    Login,
  },
  created() {
    this.keycloak = new Keycloak("http://localhost:8080/keycloak.json");

    console.log("SmartCLIDE Login: " + this.smartCLIDE_login)

    this.keycloak.init({
      onLoad: 'check-sso',
      loadUserProfileAtStartUp: true
    })
        .then((authenticated)=>{
          console.log("authenticated: ", authenticated)

          this.eclipseCheLogin = authenticated
          // this.keycloakToken = this.keycloak.idToken
          Vue.prototype.$keycloakToken = this.keycloak.idToken // avoid global variable

          // get eclipse che user
          if(this.keycloak.tokenParsed){
            this.eclipseCheUser = this.keycloak.tokenParsed
          }
        }).catch(function (error){
      console.log(error)
    })
  },
  data() {
    return {
      eclipseCheUser: undefined,
      smartCLIDE_login: undefined,
      keycloakToken: ''
    };
  },
  methods: {
    login_clicked(state){
      this.smartCLIDE_login = state
    }
  },
  meteor: {
    meteorUser(){
      const meteorUser = Meteor.user();
      if(meteorUser){
        this.smartCLIDE_login = false
        return meteorUser
      }
    }
  }
};
</script>

<style scoped>

</style>
