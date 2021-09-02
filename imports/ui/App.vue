<template>
  <div class="main">
    <template v-if="meteorUser|| this.eclipseCheLogin">

      <header>
        <Header :keycloak="this.keycloak" :meteorUser="meteorUser" :eclipseCheUser="eclipseCheUser"/>
      </header>

      <Home/>
    </template>

    <template v-else>
      <Login :keycloak="this.keycloak" />
    </template>
  </div>
</template>

<script>
import Keycloak from "keycloak-js";
import Home from "./components/Home";
import Login from "./components/Login";
import NavigationBar from "./components/NavigationBar";
import Header from "./components/Header";

export default {
  components: {
    Header,
    NavigationBar,
    Login,
    Home
  },

  created() {
    this.keycloak = new Keycloak("http://localhost:8080/keycloak.json");

    this.keycloak.init({
      onLoad: 'check-sso',
      loadUserProfileAtStartUp: true
    })
    .then((authenticated)=>{
      console.log("authenticated: ", authenticated)

      this.eclipseCheLogin = authenticated
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
      eclipseCheLogin: false
    };
  },
  methods: {

  },
  meteor: {
    meteorUser(){
      return Meteor.user()
    }
  }
};
</script>

<style scoped>

</style>

